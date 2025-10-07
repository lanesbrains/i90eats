// plugins/prerender.server.js
import { defineNitroPlugin } from '#imports'

export default defineNitroPlugin(async (nitroApp) => {
  if (process.dev || !process.static) return  // Only run on static build

  // Query all directory entries from Decap/@nuxt/content
  const { queryContent } = await import('#content/server')
  const directoryEntries = await queryContent('/directory').find()

  // Extract slugs for prerender routes
  const directorySlugs = directoryEntries.map(entry => `/directory/${entry._path.split('/').pop()}`)  // e.g., /directory/seattle-seafood-co

  // Extend nitro prerender routes
  nitroApp.hooks.hook('render:route', (route, { event }) => {
    // Skip if already prerendered
    if (event.context.prerendered) return

    // Add directory slugs
    if (directorySlugs.includes(route)) {
      event.context.prerendered = true
    }
  })

  // Log for debug
  console.log(`[Prerender] Adding ${directorySlugs.length} directory slugs:`, directorySlugs.slice(0, 5))  // First 5
})