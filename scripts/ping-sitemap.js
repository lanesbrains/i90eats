const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'

async function pingSitemap() {
  try {
    const response = await fetch(`${siteUrl}/api/sitemap-ping`, {
      method: 'POST'
    })
    const result = await response.json()
    console.log('Sitemap ping results:', result)
  } catch (error) {
    console.error('Failed to ping sitemap:', error)
  }
}

pingSitemap()
