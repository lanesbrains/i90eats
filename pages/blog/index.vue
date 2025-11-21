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
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
            </svg>
            Food News & Insights
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">I-90 Food Blog</h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Food news, travel tips, and insights from along Interstate 90
        </p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="container-max px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.slug"
            class="card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                  :to="`/blog/${getPostSlug(post)}`"
                  class="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  @click="handleNavigation(`/blog/${getPostSlug(post)}`)"
                >
                  Read More →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Newsletter CTA -->
        <div class="mt-20 text-center">
          <div class="card p-8 md:p-12 shadow-2xl max-w-3xl mx-auto">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p class="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest food news and travel tips along I-90
            </p>
            <NuxtLink to="/subscribe" class="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform inline-block">
              Subscribe to Newsletter
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
// Get all blog posts and filter for published ones
const { data: blogPosts } = await useAsyncData('blog-posts', async () => {
  const posts = await queryContent('/blog')
    .where({ published: true })
    .sort({ publishDate: -1 })
    .find()
  return posts
})

// Methods
const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj)
}

// Get post slug from either slug field or _path
const getPostSlug = (post) => {
  if (post.slug)
    return post.slug
  // Extract slug from _path (e.g., "/blog/my-post" -> "my-post")
  return post._path?.split('/').pop() || ''
}

// SEO
useHead({
  title: 'I-90 Food Blog',
  meta: [
    { name: 'description', content: 'Food news, travel tips, and insights from along Interstate 90. Discover the best restaurants and dining experiences along the I-90 corridor.' },
    { name: 'keywords', content: 'I-90 food blog, interstate 90 restaurants, travel food tips, road trip dining, food news' }
  ]
})

// Add this for sitemap generation
definePageMeta({
  sitemap: {
    changefreq: 'daily',
    priority: 0.8
  }
})
</script>
