// plugins/prerender.server.js
import { defineNitroPlugin, addPrerenderRoutes } from 'nitropack'

export default defineNitroPlugin(async (nitroApp) => {
  if (process.dev) return  // Skip dev

  // Query all restaurant entries from @nuxt/content
  const { queryContent } = await import('#content/server')
  const restaurantEntries = await queryContent('/restaurants').find()

  // Extract slugs for prerender
  const restaurantSlugs = restaurantEntries.map(entry => `/restaurant/${entry.slug}`)

  // Add to prerender routes
  addPrerenderRoutes(nitroApp, restaurantSlugs)

  // Log
  console.log(`[Prerender] Added ${restaurantSlugs.length} restaurant slugs:`, restaurantSlugs.slice(0, 5))
})