<template>
  <div>
    <section class="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
      <div class="container-max text-center">
        <h1 class="text-4xl font-bold mb-4">Thanks for Joining I-90 Eats!</h1>
        <p class="text-xl text-primary-100 mb-8">Your restaurant listing has been created and is now live.</p>
        <NuxtLink to="/directory" class="btn-secondary text-lg px-8 py-4">View Your Listing</NuxtLink>
      </div>
    </section>
    
    <section class="py-16">
      <div class="container-max max-w-4xl mx-auto text-center">
        <p class="text-gray-600 mb-4">Your restaurant is now part of the I-90 Eats directory!</p>
        <p class="text-sm text-gray-500">Next steps: Add deals and specials to attract subscribers.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const { signInBusiness } = useAuth();

// Extract data from URL parameters
onMounted(async () => {
  if (process.client) {
    const { ownerEmail } = route.query;
    
    if (ownerEmail) {
      const result = await signInBusiness(ownerEmail);
      if (result.success) {
        console.log('✅ Business authentication established');
      }
    }
  }
});
</script>