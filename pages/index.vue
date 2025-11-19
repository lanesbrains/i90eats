<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gray-800 text-white py-20 overflow-hidden">
    <!-- Background Image -->
    <img
      src="/i90-bg.webp"
      class="absolute inset-0 w-full h-full object-cover opacity-70"
      alt="I-90 Background"
      loading="eager"
      sizes="100vw"
    />
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <!-- Content -->
      <div class="relative z-10 container-max text-center px-4">
        <h1 class="text-5xl font-bold mb-6">I-90 Restaurant Deals</h1>
        <p class="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Discover exclusive restaurant deals along Interstate 90 from Seattle
          to Boston. Get weekly newsletters with local dining specials and save
          money on great food.
        </p>
        <!-- Hero Section Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <!-- Hide subscribe button if already subscribed -->
          <NuxtLink v-if="!isSubscribed" to="/subscribe" class="btn-accent text-lg px-8 py-4">
            Subscribe FREE - Unlock All Restaurants
          </NuxtLink>
          
          <NuxtLink to="/directory" class="btn-secondary text-lg px-8 py-4">
            Browse Restaurants
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Why Choose I-90 Restaurant Deals?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            We curate the best restaurant deals along the entire I-90 corridor
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
            <p class="text-gray-600">
              Get exclusive deals and discounts at restaurants along your I-90
              route
            </p>
          </div>
<!-- test -->
          <div class="text-center">
            <div
              class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-accent-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Discover Places
            </h3>
            <p class="text-gray-600">
              Find hidden gems and local favorites you might have missed
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-secondary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Weekly Updates
            </h3>
            <p class="text-gray-600">
              Fresh deals delivered to your inbox every Friday
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="py-16 bg-gray-50">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Featured Restaurants
          </h2>
          <p class="text-xl text-gray-600">
            Popular spots along the I-90 corridor
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="restaurant in featuredRestaurants"
            :key="restaurant.slug"
            class="card"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <div
                class="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-gray-400"
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
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ restaurant.title }}
              </h3>
              <p class="text-gray-600 mb-2">{{ restaurant.location }}</p>
              <p class="text-gray-500 text-sm mb-4">{{ restaurant.cuisine }}</p>
              <NuxtLink
                :to="`/restaurant/${restaurant.slug}`"
                class="btn-primary text-sm"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <NuxtLink to="/directory" class="btn-secondary">
            View All Restaurants
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blog Preview -->
    <section class="py-16 bg-white">
      <div class="container-max">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p class="text-xl text-gray-600">
            Food news, travel tips, and I-90 insights
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article
            v-for="post in latestPosts"
            :key="getPostSlug(post)"
            class="card hover:shadow-xl transition-shadow duration-300"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                v-if="post.image"
                :src="post.image"
                :alt="post.title"
                class="w-full h-48 object-cover"
              />
              <div
                v-else
                class="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-sm text-gray-500">{{
                  formatDate(post.publishDate)
                }}</span>
                <span v-if="post.author" class="text-sm text-gray-400">•</span>
                <span v-if="post.author" class="text-sm text-gray-500">{{
                  post.author
                }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
              <NuxtLink
                :to="`/blog/${getPostSlug(post)}`"
                class="text-primary-600 hover:text-primary-700 font-medium"
              >
                Read More →
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="text-center mt-8">
          <NuxtLink to="/blog" class="btn-secondary"> View All Posts </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 text-white py-16">
      <div class="container-max text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of travelers who are already saving money on great food
          along I-90
        </p>
        <NuxtLink v-if="!isSubscribed" to="/subscribe" class="btn-primary">
          Subscribe FREE - Unlock All Restaurants
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSecureSubscription } from '~/composables/useSecureSubscription';

// Add subscription status
const { isSubscribed } = useSecureSubscription();

// Hero background image is now inline in template

// Load featured restaurants dynamically
const { data: featuredRestaurants } = await useAsyncData('featured-restaurants', () =>
  queryContent('/restaurants')
    .sort({ premium: -1, createdAt: -1 }) // Premium first, then most recent
    .limit(3) // Show 3 featured restaurants
    .find()
);

// Get latest blog posts using the same pattern as blog page
const { data: latestPosts } = await useAsyncData(
  "latest-blog-posts",
  async () => {
    const posts = await queryContent("/blog")
      .where({ published: true })
      .sort({ publishDate: -1 })
      .limit(2)
      .find();
    return posts;
  }
);

// Get post slug from either slug field or _path
const getPostSlug = (post) => {
  if (post.slug)
    return post.slug
  // Extract slug from _path (e.g., "/blog/my-post" -> "my-post")
  return post._path?.split('/').pop() || ''
}

// Methods
const formatDate = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(dateObj);
};
</script>
