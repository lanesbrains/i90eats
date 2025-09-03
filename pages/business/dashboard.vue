<template>
  <div>
    <!-- Page Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Business Dashboard</h1>
        <p class="text-xl text-primary-100">
          Manage your restaurant listing and deals
        </p>
      </div>
    </section>

    <!-- Dashboard Content -->
    <section class="py-16">
      <div class="container-max max-w-6xl mx-auto">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">
              {{ stats.views }}
            </div>
            <div class="text-gray-600">Profile Views</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-accent-600 mb-2">
              {{ stats.activeDeals }}
            </div>
            <div class="text-gray-600">Active Deals</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-secondary-600 mb-2">
              {{ stats.clicks }}
            </div>
            <div class="text-gray-600">Phone Clicks</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">
              {{ currentPlan }}
            </div>
            <div class="text-gray-600">Current Plan</div>
          </div>
        </div>

        <!-- Main Dashboard -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Restaurant Information -->
          <div class="lg:col-span-2">
            <div class="card p-6 mb-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">
                  Restaurant Information
                </h2>
                <button
                  @click="editingInfo = !editingInfo"
                  class="btn-secondary text-sm"
                >
                  {{ editingInfo ? "Cancel" : "Edit Info" }}
                </button>
              </div>

              <form
                v-if="editingInfo"
                @submit.prevent="saveRestaurantInfo"
                class="space-y-4"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Restaurant Name</label
                    >
                    <input
                      v-model="restaurantInfo.name"
                      type="text"
                      class="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Cuisine Type</label
                    >
                    <input
                      v-model="restaurantInfo.cuisine"
                      type="text"
                      class="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Location</label
                  >
                  <select
                    v-model="restaurantInfo.location"
                    class="input-field"
                    required
                  >
                    <option value="">Select location</option>
                    <option
                      v-for="location in allLocations"
                      :key="location"
                      :value="location"
                    >
                      {{ location }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Address</label
                  >
                  <textarea
                    v-model="restaurantInfo.address"
                    rows="2"
                    class="input-field"
                    required
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Phone</label
                    >
                    <input
                      v-model="restaurantInfo.phone"
                      type="tel"
                      class="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Website</label
                    >
                    <input
                      v-model="restaurantInfo.website"
                      type="url"
                      class="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Description</label
                  >
                  <textarea
                    v-model="restaurantInfo.description"
                    rows="4"
                    class="input-field"
                    required
                  ></textarea>
                </div>

                <div class="flex gap-4">
                  <button
                    type="submit"
                    class="btn-primary"
                    :disabled="savingInfo"
                  >
                    {{ savingInfo ? "Saving..." : "Save Changes" }}
                  </button>
                  <button
                    type="button"
                    @click="editingInfo = false"
                    class="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div v-else class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span class="text-sm text-gray-600">Restaurant Name:</span>
                    <div class="font-medium text-gray-900">
                      {{ restaurantInfo.name }}
                    </div>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600">Cuisine:</span>
                    <div class="font-medium text-gray-900">
                      {{ restaurantInfo.cuisine }}
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Location:</span>
                  <div class="font-medium text-gray-900">
                    {{ restaurantInfo.location }}
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Address:</span>
                  <div class="font-medium text-gray-900">
                    {{ restaurantInfo.address }}
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span class="text-sm text-gray-600">Phone:</span>
                    <div class="font-medium text-gray-900">
                      {{ restaurantInfo.phone }}
                    </div>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600">Website:</span>
                    <div class="font-medium text-gray-900">
                      <a
                        v-if="restaurantInfo.website"
                        :href="restaurantInfo.website"
                        target="_blank"
                        class="text-primary-600 hover:text-primary-700"
                      >
                        {{ restaurantInfo.website }}
                      </a>
                      <span v-else class="text-gray-400">Not provided</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Description:</span>
                  <div class="font-medium text-gray-900">
                    {{ restaurantInfo.description }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Deals Management -->
            <div class="card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">
                  Current Deals
                </h2>
                <button @click="showAddDeal = true" class="btn-primary text-sm">
                  Add New Deal
                </button>
              </div>

              <div v-if="deals.length === 0" class="text-center py-8">
                <div
                  class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-gray-400"
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
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  No deals yet
                </h3>
                <p class="text-gray-600 mb-4">
                  Create your first deal to attract customers
                </p>
                <button @click="showAddDeal = true" class="btn-primary">
                  Create Your First Deal
                </button>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="deal in deals"
                  :key="deal.id"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="font-semibold text-gray-900">
                      {{ deal.title }}
                    </h3>
                    <div class="flex items-center gap-2">
                      <span
                        :class="
                          deal.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        "
                        class="text-xs px-2 py-1 rounded-full"
                      >
                        {{ deal.active ? "Active" : "Inactive" }}
                      </span>
                      <button
                        @click="editDeal(deal)"
                        class="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteDeal(deal.id)"
                        class="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">
                    {{ deal.description }}
                  </p>
                  <div class="text-xs text-gray-500">
                    Valid: {{ formatDate(deal.startDate) }} -
                    {{ formatDate(deal.endDate) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Subscription Management -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Subscription
              </h3>
              <div class="space-y-3">
                <div>
                  <span class="text-sm text-gray-600">Current Plan:</span>
                  <div class="font-medium text-gray-900">
                    {{ currentPlan }} Listing
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Monthly Cost:</span>
                  <div class="font-medium text-gray-900">
                    ${{ currentPlan === "Premium" ? "19.99" : "9.99" }}
                  </div>
                </div>
                <div>
                  <span class="text-sm text-gray-600">Next Billing:</span>
                  <div class="font-medium text-gray-900">{{ nextBilling }}</div>
                </div>
                <div class="pt-3 border-t border-gray-200">
                  <button
                    v-if="currentPlan === 'Basic'"
                    @click="upgradePlan"
                    class="btn-accent w-full text-sm"
                  >
                    Upgrade to Premium
                  </button>
                  <button
                    @click="manageBilling"
                    class="btn-secondary w-full text-sm mt-2"
                  >
                    Manage Billing
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div class="space-y-3">
                <NuxtLink
                  :to="`/restaurant/${restaurantSlug}`"
                  class="btn-secondary w-full text-sm"
                >
                  View Public Listing
                </NuxtLink>
                <button
                  @click="showAddDeal = true"
                  class="btn-primary w-full text-sm"
                >
                  Create New Deal
                </button>
                <NuxtLink to="/admin" class="btn-secondary w-full text-sm">
                  Content Manager
                </NuxtLink>
              </div>
            </div>

            <!-- Support -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                Contact our business support team for assistance with your
                listing.
              </p>
              <a
                href="mailto:business@i90eats.com"
                class="btn-secondary w-full text-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add Deal Modal -->
    <div
      v-if="showAddDeal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            {{ editingDeal ? "Edit Deal" : "Add New Deal" }}
          </h3>
          <button
            @click="closeAddDeal"
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

        <form @submit.prevent="saveDeal" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Deal Title</label
            >
            <input
              v-model="dealForm.title"
              type="text"
              class="input-field"
              required
              placeholder="e.g., Happy Hour Special"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="dealForm.description"
              rows="3"
              class="input-field"
              required
              placeholder="Describe your deal in detail..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Start Date</label
              >
              <input
                v-model="dealForm.startDate"
                type="date"
                class="input-field"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >End Date</label
              >
              <input
                v-model="dealForm.endDate"
                type="date"
                class="input-field"
                required
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              v-model="dealForm.active"
              type="checkbox"
              class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label class="ml-2 text-sm text-gray-700">Deal is active</label>
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="btn-primary flex-1"
              :disabled="savingDeal"
            >
              {{
                savingDeal
                  ? "Saving..."
                  : editingDeal
                  ? "Update Deal"
                  : "Create Deal"
              }}
            </button>
            <button
              type="button"
              @click="closeAddDeal"
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Protect business dashboard
definePageMeta({
  middleware: "auth", // You'll need to implement business auth
});

// Locations
const { allLocations } = useI90Locations();

// State
const editingInfo = ref(false);
const savingInfo = ref(false);
const showAddDeal = ref(false);
const editingDeal = ref(null);
const savingDeal = ref(false);

// Sample data (in production, fetch from API)
const stats = ref({
  views: 1247,
  activeDeals: 3,
  clicks: 89,
});

const currentPlan = ref("Premium");
const nextBilling = ref("March 15, 2024");
const restaurantSlug = ref("seattle-seafood-co");

const restaurantInfo = ref({
  name: "The Seattle Seafood Co.",
  cuisine: "Seafood",
  location: "Seattle, WA",
  address: "123 Pike Place, Seattle, WA 98101",
  phone: "(206) 555-0123",
  website: "https://seattleseafoodco.com",
  description:
    "Fresh seafood with a view of Puget Sound. Specializing in Pacific Northwest favorites including salmon, dungeness crab, and fresh oysters.",
});

const deals = ref([
  {
    id: 1,
    title: "Happy Hour Oysters",
    description: "Half price on all oysters Monday-Friday 3-6pm",
    startDate: "2024-01-15",
    endDate: "2024-02-29",
    active: true,
  },
  {
    id: 2,
    title: "Weekend Brunch Special",
    description: "Free mimosa with any entree purchase on weekends",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    active: true,
  },
]);

const dealForm = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  active: true,
});

// Methods
const saveRestaurantInfo = async () => {
  savingInfo.value = true;
  try {
    await $fetch("/api/business/restaurant", {
      method: "PUT",
      body: {
        restaurantId: restaurantSlug.value,
        ...restaurantInfo.value,
      },
    });
    editingInfo.value = false;
    alert("Restaurant information updated successfully!");
  } catch (error) {
    console.error("Save error:", error);
    alert("Error saving information. Please try again.");
  } finally {
    savingInfo.value = false;
  }
};

const editDeal = (deal) => {
  editingDeal.value = deal;
  dealForm.value = { ...deal };
  showAddDeal.value = true;
};

const saveDeal = async () => {
  savingDeal.value = true;
  try {
    if (editingDeal.value) {
      // Update existing deal
      await $fetch(`/api/business/deals/${editingDeal.value.id}`, {
        method: "PUT",
        body: dealForm.value,
      });
      const index = deals.value.findIndex((d) => d.id === editingDeal.value.id);
      deals.value[index] = { ...dealForm.value, id: editingDeal.value.id };
    } else {
      // Add new deal
      const response = await $fetch("/api/business/deals", {
        method: "POST",
        body: {
          restaurantId: restaurantSlug.value,
          ...dealForm.value,
        },
      });
      deals.value.push({
        ...dealForm.value,
        id: response.data.id,
      });
    }

    closeAddDeal();
    alert("Deal saved successfully!");
  } catch (error) {
    console.error("Deal save error:", error);
    alert("Error saving deal. Please try again.");
  } finally {
    savingDeal.value = false;
  }
};

const deleteDeal = async (dealId) => {
  if (confirm("Are you sure you want to delete this deal?")) {
    try {
      await $fetch(`/api/business/deals/${dealId}`, {
        method: "DELETE",
      });
      deals.value = deals.value.filter((d) => d.id !== dealId);
      alert("Deal deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting deal. Please try again.");
    }
  }
};

const closeAddDeal = () => {
  showAddDeal.value = false;
  editingDeal.value = null;
  dealForm.value = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    active: true,
  };
};

const upgradePlan = () => {
  // TODO: Redirect to Stripe billing portal for upgrade
  alert("Upgrade functionality coming soon!");
};

const manageBilling = () => {
  // TODO: Redirect to Stripe customer portal
  alert("Billing management coming soon!");
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

onMounted(() => {
  // TODO: Fetch restaurant data and deals from API
  console.log("Business dashboard loaded");
});
</script>
