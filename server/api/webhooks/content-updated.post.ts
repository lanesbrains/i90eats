export default defineEventHandler(async (event) => {
    // Verify webhook secret if needed
    const webhookSecret = getHeader(event, 'x-webhook-secret')
    const expectedSecret = process.env.WEBHOOK_SECRET
    
    if (expectedSecret && webhookSecret !== expectedSecret) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }
    
    const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'
    
    // Ping search engines
    try {
      const pingResponse = await fetch(`${siteUrl}/api/sitemap-ping`, {
        method: 'POST'
      })
      const pingResult = await pingResponse.json()
      
      return {
        success: true,
        message: 'Search engines notified',
        pingResults: pingResult
      }
    } catch (error) {
      console.error('Failed to ping search engines:', error)
      return {
        success: false,
        error: error.message
      }
    }
  })