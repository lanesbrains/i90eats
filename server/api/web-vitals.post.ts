export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { name, value, rating, delta, id, navigationType } = body

  if (!name || typeof value === 'undefined') {
    throw createError({
      statusCode: 400,
      message: 'Invalid web vitals data'
    })
  }

  console.log('[Web Vitals]', {
    metric: name,
    value: value.toFixed(2),
    rating,
    delta: delta?.toFixed(2),
    id,
    navigationType
  })

  return {
    success: true,
    message: 'Web vital recorded'
  }
})
