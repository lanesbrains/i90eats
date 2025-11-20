// composables/useBusinessAuth.ts
import { ref, readonly, onMounted } from 'vue';

export const useBusinessAuth = () => {
  const isBusinessOwner = ref(false);
  const ownedRestaurant = ref(null);
  const businessToken = ref('');
  
  onMounted(async () => {
    if (process.client) {
      const token = localStorage.getItem('i90_business_token');
      const email = localStorage.getItem('i90_business_email');
      
      if (token && email) {
        businessToken.value = token;
        await verifyBusinessOwnership(token, email);
      }
    }
  });

  const verifyBusinessOwnership = async (token, email) => {
    try {
      console.log('🔍 Verifying business ownership...');
      const response = await $fetch('/api/business/verify-ownership', {
        method: 'POST',
        body: { token, email }
      });
      
      if (response.isOwner && response.restaurant) {
        isBusinessOwner.value = true;
        ownedRestaurant.value = response.restaurant;
        console.log('✅ Business ownership verified');
        return true;
      }
      
      console.log('❌ Not a business owner');
      return false;
    } catch (error) {
      console.error('❌ Business verification failed:', error);
      clearBusinessAuth();
      return false;
    }
  };

  const setBusinessAuth = (token, email, restaurant) => {
    if (process.client) {
      localStorage.setItem('i90_business_token', token);
      localStorage.setItem('i90_business_email', email);
      businessToken.value = token;
      isBusinessOwner.value = true;
      ownedRestaurant.value = restaurant;
    }
  };

  const clearBusinessAuth = () => {
    if (process.client) {
      localStorage.removeItem('i90_business_token');
      localStorage.removeItem('i90_business_email');
      businessToken.value = '';
      isBusinessOwner.value = false;
      ownedRestaurant.value = null;
    }
  };

  return { 
    isBusinessOwner: readonly(isBusinessOwner),
    ownedRestaurant: readonly(ownedRestaurant),
    businessToken: readonly(businessToken),
    setBusinessAuth,
    clearBusinessAuth,
    verifyBusinessOwnership
  };
};