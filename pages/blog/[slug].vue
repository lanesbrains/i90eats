<template>
  <div>
    <!-- Blog Post Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex items-center justify-center gap-4 text-primary-100">
            <span>{{ formatDate(post.publishDate) }}</span>
            <span>•</span>
            <span>{{ post.author }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Post Content -->
    <section class="py-16">
      <div class="container-max">
        <div class="max-w-4xl mx-auto">
          <article class="prose prose-lg max-w-none">
            <p class="text-xl text-gray-600 mb-8">{{ post.excerpt }}</p>

            <!-- Render the markdown content -->
            <ContentDoc :path="`/blog/${post._path}`" />

            <div
              class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200 mt-8"
            >
              <h3>Subscribe for More Content</h3>
              <p>
                Get weekly updates on restaurant deals and food news along
                Interstate 90.
              </p>
              <NuxtLink to="/subscribe" class="btn-primary mt-4"
                >Subscribe Now</NuxtLink
              >
            </div>
          </article>

          <!-- Tags -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-semibold mb-4">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Back to Blog -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <NuxtLink to="/blog" class="btn-secondary">
              ← Back to Blog
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Fetch the specific blog post
const { data: post } = await queryContent('/blog')
  .where({ slug: slug, published: true })
  .findOne()

// If post not found, throw 404
if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

// SEO
useHead({
  title: `${post.title} | I-90 Eats Blog`,
  meta: [
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: post.tags.join(', ') },
    { name: 'author', content: post.author },
    { name: 'article:author', content: post.author },
    { name: 'article:published_time', content: new Date(post.publishDate).toISOString() },
    { name: 'article:section', content: 'Food & Travel' },
    { name: 'article:tag', content: post.tags.join(',') },
    // Open Graph for blog posts
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:image', content: post.image || `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/og-image.jpg` },
    { property: 'og:url', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/blog/${post.slug}` },
    { property: 'article:author', content: post.author },
    // Twitter for blog posts
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.title },
    { name: 'twitter:description', content: post.excerpt },
    { name: 'twitter:image', content: post.image || `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/og-image.jpg` }
  ],
  link: [
    { rel: 'canonical', href: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/blog/${post.slug}` }
  ]
})

// Structured Data for Blog Post
const blogPostSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "I-90 Eats",
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com"}/logo.png`
    }
  },
  "datePublished": new Date(post.publishDate).toISOString(),
  "dateModified": new Date(post.publishDate).toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com"}/blog/${post.slug}`
  },
  "keywords": post.tags.join(', '),
  "articleSection": "Food & Travel"
}

useSchemaOrg(blogPostSchema)
</script>
