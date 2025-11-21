<template>
  <div>
    <ClientOnly>
      <div v-if="restaurant" class="min-h-screen">
        <!-- Dynamic Hero Banner with Featured Image -->
        <section 
          class="relative py-24 text-white overflow-hidden"
          :class="restaurant.image ? 'min-h-[60vh]' : 'py-16'"
        >
          <!-- Background Image or Gradient -->
          <div 
            v-if="restaurant.image"
            class="absolute inset-0 bg-black/50 z-10"
          ></div>
          <img
            v-if="restaurant.image"
            :src="restaurant.image"
            :alt="restaurant.title"
            class="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            sizes="100vw"
          />
          <div 
            v-else
            class="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-accent-900/80 to-primary-800/90"
          >
            <img
              src="/i90-bg.webp"
              class="absolute inset-0 w-full h-full object-cover opacity-40"
              alt="I-90 Background"
            />
          </div>

          <!-- Content -->
          <div class="container-max relative z-20 px-4">
            <div class="max-w-4xl mx-auto">
              <div class="flex flex-col lg:flex-row items-center gap-8">
                <!-- Restaurant Image (if available, show as card) -->
                <div 
                  v-if="restaurant.image"
                  class="w-full lg:w-80 h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10"
                >
                  <img 
                    :src="restaurant.image" 
                    :alt="restaurant.title"
                    class="w-full h-full object-cover"
                    sizes="sm:100vw md:400px lg:400px"
                  />
                </div>
                
                <!-- Restaurant Info -->
                <div class="flex-1 text-center lg:text-left">
                  <div class="flex items-center justify-center lg:justify-start gap-3 mb-4 flex-wrap">
                    <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg">{{ restaurant.title }}</h1>
                    <span v-if="restaurant.premium" class="bg-accent-500 text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg">
                      Premium
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-center lg:justify-start gap-4 text-white/90 text-lg mb-6">
                    <span class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ restaurant.location }}
                    </span>
                    <span v-if="restaurant.cuisine" class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {{ restaurant.cuisine }}
                    </span>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a 
                      v-if="restaurant.phone"
                      :href="`tel:${restaurant.phone}`"
                      class="btn-accent inline-flex items-center justify-center gap-2 text-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Restaurant
                    </a>
                    
                    <a 
                      v-if="restaurant.website"
                      :href="restaurant.website"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Restaurant Content -->
        <section class="py-16 bg-white">
          <div class="container-max px-4">
            <div class="max-w-4xl mx-auto">
              <!-- Address & Contact -->
              <div class="card p-6 md:p-8 mb-8 shadow-lg">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location & Contact
                </h2>
                <div class="space-y-3 text-gray-700">
                  <p v-if="restaurant.address" class="flex items-start gap-2">
                    <strong class="text-gray-900 min-w-[80px]">Address:</strong>
                    <span>{{ restaurant.address }}</span>
                  </p>
                  <p v-if="restaurant.phone" class="flex items-start gap-2">
                    <strong class="text-gray-900 min-w-[80px]">Phone:</strong>
                    <a :href="`tel:${restaurant.phone}`" class="text-primary-600 hover:text-primary-700 hover:underline">{{ restaurant.phone }}</a>
                  </p>
                  <p v-if="restaurant.website" class="flex items-start gap-2">
                    <strong class="text-gray-900 min-w-[80px]">Website:</strong>
                    <a :href="restaurant.website" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 hover:underline break-all">{{ restaurant.website }}</a>
                  </p>
                </div>
              </div>

              <!-- Description -->
              <article class="prose prose-lg max-w-none mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">About {{ restaurant.title }}</h2>
                <div class="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-primary-500 pl-6 bg-gray-50 py-4 rounded-r-lg">
                  {{ restaurant.description }}
                </div>
                <div v-html="restaurant.body || restaurant.description" class="restaurant-content"></div>
              </article>

              <!-- Deals Section -->
              <section class="py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                <div class="text-center mb-8 px-4">
                  <h2 class="text-3xl font-bold text-gray-900 mb-4">Current Deals & Specials</h2>
                  <p class="text-xl text-gray-600">Don't miss these amazing offers!</p>
                </div>
                
                <!-- Paywall for Non-Subscribed Users -->
                <div v-if="!isSubscriber" class="text-center py-12 px-4">
                  <div class="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold text-gray-900 mb-3">Deals Available</h3>
                  <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Subscribe to our free newsletter to unlock exclusive deals and specials from this restaurant.
                  </p>
                  <NuxtLink to="/subscribe" class="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 hover:scale-105 transition-transform">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Subscribe for Free
                  </NuxtLink>
                </div>
                
                <!-- Full Deals (for Subscribed Users) -->
                <div v-else class="max-w-3xl mx-auto px-4">
                  <div class="card p-8 shadow-xl">
                    <div class="prose prose-lg max-w-none restaurant-content" v-html="formattedDeals"></div>
                    <p v-if="!restaurant.deals && !restaurant.body?.includes('deals')" class="text-gray-600 mt-6 text-center text-lg">No current deals available—check back soon for updates!</p>
                  </div>
                </div>
              </section>

              <!-- Newsletter CTA -->
              <div class="mt-12 card p-8 shadow-xl bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div class="flex items-start gap-4">
                  <div class="bg-primary-100 rounded-full p-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Never Miss a Deal</h3>
                    <p class="text-gray-600 mb-4">
                      Get weekly updates on the best restaurant deals and hidden gems along Interstate 90.
                    </p>
                    <NuxtLink to="/subscribe" class="btn-primary inline-flex items-center gap-2">
                      Subscribe to Newsletter
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <!-- Navigation -->
              <div class="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                <NuxtLink to="/directory" class="btn-secondary flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Directory
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Restaurant Not Found -->
      <div v-else class="text-center py-16">
        <div class="container-max px-4">
          <div class="max-w-2xl mx-auto">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
            <p class="text-xl text-gray-600 mb-8">Sorry, we couldn't find that restaurant.</p>
            <NuxtLink to="/directory" class="btn-primary text-lg px-8 py-4 inline-block">
              Browse Directory
            </NuxtLink>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { useAuth } from '~/composables/useAuth';
const { isSubscriber } = useAuth();
const route = useRoute()
const slug = route.params.slug

// Fetch restaurant data with more robust querying
const { data: restaurant } = await useAsyncData(`restaurant-${slug}`, async () => {
  // First try to find by slug
  let found = await queryContent('/restaurants').where({ slug }).findOne()
  
  // If not found, try to find by _file path (fallback)
  if (!found) {
    const allRestaurants = await queryContent('/restaurants').find()
    found = allRestaurants.find(r => {
      const fileSlug = r._file?.replace('.md', '') || ''
      return fileSlug === slug || r.slug === slug
    })
  }
  
  return found
})

const formattedDeals = computed(() => {
  if (!restaurant.value) return ''
  console.log('📝 Formatting deals for:', restaurant.value.title)
  
  // Use the deals field from frontmatter
  const deals = restaurant.value.deals || 'No deals currently available.'
  console.log('🍽️ Deals content:', deals ? 'Found' : 'Not found')
  
  // If deals is already HTML/markdown, return as-is
  if (deals.includes('#') || deals.includes('<')) {
    return marked(deals)
  }
  
  // Otherwise, treat as plain text
  return `<div class="prose prose-lg">${deals.replace(/\n/g, '<br>')}</div>`
})

// Add SEO meta tags
useHead(() => ({
  title: `${restaurant.value?.title} - Restaurant Deals | I-90 Eats`,
  meta: [
    { 
      name: 'description', 
      content: restaurant.value?.description || `Find deals and information for ${restaurant.value?.title} along Interstate 90. ${restaurant.value?.cuisine} restaurant in ${restaurant.value?.location}.` 
    },
    { name: 'keywords', content: `${restaurant.value?.title}, ${restaurant.value?.cuisine}, restaurant deals, ${restaurant.value?.location}, I-90, dining specials` },
    // Open Graph
    { property: 'og:title', content: `${restaurant.value?.title} - Restaurant Deals | I-90 Eats` },
    { property: 'og:description', content: restaurant.value?.description },
    { property: 'og:image', content: restaurant.value?.image || '/og-image.jpg' },
    { property: 'og:url', content: `/restaurant/${slug}` },
    { property: 'og:type', content: 'restaurant.restaurant' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${restaurant.value?.title} - Restaurant Deals | I-90 Eats` },
    { name: 'twitter:description', content: restaurant.value?.description },
    { name: 'twitter:image', content: restaurant.value?.image || '/og-image.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `/restaurant/${slug}` }
  ]
}))

const config = useRuntimeConfig()

// Add structured data (JSON-LD) for restaurants
useHead(() => {
  if (!restaurant.value) return {}
  
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.value.title,
    "description": restaurant.value.description,
    "image": restaurant.value.image || `${config.public.siteUrl}/og-image.jpg`,
    "address": restaurant.value.address ? {
      "@type": "PostalAddress",
      "streetAddress": restaurant.value.address,
      "addressLocality": restaurant.value.location?.split(',')[0] || '',
      "addressRegion": restaurant.value.location?.split(',')[1]?.trim() || '',
      "addressCountry": "US"
    } : undefined,
    "telephone": restaurant.value.phone,
    "url": restaurant.value.website,
    "servesCuisine": restaurant.value.cuisine,
    "priceRange": "$$"
  }
  
  // Remove undefined fields
  Object.keys(restaurantSchema).forEach(key => {
    if (restaurantSchema[key] === undefined) {
      delete restaurantSchema[key]
    }
  })
  
  return {
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(restaurantSchema) }
    ],
    __dangerouslyDisableSanitizers: ['script']
  }
})

import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

// Add breadcrumbs schema
const breadcrumbs = computed(() => useBreadcrumbs([
  { name: 'Home', url: '/' },
  { name: 'Restaurants', url: '/directory' },
  { name: restaurant.value?.title || 'Restaurant', url: `/restaurant/${slug}` }
]))

useHead(() => ({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbs.value) }
  ],
  __dangerouslyDisableSanitizers: ['script']
}))
</script>

<style scoped>
/* Custom styles for restaurant content */
:deep(.restaurant-content) {
  @apply text-gray-800 leading-relaxed;
}

:deep(.restaurant-content h2) {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2;
}

:deep(.restaurant-content h3) {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
}

:deep(.restaurant-content p) {
  @apply mb-4 text-gray-700;
}

:deep(.restaurant-content img) {
  @apply rounded-lg shadow-md my-6;
}

:deep(.restaurant-content blockquote) {
  @apply border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded-r italic text-gray-700 my-6;
}

:deep(.restaurant-content ul) {
  @apply list-disc list-inside mb-4 text-gray-700;
}

:deep(.restaurant-content ol) {
  @apply list-decimal list-inside mb-4 text-gray-700;
}

:deep(.restaurant-content a) {
  @apply text-primary-600 hover:text-primary-700 underline;
}

:deep(.restaurant-content code) {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono;
}

:deep(.restaurant-content pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4;
}

.prose {
  color: inherit;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #1f2937;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.prose h1:first-child, .prose h2:first-child, .prose h3:first-child, .prose h4:first-child, .prose h5:first-child, .prose h6:first-child {
  margin-top: 0;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.75;
}

.prose ul {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose strong {
  font-weight: 600;
  color: #1f2937;
}
</style>
