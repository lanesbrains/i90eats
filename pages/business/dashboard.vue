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
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Restaurant Information</h2>
          
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

// Mock data - replace with real API calls
const { allLocations } = useI90Locations()

const stats = ref({
  views: 1247,
  activeDeals: 3,
  subscribers: 342,
})

const plan = ref('Premium')

const restaurantForm = ref({
  title: 'Canlis',
  cuisine: 'Pacific Northwest',
  location: 'Seattle, WA',
  phone: '(206) 283-3313',
  address: '2576 Aurora Ave N, Seattle, WA 98109',
  website: 'https://canlis.com',
  description: 'Canlis has been a Pacific Northwest institution since 1950...'
})

const deals = ref([
  {
    id: 1,
    title: 'Happy Hour Special',
    description: '50% off appetizers during happy hour (4-6pm)',
    endDate: '2024-12-31',
    active: true
  }
])

const showDealModal = ref(false)
const editingDeal = ref(null)
const saving = ref(false)

const dealForm = ref({
  title: '',
  description: '',
  endDate: '',
  active: true
})

const updateRestaurant = async () => {
  saving.value = true
  // TODO: Save to CMS/database
  setTimeout(() => {
    saving.value = false
    alert('Restaurant information updated!')
  }, 1000)
}

const editDeal = (deal) => {
  editingDeal.value = deal
  dealForm.value = { ...deal }
  showDealModal.value = true
}

const saveDeal = async () => {
  // TODO: Save deal to CMS/database
  if (editingDeal.value) {
    // Update existing deal
    const index = deals.value.findIndex(d => d.id === editingDeal.value.id)
    deals.value[index] = { ...dealForm.value, id: editingDeal.value.id }
  } else {
    // Add new deal
    deals.value.push({ ...dealForm.value, id: Date.now() })
  }
  closeDealModal()
}

const deleteDeal = (dealId) => {
  if (confirm('Are you sure you want to delete this deal?')) {
    deals.value = deals.value.filter(d => d.id !== dealId)
  }
}

const closeDealModal = () => {
  showDealModal.value = false
  editingDeal.value = null
  dealForm.value = { title: '', description: '', endDate: '', active: true }
}

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(new Date(dateString))
}
</script>
