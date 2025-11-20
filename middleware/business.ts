// middleware/business.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isBusinessOwner, verifyBusinessOwnership } = useBusinessAuth();
    
    // Skip on server side
    if (process.server) return;
    
    // Check if user is authenticated as business owner
    const token = localStorage.getItem('i90_business_token');
    const email = localStorage.getItem('i90_business_email');
    
    if (!token || !email) {
      return navigateTo('/business/login');
    }
    
    // Verify ownership
    const isValid = await verifyBusinessOwnership(token, email);
    if (!isValid) {
      return navigateTo('/business/login');
    }
  });