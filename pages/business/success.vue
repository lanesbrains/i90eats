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
const { setBusinessAuth } = useBusinessAuth();

// Extract data from URL parameters
onMounted(async () => {
  if (process.client) {
    const { ownerEmail, slug, name, location, plan } = route.query;
    
    if (ownerEmail && slug) {
      try {
        console.log('🔐 Setting up business authentication for:', { ownerEmail, slug });
        
        // Create authentication token
        const tokenResponse = await $fetch('/api/business/create-token', {
          method: 'POST',
          body: {
            email: ownerEmail,
            restaurantSlug: slug
          }
        });
        
        if (tokenResponse.token) {
          // Set business authentication
          setBusinessAuth(tokenResponse.token, ownerEmail, {
            slug,
            title: name,
            location,
            plan
          });
          
          console.log('✅ Business authentication established');
        } else {
          console.error('❌ Failed to create authentication token');
        }
      } catch (error) {
        console.error('❌ Business authentication setup failed:', error);
      }
    } else {
      console.log('⚠️ Missing authentication data in URL');
    }
  }
});
</script>