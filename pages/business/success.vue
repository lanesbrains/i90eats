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
      <div class="container-max max-w-4xl mx-auto">
        <div class="card p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
          <p class="text-gray-600 mb-6">Your restaurant is now part of the I-90 Eats directory!</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-primary-50 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">Manage Your Listing</h3>
              <p class="text-sm text-gray-600 mb-3">Edit your restaurant information, add deals, and update your profile.</p>
              <NuxtLink to="/business/dashboard" class="btn-primary text-sm px-4 py-2">Go to Dashboard</NuxtLink>
            </div>
            <div class="p-4 bg-accent-50 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">View Your Listing</h3>
              <p class="text-sm text-gray-600 mb-3">See how your restaurant appears to subscribers in the directory.</p>
              <NuxtLink to="/directory" class="btn-secondary text-sm px-4 py-2">View Directory</NuxtLink>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p class="text-sm text-blue-800">
              <strong>Login Info:</strong> You can access your dashboard anytime by logging in with your email address at 
              <NuxtLink to="/business/login" class="underline font-medium">/business/login</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { signInBusiness } = useAuth();

// Extract data from URL parameters
onMounted(async () => {
  if (process.client) {
    const { ownerEmail } = route.query;
    
    if (ownerEmail) {
      console.log('🔐 Attempting to authenticate business owner:', ownerEmail);
      const result = await signInBusiness(ownerEmail);
      if (result.success) {
        console.log('✅ Business authentication established');
        // Optionally redirect to dashboard after a short delay
        setTimeout(() => {
          // Keep user on success page but they're now authenticated
        }, 1000);
      } else {
        console.error('❌ Business authentication failed:', result.error);
        // Still show success page, but log the error
      }
    } else {
      console.warn('⚠️ No ownerEmail in query params');
    }
  }
});
</script>