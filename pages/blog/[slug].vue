<template>
  <div>
    <!-- Dynamic Hero Banner with Featured Image -->
    <section 
      class="relative py-24 text-white overflow-hidden"
      :class="post.image ? 'min-h-[60vh]' : 'py-16'"
    >
      <!-- Background Image or Gradient -->
      <div 
        v-if="post.image"
        class="absolute inset-0 bg-black/40 z-10"
      ></div>
      <div 
        v-if="post.image"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${post.image})` }"
      ></div>
      <div 
        v-else
        class="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600"
      ></div>

      <!-- Content -->
      <div class="container-max relative z-20">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {{ post.title }}
          </h1>
          <div class="flex items-center justify-center gap-4 text-white/90 text-lg">
            <span>{{ formatDate(post.publishDate) }}</span>
            <span>•</span>
            <span>{{ post.author }}</span>
            <span v-if="post.readTime">•</span>
            <span v-if="post.readTime">{{ post.readTime }} min read</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Post Content -->
    <section class="py-16">
      <div class="container-max">
        <div class="max-w-4xl mx-auto">
          <article class="prose prose-lg prose-blue max-w-none">
            <!-- Excerpt -->
            <p class="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-primary-500 pl-6 bg-gray-50 py-4 rounded-r-lg">
              {{ post.excerpt }}
            </p>

            <!-- Method 1: Use ContentRenderer (recommended) -->
            <!-- <ContentRenderer v-if="post.body" :value="post" class="blog-content" /> -->
            
            <!-- Method 2: Fallback - render HTML directly if available -->
            <!-- <div v-else-if="post.html" v-html="post.html" class="blog-content"></div> -->
            
            <!-- Method 3: Alternative - use ContentDoc with explicit path -->
            <ContentDoc v-if="!post.html" :path="post._path" class="blog-content" />
            
            <!-- Method 4: Manual markdown parsing (if needed) -->
            <div v-else class="blog-content">
              <p class="text-gray-500 italic">Content could not be loaded. Please check the blog post file.</p>
            </div>

            <!-- Newsletter CTA -->
            <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200 mt-12 not-prose">
              <div class="flex items-start gap-4">
                <div class="bg-primary-100 rounded-full p-2 flex-shrink-0">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Never Miss a Meal</h3>
                  <p class="text-gray-600 mb-4">
                    Get weekly updates on the best restaurant deals and hidden gems along Interstate 90.
                  </p>
                  <NuxtLink to="/subscribe" class="btn-primary">
                    Subscribe to Newsletter
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>

          <!-- Tags -->
          <div v-if="post.tags && post.tags.length" class="mt-12 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tags
            </h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/blog?tag=${encodeURIComponent(tag)}`"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-3 py-1 rounded-full text-sm transition-colors duration-200"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </div>

          <!-- Author Info (if available) -->
          <div v-if="post.authorBio || post.authorImage" class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex items-start gap-4">
              <img 
                v-if="post.authorImage"
                :src="post.authorImage"
                :alt="post.author"
                class="w-16 h-16 rounded-full object-cover"
              >
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900">{{ post.author }}</h4>
                <p v-if="post.authorBio" class="text-gray-600 mt-1">{{ post.authorBio }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <NuxtLink to="/blog" class="btn-secondary flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </NuxtLink>
            
            <!-- Share buttons (optional) -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500 mr-2">Share:</span>
              <a 
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const config = useRuntimeConfig()

// Get the blog post
const { data: post } = await useAsyncData(`blog-${slug}`, async () => {
  try {
    // Try multiple methods to find the post
    let foundPost = null
    
    // Method 1: Find by slug field first (most reliable)
    try {
      const posts = await queryContent('/blog').where({ slug: slug }).find()
      foundPost = posts[0] || null
    } catch (e) {
      console.log('Method 1 failed:', e)
    }
    
    if (!foundPost) {
      // Method 2: Find by filename (without extension)
      try {
        const allPosts = await queryContent('/blog').find()
        foundPost = allPosts.find(p => {
          const filename = p._path?.split('/').pop()
          // Remove .md extension and compare
          const filenameWithoutExt = filename?.replace(/\.md$/, '')
          return filenameWithoutExt === slug
        })
      } catch (e) {
        console.log('Method 2 failed:', e)
      }
    }
    
    if (!foundPost) {
      // Method 3: Direct path query as fallback
      try {
        foundPost = await queryContent(`/blog/${slug}`).findOne()
      } catch (e) {
        console.log('Method 3 failed:', e)
      }
    }
    
    return foundPost
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
})

// Throw 404 if post not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Current URL for sharing
const currentUrl = computed(() => {
  const baseUrl = config.public.siteUrl || 'https://i90eats.com'
  return `${baseUrl}/blog/${slug}`
})

// Methods
const formatDate = (date) => {
  if (!date) return 'No date'
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

// SEO
useHead(() => ({
  title: `${post.value.title} | I-90 Eats Blog`,
  meta: [
    { name: 'description', content: post.value.excerpt },
    { name: 'keywords', content: post.value.tags?.join(', ') || '' },
    { name: 'author', content: post.value.author },
    // Open Graph
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.excerpt },
    { property: 'og:image', content: post.value.image || `${config.public.siteUrl}/og-image.jpg` },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:type', content: 'article' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value.title },
    { name: 'twitter:description', content: post.value.excerpt },
    { name: 'twitter:image', content: post.value.image || `${config.public.siteUrl}/og-image.jpg` }
  ],
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ]
}))

// Add Article structured data
useHead(() => {
  if (!post.value) return {}
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.value.title,
    "description": post.value.excerpt,
    "image": post.value.image || `${config.public.siteUrl}/og-image.jpg`,
    "datePublished": post.value.publishDate,
    "dateModified": post.value.publishDate,
    "author": {
      "@type": "Person",
      "name": post.value.author || "I-90 Eats"
    },
    "publisher": {
      "@type": "Organization",
      "name": "I-90 Eats",
      "logo": {
        "@type": "ImageObject",
        "url": `${config.public.siteUrl}/i90eats-logo.webp`
      }
    }
  }
  
  return {
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(articleSchema) }
    ],
    __dangerouslyDisableSanitizers: ['script']
  }
})
</script>

<style scoped>
/* Custom styles for blog content */
:deep(.blog-content) {
  @apply text-gray-800 leading-relaxed;
}

:deep(.blog-content h2) {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2;
}

:deep(.blog-content h3) {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
}

:deep(.blog-content p) {
  @apply mb-4 text-gray-700;
}

:deep(.blog-content img) {
  @apply rounded-lg shadow-md my-6;
}

:deep(.blog-content blockquote) {
  @apply border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded-r italic text-gray-700 my-6;
}

:deep(.blog-content ul) {
  @apply list-disc list-inside mb-4 text-gray-700;
}

:deep(.blog-content ol) {
  @apply list-decimal list-inside mb-4 text-gray-700;
}

:deep(.blog-content a) {
  @apply text-primary-600 hover:text-primary-700 underline;
}

:deep(.blog-content code) {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono;
}

:deep(.blog-content pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4;
}
</style>