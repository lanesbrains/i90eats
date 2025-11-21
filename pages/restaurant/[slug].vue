<template>
  <div>
    <ClientOnly>
      <div v-if="restaurant" class="min-h-screen">
        <!-- Restaurant Header (Always Visible) -->
        <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
          <div class="container-max">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <!-- Restaurant Image -->
              <div class="w-full lg:w-96 h-64 lg:h-96 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                <img 
                  v-if="restaurant.image" 
                  :src="restaurant.image" 
                  :alt="restaurant.title"
                  class="w-full h-full object-cover"
                  sizes="sm:100vw md:400px lg:400px"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-primary-100/20 to-accent-100/20 flex items-center justify-center">
                  <svg class="w-24 h-24 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              
              <!-- Restaurant Info -->
              <div class="flex-1 text-center lg:text-left">
                <div class="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <h1 class="text-4xl font-bold">{{ restaurant.title }}</h1>
                  <span v-if="restaurant.premium" class="bg-accent-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    Premium
                  </span>
                </div>
                
                <p class="text-xl text-primary-100 mb-4">{{ restaurant.location }}</p>
                <p class="text-lg text-primary-100 mb-6">{{ restaurant.cuisine }}</p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    v-if="restaurant.phone"
                    :href="`tel:${restaurant.phone}`"
                    class="btn-accent inline-flex items-center justify-center gap-2"
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
                    class="btn-secondary inline-flex items-center justify-center gap-2"
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
        </section>

        <!-- Basic Info (Always Visible) -->
        <section class="py-16">
          <div class="container-max">
            <div class="max-w-4xl mx-auto">
              <!-- Address & Contact -->
              <div class="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Location & Contact</h2>
                <div class="space-y-2 text-gray-700">
                  <p v-if="restaurant.address"><strong>Address:</strong> {{ restaurant.address }}</p>
                  <p v-if="restaurant.phone"><strong>Phone:</strong> <a :href="`tel:${restaurant.phone}`" class="text-primary-600 hover:underline">{{ restaurant.phone }}</a></p>
                  <p v-if="restaurant.website"><strong>Website:</strong> <a :href="restaurant.website" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">{{ restaurant.website }}</a></p>
                </div>
              </div>

              <!-- Description (Always Visible) -->
              <div class="prose prose-lg max-w-none mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">About {{ restaurant.title }}</h2>
                <div v-html="restaurant.body || restaurant.description"></div>
              </div>

              <!-- Deals Section (Gated) -->
              <section class="py-16 bg-white">
                <div class="text-center mb-12">
                  <h2 class="text-3xl font-bold text-gray-900 mb-4">Current Deals & Specials</h2>
                  <p class="text-xl text-gray-600">Don't miss these amazing offers!</p>
                </div>
                
                <!-- Paywall for Non-Subscribed Users -->
                <div v-if="!isSubscriber" class="text-center py-12">
                  <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">Deals Available</h3>
                  <p class="text-gray-600 mb-4">Subscribe to our free newsletter to unlock exclusive deals and specials from this restaurant.</p>
                  <NuxtLink to="/subscribe" class="btn-primary inline-flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Subscribe for Free
                  </NuxtLink>
                </div>
                
                <!-- Full Deals (for Subscribed Users) -->
                <div v-else class="max-w-4xl mx-auto">
                  <div class="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 border border-accent-200">
                    <div class="prose prose-lg max-w-none" v-html="formattedDeals"></div>
                    <p v-if="!restaurant.deals && !restaurant.body?.includes('deals')" class="text-gray-600 mt-4 text-center">No current deals available—check back soon for updates!</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>

      <!-- Restaurant Not Found -->
      <div v-else class="text-center py-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
        <p class="text-gray-600 mb-8">Sorry, we couldn't find that restaurant.</p>
        <NuxtLink to="/directory" class="btn-secondary">Browse Directory</NuxtLink>
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
</script>

<style scoped>
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