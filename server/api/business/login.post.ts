import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // TODO: Replace with real authentication (e.g., check database)
  // For demo, accept any email/password but validate in production
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing credentials'
    })
  }

  // Sample user data - replace with real user lookup
  const user = {
    id: 'business_user_id',  // From your database
    email: body.email,
    role: 'business'
  }

  // Generate JWT token
  const token = jwt.sign(user, config.jwtSecret, { expiresIn: '7d' })

  return {
    token,
    user
  }
})