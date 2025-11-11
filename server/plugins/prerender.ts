// server/plugins/prerender.ts
export default defineNitroPlugin(async (nitroApp) => {
  // Only run during build/prerender
  if (process.dev) return

  // Hook into prerender routes generation
  nitroApp.hooks.hook('prerender:routes', async (ctx) => {
    try {
      // Query all restaurant entries from @nuxt/content
      const { queryContent } = await import('#content/server')
      const restaurantEntries = await queryContent('/restaurants').find()

      // Extract slugs for prerender
      const restaurantSlugs = restaurantEntries.map(entry => `/restaurant/${entry.slug}`)

      // Add routes to prerender context
      ctx.routes.push(...restaurantSlugs)

      // Log
      console.log(`[Prerender] Added ${restaurantSlugs.length} restaurant slugs:`, restaurantSlugs.slice(0, 5))
    } catch (error) {
      console.error('[Prerender] Error adding restaurant routes:', error)
    }
  })
})

