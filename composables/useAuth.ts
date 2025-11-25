// composables/useAuth.ts
import { ref, readonly, computed, onMounted } from 'vue';

export const useAuth = () => {
  // Reactive state
  const user = ref(null);
  const isSubscriber = ref(false);
  const isBusinessOwner = ref(false);
  const ownedRestaurant = ref(null);
  const loading = ref(true);

  // Computed properties
  const isAuthenticated = computed(() => !!user.value);
  const userType = computed(() => {
    if (isBusinessOwner.value) return 'business';
    if (isSubscriber.value) return 'subscriber';
    return 'guest';
  });

  // Initialize on mount
  onMounted(async () => {
    if (process.client) {
      await loadUserFromStorage();
      loading.value = false;
    }
  });

  // Load user from localStorage
  const loadUserFromStorage = async () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        user.value = parsedUserData;
        
        // Verify token and set appropriate flags
        if (parsedUserData.type === 'subscriber') {
          isSubscriber.value = await verifySubscriberToken(token, parsedUserData.email);
        } else if (parsedUserData.type === 'business') {
          const businessResult = await verifyBusinessToken(token, parsedUserData.email);
          isBusinessOwner.value = businessResult.isOwner;
          ownedRestaurant.value = businessResult.restaurant;
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        clearAuth();
      }
    }
  };

  // Subscriber authentication
  const signInSubscriber = async (email, locations = []) => {
    try {
      // Validate locations
      if (!locations || !Array.isArray(locations) || locations.length === 0) {
        return { success: false, error: 'Please select at least one location' };
      }

      // Subscribe user with locations
      const subscribeResponse = await $fetch('/api/subscribe', {
        method: 'POST',
        body: { email, locations }
      });

      if (subscribeResponse.ok) {
        // Create JWT token for subscriber with locations
        const tokenResponse = await $fetch('/api/auth/create-token', {
          method: 'POST',
          body: { 
            email, 
            type: 'subscriber',
            locations 
          }
        });

        if (tokenResponse.token) {
          setAuth(tokenResponse.token, {
            email,
            type: 'subscriber',
            locations
          });
          
          isSubscriber.value = true;
          return { success: true };
        }
      }
      
      return { success: false, error: 'Subscription failed' };
    } catch (error) {
      console.error('Subscriber sign-in error:', error);
      return { success: false, error: error.message };
    }
  };

  // Business authentication
  const signInBusiness = async (email) => {
    try {
      // Verify business ownership by email (no token needed for new signups)
      const ownershipResult = await verifyBusinessToken(null, email);
      
      if (ownershipResult.isOwner && ownershipResult.restaurant) {
        // Create JWT token for business
        const tokenResponse = await $fetch('/api/auth/create-token', {
          method: 'POST',
          body: { 
            email, 
            type: 'business',
            restaurantSlug: ownershipResult.restaurant.slug
          }
        });

        if (tokenResponse.token) {
          setAuth(tokenResponse.token, {
            email,
            type: 'business',
            restaurant: ownershipResult.restaurant
          });
          
          isBusinessOwner.value = true;
          ownedRestaurant.value = ownershipResult.restaurant;
          return { success: true };
        }
      }
      
      return { success: false, error: 'Business not found for this email' };
    } catch (error) {
      console.error('Business sign-in error:', error);
      return { success: false, error: error.message };
    }
  };

  // Token verification
  const verifySubscriberToken = async (token, email) => {
    try {
      const response = await $fetch('/api/auth/verify-subscriber', {
        method: 'POST',
        body: { token, email }
      });
      return response.valid;
    } catch {
      return false;
    }
  };

  const verifyBusinessToken = async (token, email) => {
    try {
      const response = await $fetch('/api/auth/verify-business', {
        method: 'POST',
        body: { token, email }
      });
      return response;
    } catch {
      return { isOwner: false };
    }
  };

  // Set authentication
  const setAuth = (token, userData) => {
    if (process.client) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      user.value = userData;
    }
  };

  // Clear authentication
  const clearAuth = () => {
    if (process.client) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      user.value = null;
      isSubscriber.value = false;
      isBusinessOwner.value = false;
      ownedRestaurant.value = null;
    }
  };

  // Sign out
  const signOut = () => {
    clearAuth();
  };

  return {
    // State
    user: readonly(user),
    isAuthenticated,
    userType,
    isSubscriber: readonly(isSubscriber),
    isBusinessOwner: readonly(isBusinessOwner),
    ownedRestaurant: readonly(ownedRestaurant),
    loading: readonly(loading),

    // Methods
    signInSubscriber,
    signInBusiness,
    signOut,
    clearAuth,
    loadUserFromStorage
  };
};