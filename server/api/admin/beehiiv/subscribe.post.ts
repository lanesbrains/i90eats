export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const { email, reactivate_existing = false, send_welcome_email = true } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
    })
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${config.beehiivPublicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.beehiivApiKey}`
        },
        body: JSON.stringify({
          email,
          reactivate_existing,
          send_welcome_email,
          utm_source: 'i90eats',
          utm_medium: 'admin_panel'
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
      subscription: data,
      message: 'Subscriber added successfully!'
    }
  } catch (error: any) {
    console.error('Subscribe error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to add subscriber'
    })
  }
})
