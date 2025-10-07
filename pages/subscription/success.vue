<template>
  <div>
    <!-- Success Header -->
    <section
      class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16"
    >
      <div class="container-max text-center">
        <div
          class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold mb-4">
          Welcome to I-90 Restaurant Deals!
        </h1>
        <p class="text-xl text-green-100">
          Your subscription is now active. Start exploring exclusive deals!
        </p>
      </div>
    </section>
    <!-- Success Page Content -->
    <section class="py-16">
      <div class="container-max max-w-2xl mx-auto text-center">
        <div class="card p-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to I-90 Restaurant Deals!</h1>
          <p class="text-gray-600 mb-8">
            Your subscription has been activated. You now have access to exclusive restaurant deals along your selected I-90 routes.
          </p>
          <div class="space-y-4">
            <NuxtLink to="/directory" class="btn-primary block">
              Browse Restaurant Deals
            </NuxtLink>
            <p class="text-sm text-gray-500">
              Your first newsletter will arrive this Friday with the latest deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSecureSubscription } from '~/composables/useSecureSubscription'

// Set subscription status on success page load
const { setSubscriptionActive } = useSecureSubscription()

onMounted(() => {
  // Extract plan from URL or default to newsletter
  const urlParams = new URLSearchParams(window.location.search)
  const plan = urlParams.get('plan') || 'newsletter'
  
  setSubscriptionActive(plan)
})
</script>