<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Subscribe to I-90 Eats Newsletter</h1>
        <p class="text-xl text-primary-100">Get weekly deals and hidden gems along I-90, tailored to your cities.</p>
      </div>
    </section>

    <!-- Subscription Form -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="text-4xl font-bold text-primary-600 mb-2">FREE</div>
            <p class="text-gray-600">Get exclusive restaurant deals delivered to your inbox</p>
          </div>

          <ClientOnly>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input id="email" v-model="email" type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="your@email.com" />
              </div>

              <!-- Location Selection - Using your correct I-90 locations -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select I-90 Locations * ({{ selectedLocations.length }} selected)</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  <label v-for="location in locations" :key="location" class="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" :value="location" v-model="selectedLocations" class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                    <span class="ml-3 text-sm text-gray-700">{{ location }}</span>
                  </label>
                </div>
              </div>

              <!-- Terms -->
              <div>
                <label class="flex items-start">
                  <input type="checkbox" v-model="acceptTerms" required class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1" />
                  <span class="ml-3 text-sm text-gray-700">I agree to the Terms of Service and Privacy Policy.</span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button type="submit" :disabled="!isFormValid || isSubmitting" :class="['w-full text-lg py-4 rounded-lg font-medium transition-all duration-200', isFormValid && !isSubmitting ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed']">
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                  <span v-else>Subscribe for Free</span>
                </button>
              </div>
            </form>
          </ClientOnly>
          
          <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
          <p v-if="success" class="text-green-600 mt-4 text-center">Welcome! Check your email for confirmation and start exploring deals.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSecureSubscription } from '~/composables/useSecureSubscription';
import { useI90Locations } from '~/composables/useI90Locations';

const { signupAndVerify } = useSecureSubscription();
const { allLocations } = useI90Locations();

const email = ref('');
const selectedLocations = ref([]);
const acceptTerms = ref(false);
const isSubmitting = ref(false);
const error = ref('');
const success = ref(false);

// Use your existing correct I-90 locations
const locations = allLocations;

const isFormValid = computed(() => email.value.trim() && selectedLocations.value.length > 0 && acceptTerms.value);

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  error.value = '';
  success.value = false;
  try {
    const response = await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value, locations: selectedLocations.value }
    });
    if (response.ok) {
      await signupAndVerify(email.value);  // Verify + persist
      success.value = true;
    } else {
      throw new Error(response.error || 'Signup failed');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>