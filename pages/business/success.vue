<template>
  <div>
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Thanks for Joining I-90 Eats!</h1>
        <p class="text-xl text-primary-100 mb-8">Your listing is processing. We'll email you once it's live (usually within 24 hours).</p>
        <NuxtLink to="/directory" class="btn-secondary text-lg px-8 py-4">Browse Directory</NuxtLink>
      </div>
    </section>
    
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto text-center">
        <p class="text-gray-600 mb-4">In the meantime, check your email for confirmation and next steps.</p>
        <p class="text-sm text-gray-500">If you don't see it, check spam or contact support@i90eats.com.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const sessionId = route.query.session_id;
</script>