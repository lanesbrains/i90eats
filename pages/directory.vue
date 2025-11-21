<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Restaurant Directory</h1>
        <p class="text-xl text-primary-100">Discover amazing restaurants along Interstate 90</p>
      </div>
    </section>

    <!-- Search and Filters (Always Visible) -->
    <section class="py-8 bg-gray-50">
      <div class="container-max max-w-6xl mx-auto">
        <div class="card p-6">
          <div class="flex flex-col lg:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1">
              <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="Search restaurants..." class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Location Filter -->
            <div class="lg:w-64">
              <select v-model="selectedLocation" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="">All Locations</option>
                <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
              </select>
            </div>

            <!-- Cuisine Filter -->
            <div class="lg:w-64">
              <select v-model="selectedCuisine" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="">All Cuisines</option>
                <option v-for="cuisine in availableCuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <button @click="clearFilters" class="btn-secondary whitespace-nowrap px-6 py-3">Clear Filters</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Partial Restaurant Grid (Always Visible) -->
    <section class="py-12">
      <div class="container-max max-w-6xl mx-auto">
        <!-- Results Summary -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
          <p class="text-gray-600">
            Showing {{ visibleRestaurants.length }} of {{ filteredRestaurants.length }} restaurants
            <span v-if="!isSubscriber && filteredRestaurants.length > previewLimit" class="text-primary-600 font-medium">
              ({{ Math.max(0, filteredRestaurants.length - previewLimit) }} more with subscription)
            </span>
          </p>
          <div v-if="selectedLocation || selectedCuisine || searchQuery" class="flex items-center gap-2 mt-2 sm:mt-0">
            <span class="text-sm text-gray-500">Active filters:</span>
            <span v-if="selectedLocation" class="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">{{ selectedLocation }}</span>
            <span v-if="selectedCuisine" class="bg-accent-100 text-accent-800 text-sm px-2 py-1 rounded-full">{{ selectedCuisine }}</span>
            <span v-if="searchQuery" class="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full">"{{ searchQuery }}"</span>
          </div>
        </div>

        <ClientOnly>
          <div v-if="visibleRestaurants.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p class="text-gray-600 mb-4">Try adjusting your search terms or filters to find more restaurants.</p>
            <button @click="clearFilters" class="btn-primary">Clear All Filters</button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Preview Restaurants (Always Visible) -->
            <div 
              v-for="(restaurant, index) in visibleRestaurants" 
              :key="restaurant.slug"
              class="card hover:shadow-xl transition-shadow duration-300"
              :class="{ 'relative': !isSubscriber && index >= freePreviewCount }"
            >
              <!-- Lock Overlay for Non-Subscribed Users -->
              <div v-if="!isSubscriber && index >= freePreviewCount" class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
                <div class="text-center p-6">
                  <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">Subscribe for free to unlock all restaurants</p>
                  <NuxtLink to="/subscribe" class="btn-primary text-sm px-4 py-2">Subscribe Free</NuxtLink>
                </div>
              </div>

              <!-- Restaurant Card Content -->
              <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                <img 
                  v-if="restaurant.image" 
                  :src="restaurant.image" 
                  :alt="restaurant.title"
                  class="w-full h-48 object-cover"
                  sizes="sm:100vw md:400px lg:400px"
                  loading="lazy"
                />
                <div v-else class="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-sm text-gray-500">{{ formatDate(restaurant.createdAt) }}</span>
                  <span v-if="restaurant.premium" class="bg-accent-500 text-white text-sm px-2 py-1 rounded-full">Premium</span>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{{ restaurant.title }}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">{{ restaurant.description }}</p>
                
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">{{ restaurant.location }}</span>
                  <NuxtLink :to="`/restaurant/${restaurant.slug}`" class="text-primary-600 hover:text-primary-700 font-medium">View Details</NuxtLink>
                </div>
                
                <!-- Deals Preview (only for subscribers) -->
                <div v-if="isSubscriber && restaurant.dealCount > 0" class="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-sm text-green-800 font-medium">{{ restaurant.dealCount }} deals available</span>
                  </div>
                </div>

                <!-- Locked Deals Message -->
                <div v-else-if="!isSubscriber && restaurant.dealCount > 0" class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ restaurant.dealCount }} deals available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Show More CTA for Non-Subscribed Users -->
          <div v-if="!isSubscriber && filteredRestaurants.length > previewLimit" class="text-center mt-12">
            <div class="card p-8 max-w-2xl mx-auto">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Unlock All Restaurants</h3>
              <p class="text-gray-600 mb-6">
                Subscribe to our free newsletter to access all {{ filteredRestaurants.length }} restaurants and exclusive deals.
              </p>
              <NuxtLink to="/subscribe" class="btn-primary text-lg px-8 py-4">
                Subscribe for Free
              </NuxtLink>
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI90Locations } from '~/composables/useI90Locations';
import { useAuth } from '~/composables/useAuth';
const { isSubscriber } = useAuth();
const { allLocations } = useI90Locations();
// Watch for changes
console.log('🔍 Directory loaded - Subscription status:', isSubscriber.value);
watch(isSubscriber, (newVal) => {
  console.log('📡 Subscription status changed to:', newVal);
});
// Configuration for partial access
const freePreviewCount = 3; // Show first 3 restaurants fully
const previewLimit = 6; // Show first 6 restaurants, lock the rest

const countDeals = (dealsString) => {
  if (!dealsString) return 0;
  // Count ### headers (each represents a deal section)
  const matches = dealsString.match(/### .+/g);
  return matches ? matches.length : 0;
};
// Load all restaurants from content/restaurants directory
const { data: restaurants } = await useAsyncData('directory-restaurants', () =>
  queryContent('/restaurants')
    .sort({ premium: -1, createdAt: -1 }) // Premium first, then most recent
    .find()
);
// Process restaurants to add deal counts
const processedRestaurants = computed(() => {
  return restaurants.value?.map(restaurant => ({
    ...restaurant,
    dealCount: countDeals(restaurant.deals)
  })) || [];
});
// Reactive state
const searchQuery = ref("");
const selectedLocation = ref("");
const selectedCuisine = ref("");

const availableCuisines = computed(() => {
  if (!restaurants.value || !Array.isArray(restaurants.value)) return [];
  const cuisines = [...new Set(restaurants.value.map((r) => r.cuisine).filter(Boolean))];
  return cuisines.sort();
});

// ... existing filters ...
const filteredRestaurants = computed(() => {
  let filtered = processedRestaurants.value;
  
  if (selectedLocation.value) {
    filtered = filtered.filter(r => r.location === selectedLocation.value);
  }
  
  if (selectedCuisine.value) {
    filtered = filtered.filter(r => r.cuisine === selectedCuisine.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// ... rest of existing code ...

// Show different amounts based on subscription status
const visibleRestaurants = computed(() => {
  const filtered = filteredRestaurants.value;
  if (isSubscriber.value) {
    return filtered; // Show all for subscribers
  } else {
    return filtered.slice(0, previewLimit); // Show limited preview for non-subscribers
  }
});

const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedLocation.value = "";
  selectedCuisine.value = "";
};
</script>