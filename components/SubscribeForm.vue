<template>
  <div>
    <!-- Debug Panel -->
    <div class="bg-yellow-100 border border-yellow-400 p-4 rounded mb-6">
      <h3 class="font-bold text-yellow-800">Debug Info:</h3>
      <p><strong>Email:</strong> "{{ formData.email }}"</p>
      <p>
        <strong>Locations Selected:</strong>
        {{ formData.selectedLocations.length }}
      </p>
      <p><strong>Terms Accepted:</strong> {{ formData.acceptTerms }}</p>
      <p><strong>Form Valid:</strong> {{ isFormValid }}</p>
      <button
        @click="testAlert"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-sm"
      >
        Test Alert
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="your@email.com"
        />
      </div>

      <!-- Location Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Select I-90 Locations * ({{
            formData.selectedLocations.length
          }}
          selected)
        </label>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4"
        >
          <label
            v-for="location in locations"
            :key="location"
            class="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="location"
              v-model="formData.selectedLocations"
              class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span class="ml-3 text-sm text-gray-700">{{ location }}</span>
          </label>
        </div>
      </div>

      <!-- Terms -->
      <div>
        <label class="flex items-start">
          <input
            type="checkbox"
            v-model="formData.acceptTerms"
            required
            class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
          />
          <span class="ml-3 text-sm text-gray-700">
            I agree to the Terms of Service and Privacy Policy. I understand
            that I will be charged $2.99/month and can cancel anytime.
          </span>
        </label>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="!isFormValid || isSubmitting"
          :class="[
            'w-full text-lg py-4 rounded-lg font-medium transition-all duration-200',
            isFormValid && !isSubmitting
              ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          <span v-if="isSubmitting" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5"
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
          <!-- Change button text -->
          <span v-else>Subscribe FREE - Unlock All Restaurants</span>        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// Get I-90 locations
const { allLocations } = useI90Locations();
const locations = allLocations;

// Form data
const formData = reactive({
  email: "",
  selectedLocations: [],
  acceptTerms: false,
});

const isSubmitting = ref(false);

// Computed property for form validation
const isFormValid = computed(() => {
  return (
    formData.email.trim() !== "" &&
    formData.selectedLocations.length > 0 &&
    formData.acceptTerms
  );
});

// Methods
const testAlert = () => {
  alert(`Form Status:
Email: "${formData.email}"
Locations: ${formData.selectedLocations.length}
Terms: ${formData.acceptTerms}
Valid: ${isFormValid.value}`);
};

const handleSubmit = async () => {
  console.log("Form submitted!", formData);

  if (!isFormValid.value) {
    alert("Please fill in all required fields");
    return;
  }

  isSubmitting.value = true;

  try {
    // Test API call first
    const response = await $fetch("/api/test");
    console.log("API test response:", response);

    // Then try subscription
    const subscriptionResponse = await $fetch("/api/subscription/create", {
      method: "POST",
      body: {
        email: formData.email,
        locations: formData.selectedLocations,
        priceId: "price_1S3luTFqXu3q4jXwq5cIzHNR",
      },
    });

    console.log("Subscription response:", subscriptionResponse);

    if (
      subscriptionResponse.success &&
      subscriptionResponse.data?.checkout_url
    ) {
      window.location.href = subscriptionResponse.data.checkout_url;
    } else {
      alert("Success! (Would redirect to Stripe in production)");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message || "Something went wrong"}`);
  } finally {
    isSubmitting.value = false;
  }
};

// Watch for changes to debug
watch(
  formData,
  () => {
    console.log("Form data changed:", formData);
  },
  { deep: true }
);
</script>
