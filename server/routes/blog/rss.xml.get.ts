import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://i90eats.com'

  const posts = await serverQueryContent(event, 'blog')
    .sort({ date: -1 })
    .limit(50)
    .find()

  const rssItems = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post._path?.split('/').pop()}`
    const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
    
    return `
    <item>
      <title><![CDATA[${post.title || 'Untitled'}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.description || post.excerpt || ''}]]></description>
      ${post.author ? `<author>${post.author}</author>` : ''}
      ${post.categories ? post.categories.map((cat: string) => `<category>${cat}</category>`).join('\n      ') : ''}
    </item>`
  }).join('\n')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>I-90 Eats Blog</title>
    <link>${siteUrl}</link>
    <description>Restaurant deals, food tips, and travel guides along Interstate 90 from Seattle to Boston</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/og-image.jpg</url>
      <title>I-90 Eats</title>
      <link>${siteUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600')
  
  return rssXml
})
