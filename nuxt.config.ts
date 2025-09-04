// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  app: {
    head: {
      title: 'I-90 Restaurant Deals - Find Great Food Along the Interstate',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials and save money on great food.' 
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          src: 'https://identity.netlify.com/v1/netlify-identity-widget.js'
        }
      ]
    }
  },

  runtimeConfig: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    },

    resend: {
      apiKey: process.env.RESEND_API_KEY
    },
    jwtSecret: process.env.JWT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      stripe: {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      },
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/directory'],
      ignore: ['/business/**', '/admin'],
      failOnError: false
    },
    preset: 'netlify'
  },

  compatibilityDate: '2025-09-03'
})