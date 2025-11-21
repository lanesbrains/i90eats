export default defineEventHandler(async (event) => {
    const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'
    const sitemapUrl = `${siteUrl}/sitemap.xml`
    
    const results = {
      google: false,
      bing: false,
      errors: []
    }
    
    // Ping Google
    try {
      const googleResponse = await fetch(
        `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        { method: 'GET' }
      )
      if (googleResponse.ok) {
        results.google = true
        console.log('✅ Successfully pinged Google')
      }
    } catch (error) {
      results.errors.push(`Google ping failed: ${error.message}`)
      console.error('❌ Failed to ping Google:', error)
    }
    
    // Ping Bing
    try {
      const bingResponse = await fetch(
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        { method: 'GET' }
      )
      if (bingResponse.ok) {
        results.bing = true
        console.log('✅ Successfully pinged Bing')
      }
    } catch (error) {
      results.errors.push(`Bing ping failed: ${error.message}`)
      console.error('❌ Failed to ping Bing:', error)
    }
    
    return results
  })