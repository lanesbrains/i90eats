<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Restaurant Management</h1>
        <p class="text-xl text-primary-100">View and manage all restaurant listings</p>
      </div>
    </section>

    <!-- Restaurant Stats -->
    <section class="py-8">
      <div class="container-max max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.total }}</div>
            <div class="text-gray-600">Total Restaurants</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-accent-600 mb-2">{{ stats.premium }}</div>
            <div class="text-gray-600">Premium Listings</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.withDeals }}</div>
            <div class="text-gray-600">With Active Deals</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.recent }}</div>
            <div class="text-gray-600">Added This Month</div>
          </div>
        </div>

        <!-- Restaurant Table -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">All Restaurants</h2>
            <div class="flex gap-4">
              <input v-model="searchQuery" type="text" placeholder="Search restaurants..." class="px-4 py-2 border border-gray-300 rounded-lg" />
              <select v-model="planFilter" class="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">All Plans</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Restaurant</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Plan</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Deals</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Owner</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="restaurant in paginatedRestaurants" :key="restaurant.slug" class="border-b border-gray-100">
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div class="font-medium text-gray-900">{{ restaurant.title }}</div>
                        <div class="text-sm text-gray-500">{{ restaurant.cuisine }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4">{{ restaurant.location }}</td>
                  <td class="py-3 px-4">
                    <span :class="restaurant.premium ? 'bg-accent-100 text-accent-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ restaurant.premium ? 'Premium' : 'Basic' }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <span v-if="restaurant.deals && restaurant.deals.length" class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {{ restaurant.deals.length }} active
                    </span>
                    <span v-else class="text-gray-400 text-sm">None</span>
                  </td>
                  <td class="py-3 px-4">{{ restaurant.ownerEmail }}</td>
                  <td class="py-3 px-4">
                    <NuxtLink :to="`/restaurant/${restaurant.slug}`" target="_blank" class="text-primary-600 hover:text-primary-700 mr-3">View</NuxtLink>
                    <button @click="editRestaurant(restaurant)" class="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center mt-6">
            <p class="text-gray-600">Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredRestaurants.length) }} of {{ filteredRestaurants.length }} restaurants</p>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50">Previous</button>
              <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Load restaurants from content directory
const { data: restaurants } = await useAsyncData('admin-restaurants', () =>
  queryContent('/restaurants')
    .sort({ createdAt: -1 })
    .find()
)

const stats = computed(() => ({
  total: restaurants.value?.length || 0,
  premium: restaurants.value?.filter(r => r.premium).length || 0,
  withDeals: restaurants.value?.filter(r => r.deals && r.deals.length > 0).length || 0,
  recent: restaurants.value?.filter(r => new Date(r.createdAt) > new Date('2024-01-01')).length || 0
}))

const searchQuery = ref('')
const planFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 20

const filteredRestaurants = computed(() => {
  if (!restaurants.value) return []
  
  return restaurants.value.filter(restaurant => {
    const matchesSearch = !searchQuery.value || 
      restaurant.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      restaurant.ownerEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesPlan = !planFilter.value || 
      (planFilter.value === 'premium' && restaurant.premium) ||
      (planFilter.value === 'basic' && !restaurant.premium)
    
    return matchesSearch && matchesPlan
  })
})

const totalPages = computed(() => Math.ceil(filteredRestaurants.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const paginatedRestaurants = computed(() => {
  return filteredRestaurants.value.slice(startIndex.value, endIndex.value)
})

const editRestaurant = (restaurant) => {
  // TODO: Open edit modal or redirect to edit page
  alert(`Edit ${restaurant.title} - Feature coming soon`)
}

// Protect admin page
definePageMeta({
  middleware: "admin"
})
</script>
