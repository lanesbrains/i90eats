<template>
  <div>
    <!-- Page Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">
          Subscribe to I-90 Restaurant Deals
        </h1>
        <p class="text-xl text-primary-100">
          Get weekly newsletters with exclusive restaurant deals along your I-90
          route
        </p>
      </div>
    </section>

    <!-- Subscription Form -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto">
        <div class="card p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Choose Your Plan
            </h2>
            <p class="text-gray-600">
              Select your preferred I-90 locations and start receiving weekly
              deals
            </p>
          </div>

          <!-- Pricing -->
          <div
            class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-8"
          >
            <div class="text-center">
              <div class="text-4xl font-bold text-primary-600 mb-2">$2.99</div>
              <div class="text-lg text-gray-600 mb-4">per month</div>
              <ul class="text-left max-w-md mx-auto space-y-2">
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-green-500 mr-3"
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
                  Weekly newsletter with restaurant deals
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-green-500 mr-3"
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
                  Location-based deal filtering
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-green-500 mr-3"
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
                  Access to restaurant directory
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-green-500 mr-3"
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
                  Cancel anytime
                </li>
              </ul>
            </div>
          </div>

          <!-- Subscription Form -->
          <form @submit.prevent="handleSubscription" class="space-y-6">
            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="input-field"
                placeholder="your@email.com"
              />
            </div>

            <!-- Location Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Select I-90 Locations *
              </label>
              <p class="text-sm text-gray-600 mb-4">
                Choose the cities where you want to receive restaurant deals
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <label
                  v-for="location in allLocations"
                  :key="location"
                  class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="location"
                    v-model="selectedLocations"
                    class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span class="ml-3 text-sm text-gray-700">{{ location }}</span>
                </label>
              </div>

              <div
                v-if="selectedLocations.length === 0 && email.length > 0"
                class="text-red-600 text-sm mt-2"
              >
                Please select at least one location
              </div>
            </div>

            <!-- Newsletter Preferences -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Newsletter Preferences
              </label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="includePremium"
                    class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span class="ml-3 text-sm text-gray-700">
                    Include premium restaurant deals (recommended)
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="weeklyDigest"
                    class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span class="ml-3 text-sm text-gray-700">
                    Send weekly digest on Fridays
                  </span>
                </label>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div>
              <label class="flex items-start">
                <input
                  type="checkbox"
                  v-model="acceptTerms"
                  required
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                />
                <span class="ml-3 text-sm text-gray-700">
                  I agree to the
                  <a
                    href="#"
                    class="text-primary-600 hover:text-primary-700 underline"
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="#"
                    class="text-primary-600 hover:text-primary-700 underline"
                    >Privacy Policy</a
                  >. I understand that I will be charged $2.99/month and can
                  cancel anytime.
                </span>
              </label>
            </div>

            <!-- Debug Info (remove in production) -->
            <div
              v-if="process.dev"
              class="bg-gray-100 p-4 rounded text-sm mb-4"
            >
              <strong>Debug Info:</strong><br />
              Email: {{ email }}<br />
              Locations: {{ selectedLocations.length }}<br />
              Terms: {{ acceptTerms }}<br />
              Form Valid: {{ isFormValid }}
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  v-if="isSubmitting"
                  class="flex items-center justify-center"
                >
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
                <span v-else> Subscribe Now - $2.99/month </span>
              </button>
            </div>
          </form>

          <!-- Additional Info -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
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
                <h3 class="font-semibold text-gray-900 mb-1">Save Money</h3>
                <p class="text-sm text-gray-600">
                  Get exclusive deals and discounts
                </p>
              </div>

              <div>
                <div
                  class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <svg
                    class="w-6 h-6 text-accent-600"
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
                <h3 class="font-semibold text-gray-900 mb-1">
                  Discover Places
                </h3>
                <p class="text-sm text-gray-600">Find hidden gems along I-90</p>
              </div>

              <div>
                <div
                  class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <svg
                    class="w-6 h-6 text-secondary-600"
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
                <h3 class="font-semibold text-gray-900 mb-1">Weekly Updates</h3>
                <p class="text-sm text-gray-600">Fresh deals every week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-gray-50 py-16">
      <div class="container-max max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>

        <div class="space-y-6">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              How often will I receive newsletters?
            </h3>
            <p class="text-gray-600">
              You'll receive a weekly newsletter every Friday with the latest
              restaurant deals from your selected I-90 locations.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Can I change my location preferences?
            </h3>
            <p class="text-gray-600">
              Yes! You can update your location preferences anytime through your
              account dashboard.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              How do I cancel my subscription?
            </h3>
            <p class="text-gray-600">
              You can cancel your subscription anytime through your account
              dashboard or by contacting our support team.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Are the deals always current?
            </h3>
            <p class="text-gray-600">
              Yes! We verify all deals weekly to ensure they're current and
              valid before including them in newsletters.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// I-90 locations data
const { allLocations } = useI90Locations();

// Form state - using refs for better reactivity
const email = ref("");
const selectedLocations = ref([]);
const includePremium = ref(true);
const weeklyDigest = ref(true);
const acceptTerms = ref(false);
const isSubmitting = ref(false);

// Computed properties
const isFormValid = computed(() => {
  return (
    email.value.trim() !== "" &&
    selectedLocations.value.length > 0 &&
    acceptTerms.value
  );
});

// Methods
const handleSubscription = async () => {
  if (!isFormValid.value) {
    console.log("Form validation failed:", {
      email: email.value,
      locations: selectedLocations.value.length,
      terms: acceptTerms.value,
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch("/api/subscription/create", {
      method: "POST",
      body: {
        email: email.value,
        locations: selectedLocations.value,
        priceId: "price_1S3luTFqXu3q4jXwq5cIzHNR",
      },
    });

    if (response.success && response.data?.checkout_url) {
      // Redirect to Stripe checkout
      window.location.href = response.data.checkout_url;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Subscription error:", error);
    alert("There was an error processing your subscription. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

// Debug form state
watch([email, selectedLocations, acceptTerms], () => {
  console.log("Form state changed:", {
    email: email.value,
    locations: selectedLocations.value.length,
    terms: acceptTerms.value,
    valid: isFormValid.value,
  });
});
</script>
