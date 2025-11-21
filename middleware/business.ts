// middleware/business.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isBusinessOwner } = useAuth();
    
    // Skip on server side
    if (process.server) return;
    
    // Check if user is authenticated as business owner
    if (!isBusinessOwner.value) {
      return navigateTo('/business/login');
    }
  });