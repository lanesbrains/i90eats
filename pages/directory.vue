<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Restaurant Directory</h1>
        <p class="text-xl text-primary-100">Discover amazing restaurants along Interstate 90</p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="bg-white py-8 border-b border-gray-200">
      <div class="container-max">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search restaurants..." class="input-field pl-10" />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Location Filter -->
          <div class="lg:w-64">
            <select v-model="selectedLocation" class="input-field">
              <option value="">All Locations</option>
              <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
            </select>
          </div>

          <!-- Cuisine Filter -->
          <div class="lg:w-64">
            <select v-model="selectedCuisine" class="input-field">
              <option value="">All Cuisines</option>
              <option v-for="cuisine in availableCuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
            </select>
          </div>

          <!-- Clear Filters -->
          <button @click="clearFilters" class="btn-secondary whitespace-nowrap">Clear Filters</button>
        </div>
      </div>
    </section>

    <!-- Results Summary -->
    <section class="bg-gray-50 py-4">
      <div class="container-max">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <p class="text-gray-600">Showing {{ filteredRestaurants.length }} of {{ restaurants.length }} restaurants</p>
          <div v-if="selectedLocation || selectedCuisine" class="flex items-center gap-2 mt-2 sm:mt-0">
            <span class="text-sm text-gray-500">Active filters:</span>
            <span v-if="selectedLocation" class="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">{{ selectedLocation }}</span>
            <span v-if="selectedCuisine" class="bg-accent-100 text-accent-800 text-sm px-2 py-1 rounded-full">{{ selectedCuisine }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Restaurant Grid -->
    <section class="py-12">
      <div class="container-max">
      <ClientOnly>
        <div v-if="filteredRestaurants.length === 0" class="text-center py-16">
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
          <div v-for="restaurant in filteredRestaurants" :key="restaurant.slug" class="card hover:shadow-xl transition-shadow duration-300">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img v-if="restaurant.image" :src="restaurant.image" :alt="restaurant.title" class="w-full h-48 object-cover" />
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
                <NuxtLink :to="`/directory/${restaurant.slug}`" class="text-primary-600 hover:text-primary-700 font-medium">View Details</NuxtLink>
              </div>
              <div class="mt-4">
                <button @click="openDealsModal(restaurant)" class="w-full btn-secondary text-sm">View Deals</button>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
      </div>
    </section>
  <ClientOnly>
    <!-- Deals Modal -->
    <div v-if="showDealsModal && isSubscribed" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <button @click="closeDealsModal" class="float-right text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          <h3 class="text-xl font-bold text-gray-900 mb-4">{{ selectedRestaurant?.title }} Deals</h3>
          
          <div v-if="isSubscribed">
            <div class="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 border border-accent-200">
              <h4 class="font-semibold text-gray-900 mb-2">Unlocked Deals:</h4>
              <ul class="text-sm text-gray-700 space-y-1">
                <li v-for="deal in selectedRestaurant?.deals" :key="deal" class="flex items-start">
                  <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ deal }}
                </li>
                <li v-if="!selectedRestaurant?.deals || selectedRestaurant.deals.length === 0">No current deals—check back soon!</li>
              </ul>
            </div>
            <p class="text-green-600 mt-4 text-center text-sm">Deals unlocked! Enjoy your subscriber perks.</p>
          </div>
          
          <div v-else>
            <div class="text-center mb-6">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">Deals are Locked</h4>
              <p class="text-gray-600 mb-4">Subscribe to our newsletter to unlock exclusive deals and specials from this restaurant</p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-6">
              <h5 class="font-semibold text-gray-900 mb-2">What you'll get:</h5>
              <ul class="text-sm text-gray-700 space-y-1">
                <li>• Current deals and specials</li>
                <li>• Happy hour information</li>
                <li>• Seasonal promotions</li>
                <li>• Exclusive subscriber-only offers</li>
              </ul>
            </div>

            <div class="flex gap-4">
              <NuxtLink to="/subscribe" class="btn-primary flex-1 text-center">Subscribe Now</NuxtLink>
              <button @click="closeDealsModal" class="btn-secondary flex-1">Maybe Later</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSecureSubscription } from '~/composables/useSecureSubscription';
const { isSubscribed, checkSubscription } = useSecureSubscription();

onMounted(() => {
  checkSubscription();
});

// Mock allLocations (replace with composable if exists)
const allLocations = ['Seattle, WA', 'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Portland, OR', 'Spokane, WA', 'Billings, MT', 'Rapid City, SD', 'Des Moines, IA', 'Cleveland, OH'];

// Sample restaurant data (add deals for gating demo)
const restaurants = [
  {
    title: "The Seattle Seafood Co.",
    slug: "seattle-seafood-co",
    location: "Seattle, WA",
    cuisine: "Seafood",
    address: "123 Pike Place, Seattle, WA 98101",
    phone: "(206) 555-0123",
    description: "Fresh seafood with a view of Puget Sound",
    premium: true,
    deals: ["50% off appetizers during happy hour", "Buy one get one free on select entrees"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null
  },
  {
    title: "Spokane Steakhouse",
    slug: "spokane-steakhouse",
    location: "Spokane, WA",
    cuisine: "Steakhouse",
    address: "456 Main St, Spokane, WA 99201",
    phone: "(509) 555-0456",
    description: "Premium steaks and fine dining",
    premium: false,
    deals: ["$10 off steaks on Tuesdays", "Free dessert with entree"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null
  },
  {
    title: "Missoula Montana Grill",
    slug: "missoula-montana-grill",
    location: "Missoula, MT",
    cuisine: "American",
    address: "789 Higgins Ave, Missoula, MT 59801",
    phone: "(406) 555-0789",
    description: "Classic American comfort food",
    premium: false,
    deals: ["Happy hour 4-6 PM: $5 burgers", "Family meal deal for 4"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null
  },
  {
    title: "Chicago Deep Dish Delight",
    slug: "chicago-deep-dish-delight",
    location: "Chicago, IL",
    cuisine: "Pizza",
    address: "456 Michigan Ave, Chicago, IL 60601",
    phone: "(312) 555-0456",
    description: "Authentic Chicago-style deep dish pizza",
    premium: false,
    deals: ["2 large pizzas for $25", "Free soda with large pie"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null
  },
  {
    title: "Boston Bistro",
    slug: "boston-bistro",
    location: "Boston, MA",
    cuisine: "American",
    address: "789 Newbury St, Boston, MA 02116",
    phone: "(617) 555-0789",
    description: "Classic New England cuisine with a modern twist",
    premium: true,
    deals: ["Brunch specials: $15 bottomless mimosas", "10% off for locals"],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: null
  }
];

// Reactive state
const searchQuery = ref("");
const selectedLocation = ref("");
const selectedCuisine = ref("");
const showDealsModal = ref(false);
const selectedRestaurant = ref(null);

// Computed properties
const availableCuisines = computed(() => {
  const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
  return cuisines.sort();
});

const filteredRestaurants = computed(() => {
  return restaurants.filter((restaurant) => {
    const matchesSearch = !searchQuery.value ||
      restaurant.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesLocation = !selectedLocation.value || restaurant.location === selectedLocation.value;

    const matchesCuisine = !selectedCuisine.value || restaurant.cuisine === selectedCuisine.value;

    return matchesSearch && matchesLocation && matchesCuisine;
  });
});

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedLocation.value = "";
  selectedCuisine.value = "";
};

const openDealsModal = (restaurant) => {
  selectedRestaurant.value = restaurant;
  showDealsModal.value = true;
};

const closeDealsModal = () => {
  showDealsModal.value = false;
  selectedRestaurant.value = null;
};
</script>