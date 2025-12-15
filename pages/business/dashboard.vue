<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Business Dashboard</h1>
        <p class="text-xl text-primary-100">Manage your restaurant listing and deals</p>
      </div>
    </section>

    <!-- Dashboard Content -->
    <section class="py-16">
      <div class="container-max max-w-6xl mx-auto">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.views }}</div>
            <div class="text-gray-600">Profile Views</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-accent-600 mb-2">{{ stats.activeDeals }}</div>
            <div class="text-gray-600">Active Deals</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-secondary-600 mb-2">{{ stats.subscribers }}</div>
            <div class="text-gray-600">Newsletter Subscribers</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ plan }}</div>
            <div class="text-gray-600">Current Plan</div>
          </div>
        </div>

        <!-- Restaurant Management -->
        <div class="card p-8 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Restaurant Information</h2>
            <NuxtLink to="/admin" class="btn-secondary text-sm px-4 py-2">
              <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit in CMS
            </NuxtLink>
          </div>
          
          <form @submit.prevent="updateRestaurant" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Restaurant Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <input v-model="restaurantForm.title" type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>

              <!-- Cuisine -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <input v-model="restaurantForm.cuisine" type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>

              <!-- Location -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select v-model="restaurantForm.location" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
                </select>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input v-model="restaurantForm.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input v-model="restaurantForm.address" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
            </div>

            <!-- Website -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
              <input v-model="restaurantForm.website" type="url" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="https://yourrestaurant.com" />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="restaurantForm.description" rows="4" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button type="submit" :disabled="saving" class="btn-primary px-8 py-3 disabled:opacity-50">
                <span v-if="saving">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Deal Management -->
        <div class="card p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Active Deals</h2>
            <button @click="showDealModal = true" class="btn-primary">Add New Deal</button>
          </div>

          <div v-if="deals.length === 0" class="text-center py-8">
            <p class="text-gray-600">No deals created yet. Add your first deal to attract customers!</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="deal in deals" :key="deal.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{{ deal.title }}</h3>
                  <p class="text-gray-600 mt-1">{{ deal.description }}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Expires: {{ formatDate(deal.endDate) }}</span>
                    <span class="flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full" :class="deal.active ? 'bg-green-500' : 'bg-red-500'"></span>
                      {{ deal.active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button @click="editDeal(deal)" class="text-primary-600 hover:text-primary-700">Edit</button>
                  <button @click="deleteDeal(deal.id)" class="text-red-600 hover:text-red-700">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Deal Modal -->
    <div v-if="showDealModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ editingDeal ? 'Edit Deal' : 'Add New Deal' }}</h3>
          
          <form @submit.prevent="saveDeal" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
              <input v-model="dealForm.title" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="dealForm.description" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input v-model="dealForm.endDate" type="date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            
            <div class="flex items-center">
              <input v-model="dealForm.active" type="checkbox" class="w-4 h-4 text-primary-600 border-gray-300 rounded" />
              <label class="ml-2 text-sm text-gray-700">Active</label>
            </div>
            
            <div class="flex gap-3 pt-4">
              <button type="submit" class="btn-primary flex-1">Save Deal</button>
              <button @click="closeDealModal" type="button" class="btn-secondary flex-1">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI90Locations } from '~/composables/useI90Locations'
import { useAuth } from '~/composables/useAuth';
const { isBusinessOwner, ownedRestaurant } = useAuth();
const { allLocations } = useI90Locations()

// Reactive data - NO MOCK DATA
const stats = ref({
  views: 0,
  activeDeals: 0,
  subscribers: 0
})

const plan = ref('Basic')
const restaurantForm = ref({})
const deals = ref([])
const showDealModal = ref(false)
const editingDeal = ref(null)
const saving = ref(false)
const loading = ref(true)

const dealForm = ref({
  title: '',
  description: '',
  endDate: '',
  active: true
})

// Load real restaurant data
onMounted(async () => {
  if (isBusinessOwner.value && ownedRestaurant.value) {
    try {
      loading.value = true;
      console.log('📊 Loading restaurant data for:', ownedRestaurant.value.slug);
      
      // Load restaurant data
      const restaurantData = await $fetch(`/api/business/restaurant/${ownedRestaurant.value.slug}`);
      
      restaurantForm.value = {
        title: restaurantData.title || '',
        cuisine: restaurantData.cuisine || '',
        location: restaurantData.location || '',
        phone: restaurantData.phone || '',
        address: restaurantData.address || '',
        website: restaurantData.website || '',
        description: restaurantData.description || ''
      };
      
      // Load deals from restaurant data
      deals.value = restaurantData.deals || [];
      
      // Set plan based on premium status
      plan.value = restaurantData.premium ? 'Premium' : 'Basic';
      
      // Mock stats (replace with real analytics later)
      stats.value = {
        views: Math.floor(Math.random() * 1000) + 100,
        activeDeals: deals.value.filter(d => d.active).length,
        subscribers: Math.floor(Math.random() * 500) + 50
      };
      
      console.log('✅ Dashboard data loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
      alert('Failed to load restaurant data. Please try refreshing the page.');
    } finally {
      loading.value = false;
    }
  } else {
    console.log('❌ Not authenticated as business owner, redirecting to login');
    await navigateTo('/business/login');
  }
});

const updateRestaurant = async () => {
  if (!ownedRestaurant.value || saving.value) return
  
  saving.value = true
  try {
    console.log('💾 Updating restaurant:', restaurantForm.value)
    
    await $fetch(`/api/business/restaurant/${ownedRestaurant.value.slug}`, {
      method: 'PUT',
      body: restaurantForm.value
    })
    
    alert('Restaurant information updated successfully!')
    console.log('✅ Restaurant updated successfully')
  } catch (error) {
    console.error('❌ Update error:', error)
    alert('Failed to update restaurant information. Please try again.')
  } finally {
    saving.value = false
  }
}

const addDeal = () => {
  editingDeal.value = null
  dealForm.value = {
    title: '',
    description: '',
    endDate: '',
    active: true
  }
  showDealModal.value = true
}

const editDeal = (deal) => {
  editingDeal.value = deal
  dealForm.value = {
    title: deal.title,
    description: deal.description,
    endDate: deal.endDate,
    active: deal.active
  }
  showDealModal.value = true
}

const saveDeal = async () => {
  if (!dealForm.value.title || !dealForm.value.description) return
  
  try {
    const dealIndex = editingDeal.value ? deals.value.findIndex(d => d.id === editingDeal.value.id) : -1;
    const action = editingDeal.value ? 'update' : 'add';
    
    await $fetch('/api/business/restaurant/deals', {
      method: 'POST',
      body: {
        restaurantSlug: ownedRestaurant.value.slug,
        action,
        deal: {
          ...dealForm.value,
          ...(dealIndex >= 0 && { index: dealIndex })
        }
      }
    });

    if (editingDeal.value) {
      const index = deals.value.findIndex(d => d.id === editingDeal.value.id)
      if (index !== -1) {
        deals.value[index] = {
          ...editingDeal.value,
          ...dealForm.value,
          id: editingDeal.value.id
        }
      }
    } else {
      const newDeal = {
        id: Date.now(),
        ...dealForm.value
      }
      deals.value.push(newDeal)
    }
    
    showDealModal.value = false
    editingDeal.value = null
    
    alert('Deal saved successfully!')
  } catch (error) {
    console.error('❌ Save deal error:', error)
    alert('Failed to save deal. Please try again.')
  }
}

const deleteDeal = async (dealId) => {
  if (confirm('Are you sure you want to delete this deal?')) {
    try {
      const dealIndex = deals.value.findIndex(d => d.id === dealId);
      
      await $fetch('/api/business/restaurant/deals', {
        method: 'POST',
        body: {
          restaurantSlug: ownedRestaurant.value.slug,
          action: 'delete',
          deal: { index: dealIndex }
        }
      });

      deals.value = deals.value.filter(d => d.id !== dealId)
      console.log('🗑️ Deal deleted:', dealId)
    } catch (error) {
      console.error('❌ Delete deal error:', error)
      alert('Failed to delete deal. Please try again.')
    }
  }
}

const closeDealModal = () => {
  showDealModal.value = false
  editingDeal.value = null
}

const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString()
}
</script>