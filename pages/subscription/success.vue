<template>
  <div>
    <!-- Success Header -->
    <section
      class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16"
    >
      <div class="container-max text-center">
        <div
          class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-white"
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
        <h1 class="text-4xl font-bold mb-4">
          Welcome to I-90 Restaurant Deals!
        </h1>
        <p class="text-xl text-green-100">
          Your subscription is now active. Start exploring exclusive deals!
        </p>
      </div>
    </section>

    <!-- Success Content -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto text-center">
        <div class="card p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="text-center">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Explore Restaurants
              </h3>
              <p class="text-gray-600">
                Browse our directory and discover deals at restaurants along
                I-90
              </p>
            </div>

            <div class="text-center">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Weekly Newsletter
              </h3>
              <p class="text-gray-600">
                Your first newsletter will arrive this Friday with fresh deals
              </p>
            </div>

            <div class="text-center">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Save Money
              </h3>
              <p class="text-gray-600">
                Start using exclusive deals and discounts right away
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/directory" class="btn-primary">
              Browse Restaurant Directory
            </NuxtLink>
            <NuxtLink to="/blog" class="btn-secondary">
              Read Food & Travel Tips
            </NuxtLink>
          </div>
        </div>

        <!-- Subscription Details -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Subscription Details
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <span class="text-sm text-gray-600">Plan:</span>
              <div class="font-medium text-gray-900">
                I-90 Restaurant Deals Newsletter
              </div>
            </div>
            <div>
              <span class="text-sm text-gray-600">Price:</span>
              <div class="font-medium text-gray-900">$2.99/month</div>
            </div>
            <div>
              <span class="text-sm text-gray-600">Billing:</span>
              <div class="font-medium text-gray-900">
                Monthly (auto-renewal)
              </div>
            </div>
            <div>
              <span class="text-sm text-gray-600">Status:</span>
              <div class="font-medium text-green-600">Active</div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <p class="text-sm text-gray-600 mb-2">
              <strong>Need help?</strong> Contact us at support@i90eats.com
            </p>
            <p class="text-sm text-gray-600">
              You can manage your subscription anytime through your account or
              by contacting support.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// Set subscription status in localStorage when user arrives
onMounted(() => {
  // Mark user as subscribed
  localStorage.setItem(
    "subscription_status",
    JSON.stringify({
      active: true,
      status: "active",
      timestamp: Date.now(),
    })
  );

  // Optional: Get session details from URL params
  const route = useRoute();
  const sessionId = route.query.session_id;

  if (sessionId) {
    console.log("Stripe session completed:", sessionId);
    // You could verify the session with Stripe here if needed
  }
});
</script>
