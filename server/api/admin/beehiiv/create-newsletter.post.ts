export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const { title, subtitle, content, sendNow = false } = body

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      message: 'Title and content are required'
    })
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${config.beehiivPublicationId}/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.beehiivApiKey}`
        },
        body: JSON.stringify({
          title,
          subtitle: subtitle || '',
          status: sendNow ? 'confirmed' : 'draft',
          content_tags: ['newsletter', 'i90eats'],
          platform: 'both',
          web: {
            title,
            subtitle: subtitle || '',
            content
          },
          email: {
            subject_line: title,
            preview_text: subtitle || '',
            content
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Beehiiv API Error:', error)
      throw createError({
        statusCode: response.status,
        message: `Beehiiv API error: ${error}`
      })
    }

    const data = await response.json()
    
    return {
      success: true,
      post: data,
      message: sendNow ? 'Newsletter sent successfully!' : 'Newsletter draft created successfully!'
    }
  } catch (error: any) {
    console.error('Newsletter creation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create newsletter'
    })
  }
})
