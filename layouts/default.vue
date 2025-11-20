<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div class="container-max">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
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
            <span class="text-xl font-bold text-gray-900">I-90 Eats</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/directory"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Restaurants
            </NuxtLink>
            <NuxtLink
              to="/blog"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Blog
            </NuxtLink>
            <!-- Only show Business Dashboard for business users -->
            <NuxtLink
              v-if="isBusinessUser"
              to="/business/dashboard"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Business
            </NuxtLink>
            <NuxtLink
              to="/business/signup"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              List Restaurant
            </NuxtLink>
            <AuthNav />
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div
          v-if="showMobileMenu"
          class="md:hidden py-4 border-t border-gray-200"
        >
          <div class="flex flex-col space-y-4">
            <NuxtLink
              to="/"
              @click="closeMobileMenu"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/directory"
              @click="closeMobileMenu"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Restaurants
            </NuxtLink>
            <NuxtLink
              to="/blog"
              @click="closeMobileMenu"
              class="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Blog
            </NuxtLink>
            <AuthNav />
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container-max">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div
                class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white"
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
              <span class="text-xl font-bold">I-90 Eats</span>
            </div>
            <p class="text-gray-300 mb-4 max-w-md">
              Discover exclusive restaurant deals along Interstate 90 from
              Seattle to Boston. Save money on great food with our weekly
              newsletter.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Home</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/directory"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Restaurants</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/blog"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Blog</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/subscribe"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Subscribe</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Help Center</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Contact Us</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Privacy Policy</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-300 hover:text-white transition-colors"
                  >Terms of Service</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            &copy; 2025 I-90 Eats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

// Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "I-90 Eats",
  "url": process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com",
  "logo": `${process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com"}/logo.png`,
  "description": "Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials and save money on great food.",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@i90eats.com",
    "availableLanguage": "English"
  },
  "sameAs": [
    // "https://twitter.com/i90eats",
    // "https://facebook.com/i90eats"
  ]
}

// Website Schema for SEO
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "I-90 Eats",
  "url": process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com",
  "description": "Find great restaurant deals along Interstate 90 from Seattle to Boston",
  "publisher": {
    "@type": "Organization",
    "name": "I-90 Eats"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com"}/directory?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

// SEO and Analytics + JSON-LD (after schemas are defined)
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}${useRoute().path}` }
  ],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(websiteSchema) }
  ],
  __dangerouslyDisableSanitizers: ['script']
})

// Check if user is a business owner (has business subscription)
const isBusinessUser = computed(() => {
  // TODO: Check if user has active business subscription
  // For now, check if they have business-related localStorage or session
  if (process.client) {
    return localStorage.getItem('i90_business_owner') === 'true'
  }
  return false
})
</script>
