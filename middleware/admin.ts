// middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Check if user is authenticated and has restaurant-owner role
    const user = localStorage.getItem('auth0_user');
    if (!user) {
      return navigateTo('/business/login');
    }
    
    const userData = JSON.parse(user);
    if (userData['https://your-app.com/role'] !== 'restaurant-owner') {
      return navigateTo('/directory');
    }
  }
});