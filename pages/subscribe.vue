<template>
  <div>
    <!-- Page Header -->
    <section
      class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16"
    >
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">
          Subscribe to I-90 Restaurant Deals
        </h1>
        <p class="text-xl text-primary-100">
          Get weekly newsletters with exclusive restaurant deals along your I-90
          route
        </p>
      </div>
    </section>

    <!-- Subscription Form -->
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto">
        <div class="card p-8">
          <ClientOnly>
            <SubscribeForm />
            <template #fallback>
              <div class="text-center py-8">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"
                ></div>
                <p class="mt-2 text-gray-600">Loading form...</p>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// This page now uses a client-only component to avoid hydration issues
</script>
