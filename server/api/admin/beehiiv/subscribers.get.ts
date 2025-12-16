export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 50
  const status = query.status as string || 'active'

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${config.beehiivPublicationId}/subscriptions?page=${page}&limit=${limit}&status=${status}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.beehiivApiKey}`
        }
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
      subscribers: data.data || [],
      pagination: {
        page: data.page || page,
        limit: data.limit || limit,
        total: data.total || 0
      }
    }
  } catch (error: any) {
    console.error('Subscribers fetch error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch subscribers'
    })
  }
})
