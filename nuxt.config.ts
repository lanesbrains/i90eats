export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', 'nuxt-gtag', '@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots'],  // Keep yours
  css: ['~/assets/css/main.css'],
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    enabled: true,
    debug: true
  },
  image: {
    // provider: 'static',
    domains: ['i90eats.com', 'images.unsplash.com'],
    format: ['webp', 'avif', 'png', 'jpg'],
    quality: 80
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US'
      },
      title: 'I-90 Eats - Find Great Restaurant Deals Along Interstate 90',
      titleTemplate: '%s | I-90 Eats',
      meta: [
        // Basic SEO
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#2563eb' },
        { name: 'msapplication-TileColor', content: '#2563eb' },
        { name: 'author', content: 'I-90 Eats' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        
        // Keywords
        { name: 'keywords', content: 'restaurant deals, I-90 restaurants, dining discounts, food specials, interstate 90, travel food, restaurant coupons, Seattle restaurants, Chicago restaurants, Boston restaurants' },
        
        // Description
        { 
          name: 'description', 
          content: 'Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials, save money on great food, and find hidden gems along your route.' 
        },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com' },
        { property: 'og:title', content: 'I-90 Eats - Find Great Restaurant Deals Along Interstate 90' },
        { property: 'og:description', content: 'Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials and save money on great food.' },
        { property: 'og:image', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/og-image.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'I-90 Eats - Restaurant Deals Along Interstate 90' },
        { property: 'og:site_name', content: 'I-90 Eats' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com' },
        { name: 'twitter:title', content: 'I-90 Eats - Find Great Restaurant Deals Along Interstate 90' },
        { name: 'twitter:description', content: 'Discover exclusive restaurant deals along Interstate 90 from Seattle to Boston. Get weekly newsletters with local dining specials and save money on great food.' },
        { name: 'twitter:image', content: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/og-image.jpg` },
        { name: 'twitter:image:alt', content: 'I-90 Eats - Restaurant Deals Along Interstate 90' },

        // Additional SEO
        { name: 'application-name', content: 'I-90 Eats' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'I-90 Eats' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        
        // Search Console Verification (add your actual verification codes)
        { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION || 'your-google-verification-code' },
        { name: 'msvalidate.01', content: process.env.BING_SITE_VERIFICATION || 'your-bing-verification-code' },
        { name: 'yandex-verification', content: process.env.YANDEX_VERIFICATION || 'your-yandex-verification-code' },

        // Facebook Domain Verification
        { name: 'facebook-domain-verification', content: process.env.FACEBOOK_DOMAIN_VERIFICATION || 'your-facebook-verification-code' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com' },
        
        // Preconnect to external domains for performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' 
        }
      ],
    }
  },
  plugins: [
    // Remove this line - the plugin is now in server/plugins/prerender.ts
    // { src: '~/plugins/prerender.server.js', mode: 'server' }
  ],
  runtimeConfig: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    },
    beehiivApiKey: process.env.BEEHIIV_API_KEY,
    beehiivPublicationId: process.env.BEEHIIV_PUBLICATION_ID,
    resend: {
      apiKey: process.env.RESEND_API_KEY
    },
    jwtSecret: process.env.JWT_SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com',
      stripe: {
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      },
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  ssr: true,
  nitro: {
    experimental: {
      wasm: true
    }
  },
  compatibilityDate: '2025-09-03'
})