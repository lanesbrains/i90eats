# Fixes Applied for Netlify Deployment Issues

## Issues Fixed:

### 1. Static vs Server-Side Rendering Configuration

**Problem**: Conflicting configuration between static generation and server-side rendering
**Solution**:

- Updated `netlify.toml` to use `npm run build` instead of `npm run generate`
- Set publish directory to `.output/public`
- Configured proper redirects for API routes to Netlify functions

### 2. API Routes Not Working

**Problem**: API routes weren't being deployed as Netlify functions
**Solution**:

- Changed Nuxt config to use `netlify` preset instead of `static`
- Enabled SSR with proper route rules
- API routes now generate as Netlify functions in `.netlify/functions-internal/`

### 3. Form Reactivity Issues

**Problem**: Subscribe form wasn't reactive due to SSR/hydration mismatch
**Solution**:

- Added `definePageMeta({ ssr: false })` to subscribe page
- Set route rule for `/subscribe` to disable SSR
- Fixed duplicate Stripe import in API route

### 4. Hero Image Not Displaying

**Problem**: NuxtImg component issues with static assets
**Solution**:

- Changed from `<NuxtImg>` to regular `<img>` tag
- Updated image path from `/images/i90-bg.jpg` to `/i90-bg.jpg`
- Added `loading="eager"` for immediate loading

### 5. 404 on Homepage

**Problem**: Routing issues from incorrect static generation setup
**Solution**:

- Fixed Netlify redirects configuration
- Proper SPA fallback for client-side routing
- Correct build output directory

## Configuration Changes:

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".output/public"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### nuxt.config.ts

```typescript
nitro: {
  preset: 'netlify',
  prerender: {
    crawlLinks: false,
    routes: ['/'],
    ignore: ['/business/**', '/admin', '/api/**'],
    failOnError: false
  }
},
ssr: true,
routeRules: {
  '/subscribe': { ssr: false }, // Client-side for form reactivity
  '/directory': { ssr: false }, // Client-side for subscription checks
  '/api/**': { cors: true }
}
```

## Simplified User Flow Recommendation

Based on your feedback, I recommend simplifying the user flow:

### Current Complex Flow → Simplified Flow

- Remove complex user authentication system
- Gate deals based on newsletter subscription status
- Simple email lookup for directory access
- Keep business onboarding simple (contact form → manual review)

### Benefits:

- Better user experience
- Higher conversion rates
- Easier maintenance
- Focus on core value: deals via newsletter

## Next Steps:

1. Deploy to Netlify with new configuration
2. Test API routes in production
3. Verify form functionality
4. Consider implementing simplified user flow
5. Set up environment variables in Netlify dashboard
