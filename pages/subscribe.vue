<template>
  <div>
    <!-- Page Header -->
    <section class="relative bg-gray-900 text-white py-20 overflow-hidden">
      <!-- Background Image -->
      <img
        src="/i90-bg.webp"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
        alt="I-90 Background"
        loading="eager"
        sizes="100vw"
      />
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-accent-900/70 to-primary-800/80"></div>
      <!-- Content -->
      <div class="relative z-10 container-max text-center px-4">
        <div class="inline-block mb-6">
          <span class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Free Newsletter
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Subscribe to I-90 Eats Newsletter</h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">Get weekly deals and hidden gems along I-90, tailored to your cities.</p>
      </div>
    </section>

    <!-- Subscription Form -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container-max max-w-4xl mx-auto px-4">
        <div class="card p-8 md:p-12 shadow-2xl">
          <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="text-5xl font-bold text-gradient mb-3">FREE</div>
            <p class="text-xl text-gray-600">Get exclusive restaurant deals delivered to your inbox</p>
          </div>

          <ClientOnly>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input id="email" v-model="email" type="email" required class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" placeholder="your@email.com" />
              </div>

              <!-- Location Selection - Using your correct I-90 locations -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Select I-90 Locations * ({{ selectedLocations.length }} selected)</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
                  <label v-for="location in locations" :key="location" class="flex items-center p-3 hover:bg-white hover:shadow-md rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-primary-200">
                    <input type="checkbox" :value="location" v-model="selectedLocations" class="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2" />
                    <span class="ml-3 text-sm font-medium text-gray-700">{{ location }}</span>
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
                <button type="submit" :disabled="!isFormValid || isSubmitting" :class="['w-full text-lg py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg', isFormValid && !isSubmitting ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white cursor-pointer hover:scale-105 hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed']">
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Subscribe for Free
                  </span>
                </button>
              </div>
            </form>
          </ClientOnly>
          
          <div v-if="error" class="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p class="text-red-800 text-center font-medium">{{ error }}</p>
          </div>
          <div v-if="success" class="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p class="text-green-800 text-center font-medium flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Welcome! Check your email for confirmation and start exploring deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI90Locations } from '~/composables/useI90Locations';
import { useAuth } from '~/composables/useAuth';
const { signInSubscriber } = useAuth();
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

// ... existing code ...

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  isSubmitting.value = true;
  error.value = '';
  success.value = false;
  
  try {
    const result = await signInSubscriber(email.value, selectedLocations.value);
    
    if (result.success) {
      success.value = true;
      
      // Redirect after 2 seconds
      setTimeout(async () => {
        await navigateTo('/directory');
      }, 2000);
    } else {
      throw new Error(result.error || 'Subscription failed');
    }
  } catch (err) {
    error.value = err.message || 'Subscription failed';
  } finally {
    isSubmitting.value = false;
  }
};
</script>