<template>
  <div>
    <!-- Restaurant Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max">
        <div class="flex flex-col lg:flex-row items-center gap-8">
          <!-- Restaurant Image -->
          <div class="w-full lg:w-96 h-64 lg:h-96 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
            <img 
              v-if="restaurant?.image" 
              :src="restaurant.image" 
              :alt="restaurant?.title"
              class="w-full h-full object-cover"
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
              <h1 class="text-4xl font-bold">{{ restaurant?.title }}</h1>
              <span v-if="restaurant?.premium" class="bg-accent-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                Premium
              </span>
            </div>
            
            <p class="text-xl text-primary-100 mb-4">{{ restaurant?.location }}</p>
            <p class="text-lg text-primary-100 mb-6">{{ restaurant?.cuisine }}</p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                v-if="restaurant?.phone"
                :href="`tel:${restaurant.phone}`"
                class="btn-accent inline-flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Restaurant
              </a>
              
              <a 
                v-if="restaurant?.website"
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

    <!-- Current Deals -->
    <section class="py-16 bg-white">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Current Deals & Specials</h2>
          <p class="text-xl text-gray-600">Don't miss these amazing offers!</p>
        </div>
        
        <div v-if="restaurant?.deals" class="max-w-4xl mx-auto">
          <div class="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 border border-accent-200">
            <div class="prose prose-lg max-w-none">
              <div v-html="formattedDeals"></div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-accent-200">
              <p class="text-sm text-gray-600 text-center">
                Deals are updated regularly. Call the restaurant to confirm availability.
              </p>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Current Deals</h3>
          <p class="text-gray-600">Check back soon for new offers from this restaurant!</p>
        </div>
      </div>
    </section>

    <!-- Restaurant Details -->
    <section class="py-16 bg-gray-50">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- About -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">About {{ restaurant?.title }}</h3>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 leading-relaxed">{{ restaurant?.description }}</p>
            </div>
          </div>
          
          <!-- Contact & Location -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact & Location</h3>
            
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Address</p>
                  <p class="text-gray-600">{{ restaurant?.address }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Phone</p>
                  <a 
                    v-if="restaurant?.phone"
                    :href="`tel:${restaurant.phone}`"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {{ restaurant.phone }}
                  </a>
                </div>
              </div>
              
              <div v-if="restaurant?.website" class="flex items-start gap-3">
                <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Website</p>
                  <a 
                    :href="restaurant.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Map Placeholder -->
            <div class="mt-8 p-4 bg-gray-100 rounded-lg text-center">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p class="text-sm text-gray-600">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup CTA -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="container-max text-center">
        <h2 class="text-3xl font-bold mb-4">Get More Deals Like This</h2>
        <p class="text-xl text-primary-100 mb-8">
          Subscribe to our newsletter and discover amazing restaurant deals along I-90 every week
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/subscribe" class="btn-accent text-lg px-8 py-4">
            Subscribe to Newsletter
          </NuxtLink>
          <NuxtLink to="/directory" class="btn-secondary text-lg px-8 py-4">
            Browse More Restaurants
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'

// Get route params - simplified for now
const slug = 'seattle-seafood-co' // In production, this would come from route params

// Sample restaurant data for demo (in production, this would come from CMS)
const restaurant = ref({
  title: "The Seattle Seafood Co.",
  slug: "seattle-seafood-co",
  location: "Seattle, WA",
  cuisine: "Seafood",
  address: "123 Pike Place, Seattle, WA 98101",
  phone: "(206) 555-0123",
  website: "https://seattleseafood.com",
  description: "The Seattle Seafood Co. has been serving the finest fresh seafood from Puget Sound for over 30 years. Our restaurant offers a casual yet elegant dining experience with stunning waterfront views. We source our ingredients locally and sustainably, ensuring the highest quality seafood for our guests. From our famous Dungeness crab to our daily oyster specials, every dish is prepared with care and attention to detail. Whether you're looking for a romantic dinner for two or a family celebration, our warm atmosphere and exceptional service will make your dining experience memorable.",
  deals: "**Happy Hour Specials (4-6 PM Daily)**\n\n- 50% off all appetizers\n- $2 off draft beers\n- $5 house wines\n\n**Tuesday Oyster Special**\n\n- Fresh oysters: $1 each (regularly $2.50)\n- Minimum order: 6 oysters\n- Available all day\n\n**Weekend Brunch (Saturday & Sunday 10 AM - 2 PM)**\n\n- Bottomless mimosas: $15\n- Kids under 12 eat free with adult entrée purchase\n- Free coffee with any brunch entrée\n\n**Lunch Combo (Monday-Friday 11 AM - 3 PM)**\n\n- Any entrée + soup or salad + drink: $24.99\n- Valid for dine-in only",
  premium: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date()
})

// Format deals markdown
const formattedDeals = computed(() => {
  if (!restaurant.value?.deals) return ''
  return marked(restaurant.value.deals)
})

// Handle 404 for non-existent restaurants
if (!restaurant.value) {
  // In production, this would use Nuxt's createError
  console.error('Restaurant not found:', slug)
}
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
