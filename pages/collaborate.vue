<template>
  <div>
    <!-- Hero Section with Image Background -->
    <section class="relative bg-gray-900 text-white py-24 overflow-hidden">
      <!-- Background Image -->
      <img
        src="/i90-bg.webp"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
        alt="I-90 Background"
        loading="eager"
        sizes="100vw"
      />
      <!-- Animated Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-accent-900/70 to-primary-800/80"></div>
      
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 container-max text-center px-4">
        <div class="inline-block mb-6">
          <span class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            Let's Work Together
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          LET'S COLLABORATE
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Partner with us to reach hungry travelers along I-90 and boost your business
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#contact" class="btn-primary text-lg px-8 py-4 shadow-xl hover:scale-105 transition-transform">
            Get Started
          </a>
          <a href="#benefits" class="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            Learn More
          </a>
        </div>
      </div>
    </section>

    <!-- Collaboration Opportunities Section -->
    <section id="benefits" class="py-20 bg-white">
      <div class="container-max max-w-6xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Boost Your Business
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're looking to highlight your local restaurant, revamp your social channels, 
            update your website photography, or train your staff on best social practices, we're your partners!
          </p>
        </div>

        <!-- Service Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div class="group card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Restaurant Features</h3>
            <p class="text-gray-600">Get featured in our directory and newsletters</p>
          </div>

          <div class="group card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Photography</h3>
            <p class="text-gray-600">Professional food and restaurant photography</p>
          </div>

          <div class="group card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Social Media</h3>
            <p class="text-gray-600">Content creation and social strategy</p>
          </div>

          <div class="group card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Training</h3>
            <p class="text-gray-600">Staff training on social best practices</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Benefits Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container-max max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Benefits List -->
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p class="text-lg text-gray-600 mb-8">
              We bring years of experience connecting restaurants with hungry travelers along the I-90 corridor.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start group">
                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Access to Food Enthusiasts</h3>
                  <p class="text-gray-600">Reach our growing subscriber base of food lovers along I-90</p>
                </div>
              </li>
              <li class="flex items-start group">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Featured Newsletter Placement</h3>
                  <p class="text-gray-600">Get featured in our weekly newsletters reaching thousands of subscribers</p>
                </div>
              </li>
              <li class="flex items-start group">
                <div class="flex-shrink-0 w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent-200 transition-colors">
                  <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Social Media Promotion</h3>
                  <p class="text-gray-600">Professional content creation and social media promotion</p>
                </div>
              </li>
              <li class="flex items-start group">
                <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Marketing Materials</h3>
                  <p class="text-gray-600">Professional photography and marketing materials for your business</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Contact Card -->
          <div class="card p-8 lg:p-10 shadow-2xl">
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Email The Team</h3>
              <p class="text-gray-600 mb-6">Get in touch for collaboration opportunities</p>
              <a href="mailto:contact@i90eats.com" class="btn-primary text-lg px-8 py-4 inline-block hover:scale-105 transition-transform">
                contact@i90eats.com
              </a>
            </div>
            <div class="border-t border-gray-200 pt-6">
              <p class="text-sm text-gray-500 text-center">
                Collaboration styles and rates vary by project. For a quote or to chat more details, reach out to our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="py-20 bg-white">
      <div class="container-max max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Start a Conversation</h2>
          <p class="text-xl text-gray-600">Tell us about your collaboration ideas and let's create something amazing together</p>
        </div>

        <div class="card p-8 md:p-12 shadow-xl">
          <ClientOnly>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                <input 
                  id="name" 
                  v-model="form.name" 
                  type="text" 
                  required 
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" 
                  placeholder="Your full name" 
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required 
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" 
                  placeholder="your@email.com" 
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Business/Restaurant Name -->
                <div>
                  <label for="business" class="block text-sm font-semibold text-gray-700 mb-2">Business/Restaurant Name</label>
                  <input 
                    id="business" 
                    v-model="form.business" 
                    type="text" 
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" 
                    placeholder="Your business name" 
                  />
                </div>

                <!-- Location -->
                <div>
                  <label for="location" class="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select 
                    id="location" 
                    v-model="form.location" 
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  >
                    <option value="">Select a location (optional)</option>
                    <option v-for="location in allLocations" :key="location" :value="location">{{ location }}</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="6" 
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none" 
                  placeholder="Tell us about your collaboration ideas, goals, and how we can help..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button 
                  type="submit" 
                  :disabled="!isFormValid || isSubmitting" 
                  :class="[
                    'w-full text-lg py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg',
                    isFormValid && !isSubmitting 
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white cursor-pointer hover:scale-105 hover:shadow-xl' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </span>
                </button>
              </div>
            </form>
          </ClientOnly>
          
          <div v-if="success" class="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p class="text-green-800 text-center font-medium flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Thank you! We'll get back to you soon.
            </p>
          </div>
          <div v-if="error" class="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p class="text-red-800 text-center font-medium">{{ error }}</p>
          </div>
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
    
    // Scroll to success message
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
