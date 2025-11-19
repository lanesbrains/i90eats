// composables/useSecureSubscription.ts
import { ref, onMounted } from 'vue';

export const useSecureSubscription = () => {
  const isSubscribed = ref(false);
  const email = ref('');
  const subscriptionToken = ref('');

  onMounted(async () => {
    // Check for stored subscription token
    const storedToken = localStorage.getItem('i90_subscription_token');
    const storedEmail = localStorage.getItem('i90_email');
    
    if (storedToken && storedEmail) {
      subscriptionToken.value = storedToken;
      email.value = storedEmail;
      await verifyToken(storedToken);
    }
  });

  const verifyToken = async (token) => {
    try {
      console.log('🔍 Verifying subscription token...');
      const response = await $fetch('/api/verify-sub', {
        method: 'POST',
        body: { token }
      });
      
      if (response.subscribed) {
        isSubscribed.value = true;
        console.log('✅ Token verified - user is subscribed');
      } else {
        isSubscribed.value = false;
        console.log('❌ Token invalid - user not subscribed');
      }
      
      return response.subscribed;
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      isSubscribed.value = false;
      return false;
    }
  };

  const signupAndVerify = async (userEmail) => {
    // This will now be called from the subscribe page with the token
    // The token will be passed from the API response
    console.log('📝 Signup recorded for:', userEmail);
    localStorage.setItem('i90_email', userEmail);
    email.value = userEmail;
  };

  const setSubscriptionToken = async (token) => {
    console.log('🔐 Setting subscription token...');
    subscriptionToken.value = token;
    localStorage.setItem('i90_subscription_token', token);
    
    // Verify the token immediately
    await verifyToken(token);
  };

  return { 
    isSubscribed: readonly(isSubscribed), 
    email: readonly(email), 
    subscriptionToken: readonly(subscriptionToken),
    signupAndVerify,
    setSubscriptionToken,
    verifyToken
  };
};