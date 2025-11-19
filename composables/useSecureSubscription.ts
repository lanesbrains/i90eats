// composables/useSecureSubscription.ts
import { ref, onMounted } from 'vue';

export const useSecureSubscription = () => {
  const isSubscribed = ref(false);
  const email = ref('');
  const subscriptionData = ref(null);

  onMounted(async () => {
    const storedEmail = localStorage.getItem('i90_email');
    const storedSub = localStorage.getItem('i90_subscribed');
    
    if (storedEmail) {
      email.value = storedEmail;
      // Always verify with server on page load (more secure)
      await verifySubscription(storedEmail);
    }
  });

  const verifySubscription = async (userEmail) => {
    try {
      console.log('🔍 Verifying subscription for:', userEmail);
      const response = await $fetch('/api/verify-sub', {
        method: 'POST',
        body: { email: userEmail }
      });
      
      console.log('📋 Verification response:', response);
      
      if (response.subscribed) {
        isSubscribed.value = true;
        subscriptionData.value = response;
        localStorage.setItem('i90_subscribed', 'true');
        console.log('✅ User is subscribed');
      } else {
        isSubscribed.value = false;
        subscriptionData.value = null;
        localStorage.removeItem('i90_subscribed');
        console.log('❌ User is NOT subscribed');
      }
      
      return response.subscribed;
    } catch (error) {
      console.error('❌ Verification failed:', error);
      isSubscribed.value = false;
      localStorage.removeItem('i90_subscribed');
      return false;
    }
  };

  const signupAndVerify = async (userEmail) => {
    console.log('📝 Recording signup for:', userEmail);
    localStorage.setItem('i90_email', userEmail);
    email.value = userEmail;
    
    // Wait a moment for Beehiiv processing, then verify
    setTimeout(async () => {
      await verifySubscription(userEmail);
    }, 1000);
  };

  return { 
    isSubscribed: readonly(isSubscribed), 
    email: readonly(email), 
    subscriptionData: readonly(subscriptionData),
    signupAndVerify,
    verifySubscription 
  };
};