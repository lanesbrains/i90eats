<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">LET'S COLLABORATE</h1>
        <p class="text-xl text-primary-100">Partner with us to reach hungry travelers along I-90</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto">
        <!-- Collaboration Opportunities -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Boost Your Business</h2>
          <p class="text-lg text-gray-600 mb-8">
            Whether you're looking to highlight your local restaurant, revamp your social channels, 
            update your website photography, or train your staff on best social practices, we're your partners!
          </p>
          <p class="text-gray-600">
            Collaboration styles and rates vary by project. For a quote or to chat more details, 
            reach out to our team below.
          </p>
        </div>

        <!-- Contact Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Email Contact -->
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Email The Team</h3>
            <p class="text-gray-600 mb-4">Get in touch for collaboration opportunities</p>
            <a href="mailto:contact@i90eats.com" class="btn-primary inline-block">contact@i90eats.com</a>
          </div>

          <!-- Partnership Benefits -->
          <div class="card p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Why Partner With Us?</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Access to our subscriber base of food enthusiasts</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Featured placement in our weekly newsletters</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Social media promotion and content creation</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Professional photography and marketing materials</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card p-8">
          <h3 class="text-2xl font-bold text-gray-900 text-center mb-6">Start a Conversation</h3>
          
          <ClientOnly>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                <input id="name" v-model="form.name" type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Your full name" />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input id="email" v-model="form.email" type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="your@email.com" />
              </div>

              <!-- Business/Restaurant Name -->
              <div>
                <label for="business" class="block text-sm font-medium text-gray-700 mb-2">Business/Restaurant Name</label>
                <input id="business" v-model="form.business" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Your business name" />
              </div>

              <!-- Location -->
              <div>
                <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select id="location" v-model="form.location" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select a location (optional)</option>
                  <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea id="message" v-model="form.message" required rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Tell us about your collaboration ideas..."></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button type="submit" :disabled="!isFormValid || isSubmitting" :class="['w-full text-lg py-4 rounded-lg font-medium transition-all duration-200', isFormValid && !isSubmitting ? 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed']">
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                  <span v-else>Send Message</span>
                </button>
              </div>
            </form>
          </ClientOnly>
          
          <p v-if="success" class="text-green-600 mt-4 text-center">Thank you! We'll get back to you soon.</p>
          <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI90Locations } from '~/composables/useI90Locations';

const { allLocations } = useI90Locations();

const form = ref({
  name: '',
  email: '',
  business: '',
  location: '',
  message: ''
});

const isSubmitting = ref(false);
const success = ref(false);
const error = ref('');

const isFormValid = computed(() => {
  return form.value.name.trim() && 
         form.value.email.trim() && 
         form.value.message.trim();
});

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  
  isSubmitting.value = true;
  error.value = '';
  success.value = false;
  
  try {
    // For now, just simulate success
    // In production, you'd send this to your backend API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success.value = true;
    form.value = {
      name: '',
      email: '',
      business: '',
      location: '',
      message: ''
    };
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
