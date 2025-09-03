<template>
  <div>
    <!-- Page Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Restaurant Directory</h1>
        <p class="text-xl text-primary-100">
          Discover amazing restaurants along Interstate 90
        </p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="bg-white py-8 border-b border-gray-200">
      <div class="container-max">
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search restaurants..."
                class="input-field pl-10"
              />
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Location Filter -->
          <div class="lg:w-64">
            <select v-model="selectedLocation" class="input-field">
              <option value="">All Locations</option>
              <option
                v-for="location in allLocations"
                :key="location"
                :value="location"
              >
                {{ location }}
              </option>
            </select>
          </div>

          <!-- Cuisine Filter -->
          <div class="lg:w-64">
            <select v-model="selectedCuisine" class="input-field">
              <option value="">All Cuisines</option>
              <option
                v-for="cuisine in availableCuisines"
                :key="cuisine"
                :value="cuisine"
              >
                {{ cuisine }}
              </option>
            </select>
          </div>

          <!-- Clear Filters -->
          <button @click="clearFilters" class="btn-secondary whitespace-nowrap">
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Results Summary -->
    <section class="bg-gray-50 py-4">
      <div class="container-max">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <p class="text-gray-600">
            Showing {{ filteredRestaurants.length }} of
            {{ restaurants.length }} restaurants
          </p>

          <div
            v-if="selectedLocation || selectedCuisine"
            class="flex items-center gap-2 mt-2 sm:mt-0"
          >
            <span class="text-sm text-gray-500">Active filters:</span>
            <span
              v-if="selectedLocation"
              class="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full"
            >
              {{ selectedLocation }}
            </span>
            <span
              v-if="selectedCuisine"
              class="bg-accent-100 text-accent-800 text-sm px-2 py-1 rounded-full"
            >
              {{ selectedCuisine }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Restaurant Grid -->
    <section class="py-12">
      <div class="container-max">
        <div v-if="filteredRestaurants.length === 0" class="text-center py-16">
          <div
            class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No restaurants found
          </h3>
          <p class="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find more restaurants.
          </p>
          <button @click="clearFilters" class="btn-primary">
            Clear All Filters
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.slug"
            class="card hover:shadow-xl transition-shadow duration-300"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                v-if="restaurant.image"
                :src="restaurant.image"
                :alt="restaurant.title"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ restaurant.title }}
                </h3>
                <span
                  v-if="restaurant.premium"
                  class="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  Premium
                </span>
              </div>

              <p class="text-gray-600 mb-2">{{ restaurant.location }}</p>
              <p class="text-gray-500 text-sm mb-4">{{ restaurant.cuisine }}</p>

              <!-- Deals Section - Behind Payment Gate or Unlocked -->
              <div
                v-if="!isSubscribed"
                class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-4 border border-primary-200"
              >
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <svg
                      class="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-2">
                    Exclusive Deals Available
                  </h4>
                  <p class="text-sm text-gray-600 mb-3">
                    Subscribe to unlock current deals and specials from this
                    restaurant
                  </p>
                  <button
                    @click="openDealsModal(restaurant)"
                    class="btn-primary text-sm px-4 py-2"
                  >
                    View Deals - $2.99/month
                  </button>
                </div>
              </div>

              <!-- Unlocked Deals for Subscribers -->
              <div
                v-else
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200"
              >
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <svg
                      class="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 class="font-semibold text-gray-900 mb-2">
                    Current Deals
                  </h4>
                  <div class="text-left space-y-2">
                    <div class="bg-white rounded p-3 border border-green-200">
                      <h5 class="font-medium text-gray-900">
                        Happy Hour Special
                      </h5>
                      <p class="text-sm text-gray-600">
                        20% off appetizers Mon-Fri 3-6pm
                      </p>
                      <p class="text-xs text-green-600 font-medium">
                        Valid until Feb 29, 2024
                      </p>
                    </div>
                    <div class="bg-white rounded p-3 border border-green-200">
                      <h5 class="font-medium text-gray-900">Weekend Brunch</h5>
                      <p class="text-sm text-gray-600">
                        Free mimosa with entree purchase
                      </p>
                      <p class="text-xs text-green-600 font-medium">
                        Saturdays & Sundays
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <NuxtLink
                  :to="`/restaurant/${restaurant.slug}`"
                  class="btn-secondary flex-1 text-center"
                >
                  View Details
                </NuxtLink>

                <a
                  v-if="restaurant.phone"
                  :href="`tel:${restaurant.phone}`"
                  class="ml-2 p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Call restaurant"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="bg-primary-600 text-white py-16">
      <div class="container-max text-center">
        <h2 class="text-3xl font-bold mb-4">Get Weekly Newsletter</h2>
        <p class="text-xl text-primary-100 mb-8">
          Subscribe to our newsletter for food news, travel tips, and I-90
          insights
        </p>
        <NuxtLink to="/subscribe" class="btn-accent text-lg px-8 py-4">
          Subscribe Now - $2.99/month
        </NuxtLink>
      </div>
    </section>

    <!-- Deals Modal -->
    <div
      v-if="showDealsModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            Deals from {{ selectedRestaurant?.title }}
          </h3>
          <button
            @click="closeDealsModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              Deals are Locked
            </h4>
            <p class="text-gray-600 mb-4">
              Subscribe to our newsletter to unlock exclusive deals and specials
              from this restaurant
            </p>
          </div>

          <div
            class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 mb-6"
          >
            <h5 class="font-semibold text-gray-900 mb-2">What you'll get:</h5>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>• Current deals and specials</li>
              <li>• Happy hour information</li>
              <li>• Seasonal promotions</li>
              <li>• Exclusive subscriber-only offers</li>
            </ul>
          </div>

          <div class="flex gap-4">
            <NuxtLink to="/subscribe" class="btn-primary flex-1 text-center">
              Subscribe Now
            </NuxtLink>
            <button @click="closeDealsModal" class="btn-secondary flex-1">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Subscription management
const { isSubscribed, checkSubscription } = useSubscription();

// Check subscription status on page load
onMounted(() => {
  checkSubscription();
});

// I-90 locations data
const { allLocations } = useI90Locations();

// Sample restaurant data for demo (deals removed from restaurants)
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
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
    const matchesSearch =
      !searchQuery.value ||
      restaurant.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      restaurant.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesLocation =
      !selectedLocation.value || restaurant.location === selectedLocation.value;

    const matchesCuisine =
      !selectedCuisine.value || restaurant.cuisine === selectedCuisine.value;

    return matchesSearch && matchesLocation && matchesCuisine;
  });
});

// Methods
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
