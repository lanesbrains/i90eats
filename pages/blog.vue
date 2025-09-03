<template>
  <div>
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">I-90 Food Blog</h1>
        <p class="text-xl text-primary-100">
          Food news, travel tips, and insights from along Interstate 90
        </p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16">
      <div class="container-max">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.slug"
            class="card hover:shadow-xl transition-shadow duration-300"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                v-if="post.image" 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm text-gray-500">{{ formatDate(post.publishDate) }}</span>
                <span class="text-sm text-gray-400">•</span>
                <span class="text-sm text-gray-500">{{ post.author }}</span>
              </div>
              
              <h2 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {{ post.title }}
              </h2>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in post.tags.slice(0, 3)" 
                    :key="tag"
                    class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <NuxtLink 
                  :to="`/blog/${post.slug}`"
                  class="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read More →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Newsletter CTA -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p class="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest food news and travel tips along I-90
            </p>
            <NuxtLink to="/subscribe" class="btn-primary">
              Subscribe to Newsletter
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Sample blog posts data
const blogPosts = ref([
  {
    title: "The Ultimate Guide to Seattle's Best Seafood Spots",
    slug: "ultimate-guide-seattle-seafood",
    author: "Sarah Johnson",
    publishDate: new Date('2024-01-15'),
    image: null,
    excerpt: "Discover the freshest seafood restaurants along Seattle's waterfront, from casual oyster bars to upscale dining experiences.",
    body: "Full blog post content would go here...",
    tags: ["Seattle", "Seafood", "Waterfront", "Restaurants"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Chicago Deep Dish vs. New York Style: The Great Pizza Debate",
    slug: "chicago-deep-dish-vs-ny-style",
    author: "Mike Chen",
    publishDate: new Date('2024-01-10'),
    image: null,
    excerpt: "We settle the age-old question: which pizza style reigns supreme? Join us as we explore both cities' iconic pizza traditions.",
    body: "Full blog post content would go here...",
    tags: ["Chicago", "New York", "Pizza", "Food Culture"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Hidden Gems: Underrated Restaurants Along I-90",
    slug: "hidden-gems-underrated-restaurants-i90",
    author: "Emily Rodriguez",
    publishDate: new Date('2024-01-05'),
    image: null,
    excerpt: "Skip the tourist traps and discover the local favorites that only insiders know about along the I-90 corridor.",
    body: "Full blog post content would go here...",
    tags: ["Hidden Gems", "Local Favorites", "I-90", "Travel Tips"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Seasonal Eating: What's Fresh Along I-90 This Winter",
    slug: "seasonal-eating-winter-i90",
    author: "David Thompson",
    publishDate: new Date('2023-12-28'),
    image: null,
    excerpt: "From hearty stews to warming comfort foods, discover the best seasonal dishes being served along Interstate 90 this winter.",
    body: "Full blog post content would go here...",
    tags: ["Seasonal", "Winter", "Comfort Food", "Local Ingredients"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "The Rise of Farm-to-Table Dining Along I-90",
    slug: "farm-to-table-dining-i90",
    author: "Lisa Wang",
    publishDate: new Date('2023-12-20'),
    image: null,
    excerpt: "How restaurants along the I-90 corridor are embracing local agriculture and sustainable dining practices.",
    body: "Full blog post content would go here...",
    tags: ["Farm-to-Table", "Sustainability", "Local Agriculture", "Trends"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Weekend Road Trip: Food Stops Between Seattle and Spokane",
    slug: "weekend-road-trip-seattle-spokane",
    author: "Alex Martinez",
    publishDate: new Date('2023-12-15'),
    image: null,
    excerpt: "Plan the perfect weekend getaway with our curated list of must-visit restaurants and food stops along the Washington stretch of I-90.",
    body: "Full blog post content would go here...",
    tags: ["Road Trip", "Weekend Getaway", "Washington", "Travel Guide"],
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
</script>
