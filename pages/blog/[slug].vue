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

            <div class="bg-gray-50 rounded-lg p-8 mb-8">
              <h2>About This Article</h2>
              <p>
                This is a sample blog post for the I-90 Eats platform. In a real
                implementation, this content would be managed through a CMS or
                markdown files.
              </p>

              <h3>Key Topics Covered:</h3>
              <ul>
                <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>

            <div
              class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200"
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
const route = useRoute();
const slug = route.params.slug;

// Sample blog posts data (in real app, this would come from CMS/API)
const blogPosts = {
  "ultimate-guide-seattle-seafood": {
    title: "The Ultimate Guide to Seattle's Best Seafood Spots",
    slug: "ultimate-guide-seattle-seafood",
    author: "Sarah Johnson",
    publishDate: new Date("2024-01-15"),
    excerpt:
      "Discover the freshest seafood restaurants along Seattle's waterfront, from casual oyster bars to upscale dining experiences.",
    tags: ["Seattle", "Seafood", "Waterfront", "Restaurants"],
  },
  "chicago-deep-dish-vs-ny-style": {
    title: "Chicago Deep Dish vs. New York Style: The Great Pizza Debate",
    slug: "chicago-deep-dish-vs-ny-style",
    author: "Mike Chen",
    publishDate: new Date("2024-01-10"),
    excerpt:
      "We settle the age-old question: which pizza style reigns supreme? Join us as we explore both cities' iconic pizza traditions.",
    tags: ["Chicago", "New York", "Pizza", "Food Culture"],
  },
  "hidden-gems-underrated-restaurants-i90": {
    title: "Hidden Gems: Underrated Restaurants Along I-90",
    slug: "hidden-gems-underrated-restaurants-i90",
    author: "Emily Rodriguez",
    publishDate: new Date("2024-01-05"),
    excerpt:
      "Skip the tourist traps and discover the local favorites that only insiders know about along the I-90 corridor.",
    tags: ["Hidden Gems", "Local Favorites", "I-90", "Travel Tips"],
  },
  "seasonal-eating-winter-i90": {
    title: "Seasonal Eating: What's Fresh Along I-90 This Winter",
    slug: "seasonal-eating-winter-i90",
    author: "David Thompson",
    publishDate: new Date("2023-12-28"),
    excerpt:
      "From hearty stews to warming comfort foods, discover the best seasonal dishes being served along Interstate 90 this winter.",
    tags: ["Seasonal", "Winter", "Comfort Food", "Local Ingredients"],
  },
  "farm-to-table-dining-i90": {
    title: "The Rise of Farm-to-Table Dining Along I-90",
    slug: "farm-to-table-dining-i90",
    author: "Lisa Wang",
    publishDate: new Date("2023-12-20"),
    excerpt:
      "How restaurants along the I-90 corridor are embracing local agriculture and sustainable dining practices.",
    tags: ["Farm-to-Table", "Sustainability", "Local Agriculture", "Trends"],
  },
  "weekend-road-trip-seattle-spokane": {
    title: "Weekend Road Trip: Food Stops Between Seattle and Spokane",
    slug: "weekend-road-trip-seattle-spokane",
    author: "Alex Martinez",
    publishDate: new Date("2023-12-15"),
    excerpt:
      "Plan the perfect weekend getaway with our curated list of must-visit restaurants and food stops along the Washington stretch of I-90.",
    tags: ["Road Trip", "Weekend Getaway", "Washington", "Travel Guide"],
  },
};

const post = blogPosts[slug] || {
  title: "Blog Post Not Found",
  slug: slug,
  author: "Unknown",
  publishDate: new Date(),
  excerpt: "This blog post could not be found.",
  tags: [],
};

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// SEO
// SEO
useHead({
  title: `${post.title} | I-90 Eats Blog`,
  meta: [
    { name: 'description', content: post.excerpt },
    { name: 'keywords', content: post.tags.join(', ') },
    { name: 'author', content: post.author },
    { name: 'article:author', content: post.author },
    { name: 'article:published_time', content: post.publishDate.toISOString() },
    { name: 'article:section', content: 'Food & Travel' },
    { name: 'article:tag', content: post.tags.join(',') },
    // Open Graph for blog posts
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:image', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/blog/${post.slug}/og-image.jpg` },
    { property: 'og:url', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/blog/${post.slug}` },
    { property: 'article:author', content: post.author },
    // Twitter for blog posts
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.title },
    { name: 'twitter:description', content: post.excerpt },
    { name: 'twitter:image', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/blog/${post.slug}/og-image.jpg` }
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
  "datePublished": post.publishDate.toISOString(),
  "dateModified": post.publishDate.toISOString(),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${process.env.NUXT_PUBLIC_SITE_URL || "https://i90eats.com"}/blog/${post.slug}`
  },
  "keywords": post.tags.join(', '),
  "articleSection": "Food & Travel"
}
</script>
