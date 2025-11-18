<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Subscriber Management</h1>
        <p class="text-xl text-primary-100">View and manage newsletter subscribers</p>
      </div>
    </section>

    <!-- Subscriber Stats -->
    <section class="py-8">
      <div class="container-max max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.total }}</div>
            <div class="text-gray-600">Total Subscribers</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.active }}</div>
            <div class="text-gray-600">Active Subscribers</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.thisMonth }}</div>
            <div class="text-gray-600">This Month</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.topLocation }}</div>
            <div class="text-gray-600">Top Location</div>
          </div>
        </div>

        <!-- Subscriber Table -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">All Subscribers</h2>
            <div class="flex gap-4">
              <input v-model="searchQuery" type="text" placeholder="Search subscribers..." class="px-4 py-2 border border-gray-300 rounded-lg" />
              <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Locations</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Subscribed</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subscriber in paginatedSubscribers" :key="subscriber.email" class="border-b border-gray-100">
                  <td class="py-3 px-4">{{ subscriber.email }}</td>
                  <td class="py-3 px-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="location in subscriber.locations.slice(0, 2)" :key="location" class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {{ location }}
                      </span>
                      <span v-if="subscriber.locations.length > 2" class="text-xs text-gray-500">+{{ subscriber.locations.length - 2 }} more</span>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <span :class="subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ subscriber.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">{{ formatDate(subscriber.subscribedAt) }}</td>
                  <td class="py-3 px-4">
                    <button @click="viewSubscriber(subscriber)" class="text-primary-600 hover:text-primary-700 mr-3">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center mt-6">
            <p class="text-gray-600">Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredSubscribers.length) }} of {{ filteredSubscribers.length }} subscribers</p>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50">Previous</button>
              <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Subscriber Detail Modal -->
    <div v-if="selectedSubscriber" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Subscriber Details</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ selectedSubscriber.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span :class="selectedSubscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded-full text-sm">
                {{ selectedSubscriber.status }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Locations</label>
              <div class="flex flex-wrap gap-2 mt-1">
                <span v-for="location in selectedSubscriber.locations" :key="location" class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {{ location }}
                </span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Subscribed Date</label>
              <p class="text-gray-900">{{ formatDate(selectedSubscriber.subscribedAt) }}</p>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button @click="closeModal" class="btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO: Replace with real Beehiiv API calls
const subscribers = ref([
  {
    email: 'john@example.com',
    locations: ['Seattle, WA', 'Spokane, WA'],
    status: 'active',
    subscribedAt: '2024-01-15'
  },
  {
    email: 'sarah@example.com', 
    locations: ['Chicago, IL', 'Milwaukee, WI'],
    status: 'active',
    subscribedAt: '2024-01-20'
  }
])

const stats = computed(() => ({
  total: subscribers.value.length,
  active: subscribers.value.filter(s => s.status === 'active').length,
  thisMonth: subscribers.value.filter(s => new Date(s.subscribedAt) > new Date('2024-01-01')).length,
  topLocation: 'Seattle, WA'
}))

const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 20
const selectedSubscriber = ref(null)

const filteredSubscribers = computed(() => {
  return subscribers.value.filter(subscriber => {
    const matchesSearch = !searchQuery.value || 
      subscriber.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || subscriber.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredSubscribers.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const paginatedSubscribers = computed(() => {
  return filteredSubscribers.value.slice(startIndex.value, endIndex.value)
})

const viewSubscriber = (subscriber) => {
  selectedSubscriber.value = subscriber
}

const closeModal = () => {
  selectedSubscriber.value = null
}

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(new Date(dateString))
}

// Protect admin page
definePageMeta({
  middleware: "admin"
})
</script>



