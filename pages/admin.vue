<template>
  <div>
    <!-- Page Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Content Management</h1>
        <p class="text-xl text-primary-100">
          Manage restaurants, newsletters, and subscriber data
        </p>
      </div>
    </section>

    <!-- Admin Dashboard -->
    <section class="py-16">
      <div class="container-max max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- CMS Access -->
          <div class="card p-6 text-center">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Content Management
            </h3>
            <p class="text-gray-600 mb-4">
              Add and edit restaurants, deals, and newsletters
            </p>
            <button @click="openCMS" class="btn-primary w-full">
              Open CMS
            </button>
          </div>

          <!-- Restaurant Management -->
          <div class="card p-6 text-center">
            <div
              class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-accent-600"
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
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Restaurants
            </h3>
            <p class="text-gray-600 mb-4">
              Manage restaurant listings and deals
            </p>
            <NuxtLink to="/directory" class="btn-secondary w-full inline-block">
              View Directory
            </NuxtLink>
          </div>

          <!-- Newsletter Management -->
          <div class="card p-6 text-center">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-secondary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Newsletters
            </h3>
            <p class="text-gray-600 mb-4">
              Create and manage weekly newsletters
            </p>
            <button @click="createNewsletter" class="btn-accent w-full">
              Create Newsletter
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">
              {{ stats.totalRestaurants }}
            </div>
            <div class="text-gray-600">Total Restaurants</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-accent-600 mb-2">
              {{ stats.premiumRestaurants }}
            </div>
            <div class="text-gray-600">Premium Listings</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-secondary-600 mb-2">
              {{ stats.totalSubscribers }}
            </div>
            <div class="text-gray-600">Active Subscribers</div>
          </div>

          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">
              {{ stats.newslettersSent }}
            </div>
            <div class="text-gray-600">Newsletters Sent</div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">
            Recent Activity
          </h3>

          <div class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div
                class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-5 h-5 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>

              <div class="flex-1">
                <p class="text-gray-900 font-medium">{{ activity.title }}</p>
                <p class="text-sm text-gray-600">{{ activity.description }}</p>
              </div>

              <div class="text-sm text-gray-500">
                {{ formatDate(activity.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CMS Modal -->
    <div
      v-if="showCMSModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-900">
            Content Management System
          </h3>
          <button @click="closeCMS" class="text-gray-400 hover:text-gray-600">
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
          <p class="text-gray-600 mb-6">
            The CMS will open in a new tab. You can manage restaurants,
            newsletters, and subscriber data there.
          </p>

          <div class="flex gap-4">
            <button @click="openCMSInNewTab" class="btn-primary">
              Open CMS in New Tab
            </button>
            <button @click="closeCMS" class="btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Protect admin page
definePageMeta({
  middleware: "admin",
});

// State
const showCMSModal = ref(false);

// Sample stats data
const stats = ref({
  totalRestaurants: 15,
  premiumRestaurants: 8,
  totalSubscribers: 342,
  newslettersSent: 24,
});

// Sample recent activity
const recentActivity = ref([
  {
    id: 1,
    title: "New Restaurant Added",
    description: "The Chicago Deep Dish Delight was added to the directory",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    title: "Newsletter Sent",
    description: "Weekly newsletter sent to 342 subscribers",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    title: "Deals Updated",
    description: "Updated deals for Seattle Seafood Co.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 4,
    title: "New Subscriber",
    description: "John Doe subscribed to Seattle and Spokane locations",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
]);

// Methods
const openCMS = () => {
  showCMSModal.value = true;
};

const closeCMS = () => {
  showCMSModal.value = false;
};

const openCMSInNewTab = () => {
  window.open("/admin/cms", "_blank");
  closeCMS();
};

const createNewsletter = () => {
  // TODO: Implement newsletter creation
  alert("Newsletter creation feature coming soon!");
};

const formatDate = (date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};
</script>
