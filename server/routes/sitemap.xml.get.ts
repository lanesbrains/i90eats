import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'
  
  // Get all blog posts
  const blogPosts = await serverQueryContent(event, '/blog')
    .where({ published: true })
    .find()
  
  // Get all restaurants
  const restaurants = await serverQueryContent(event, '/restaurants').find()
  
  // Build sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Pages -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/directory</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/subscribe</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/collaborate</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/business/signup</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Blog Posts -->
${blogPosts.map(post => {
  const slug = post.slug || post._path?.split('/').pop() || ''
  const lastmod = post.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  return `  <url>
    <loc>${siteUrl}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${post.image ? `<image:image>
      <image:loc>${post.image}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>` : ''}
  </url>`
}).join('\n')}
  
  <!-- Restaurants -->
${restaurants.map(restaurant => {
  const lastmod = restaurant.createdAt ? new Date(restaurant.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  return `  <url>
    <loc>${siteUrl}/restaurant/${restaurant.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    ${restaurant.image ? `<image:image>
      <image:loc>${restaurant.image}</image:loc>
      <image:title>${restaurant.title}</image:title>
    </image:image>` : ''}
  </url>`
}).join('\n')}
  
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
