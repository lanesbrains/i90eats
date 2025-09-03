export default defineNuxtRouteMiddleware((to, from) => {
    const isPrerender = process.env.NUXT_PRERENDER === 'true'
  
    // During prerender, skip auth check to avoid errors
    if (isPrerender) {
      return
    }
  
    // Check if user is authenticated (implement your auth logic here)
    const isAuthenticated = false // Replace with actual auth check
  
    if (!isAuthenticated) {
      return navigateTo('/business/login') // Redirect to login page
    }
  })