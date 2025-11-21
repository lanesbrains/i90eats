export const useBreadcrumbs = (items: Array<{ name: string, url: string }>) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://i90eats.com'
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  }
  
  return breadcrumbSchema
}
