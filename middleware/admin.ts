export default defineNuxtRouteMiddleware((to, from) => {
  // In development, allow access
  if (process.dev) {
    return
  }
  
  // In production, check for admin authentication
  const { $auth } = useNuxtApp()
  
  if (!$auth?.user?.admin) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Admin access required'
    })
  }
})