# 🔒 Security Audit & Production Readiness Report
**I-90 Eats Platform**

**Audit Date:** December 16, 2025  
**Auditor:** Automated Security Analysis  
**Status:** ⚠️ CRITICAL ISSUES FOUND - ACTION REQUIRED

---

## 🚨 CRITICAL SECURITY ISSUES

### 1. ❌ .env FILE IN GIT HISTORY (SEVERITY: CRITICAL)
**Status:** EXPOSED SECRETS IN REPOSITORY

**Problem:**
- `.env` file with production secrets was committed to git
- GitHub push protection is blocking pushes due to exposed Stripe test keys
- All API keys and secrets in `.env` are potentially compromised
- Secrets exist in commits: 3400880, 627b324, d98bb30, 954ac49, c17afcf, 1a959ec

**Exposed Credentials:**
```
- Stripe Secret Key (test): sk_test_51R6JobCNH3O77Aid...
- Stripe Publishable Key (test): pk_test_51R6JobCNH3O77Aid...
- Stripe Webhook Secret: whsec_JFbOniZZrzzu8sgUVqhCDD8JuWCJlY8b
- Beehiiv API Key: kTrwbI0Oo9V9PmyqgIxL4FgyKcJ2bYuCAjXZKGbdvkfI8NK15HCL2xYP2QXjaaOb
- Beehiiv Publication ID: pub_f1525f16-155c-471a-b3f3-f99951f54b6c
- JWT Secret: IUhSoh8ApEhLLySmWlyucEc6QtkAEAIe4EsAjnZkZf36GCAqrxUVzKNC5RwF35Fd
- Auth0 Client Secret: CxscuGTvRgBpKP1ft73DbXggxX6LXGaVHokUCnNkZYdB1-T68CiHM_ypcmWGU58V
- Resend API Key: re_YrpWyRkQ_6UVR2wybosERdQKPLsnsGRCE
- Supabase Service Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- Supabase Database Password: Mcsmx*eii0pzBgHu1D*Yt-rjzdC(8tPpnCQ1HUhMRoZ4smiJOlWCC-uIrEHZWAUx
```

**Impact:**
- HIGH RISK if repository is public
- MEDIUM RISK if repository is private (still bad practice)
- Attackers could access your database, send emails, process payments, access newsletter subscribers

**Required Actions:**
1. ✅ Immediately rotate ALL API keys and secrets:
   - Stripe: Generate new test/production keys in Stripe Dashboard
   - Supabase: Rotate service role key in Supabase Dashboard > Settings > API
   - Resend: Generate new API key in Resend Dashboard
   - Beehiiv: Generate new API key in Beehiiv settings
   - Auth0: Rotate client secret in Auth0 Dashboard
   - JWT_SECRET: Generate new secret (use: `openssl rand -base64 48`)
   
2. ✅ Remove .env from git history:
   - Use GitHub's bypass link (temporary): https://github.com/lanesbrains/i90eats/security/secret-scanning/unblock-secret/36u924QW3e7LFniN3AtKEog88Ix
   - Then run: `git rm --cached .env && git commit -m "Remove .env" && git push`
   - Or rewrite history using BFG Cleaner (permanent solution)

3. ✅ Update `.env` with new credentials after rotation

4. ⚠️ Never commit `.env` again (it's already in .gitignore)

---

### 2. ❌ NO ROW LEVEL SECURITY (RLS) ON DATABASE (SEVERITY: CRITICAL)
**Status:** ALL DATABASE TABLES UNPROTECTED

**Problem:**
All Supabase tables have RLS **disabled**:
- `users` - No RLS policies
- `restaurants` - No RLS policies
- `subscriptions` - No RLS policies
- `deals` - No RLS policies
- `payment_failures` - No RLS policies

**Impact:**
- Anyone with the anon key can read/write/delete ALL data
- No data isolation between users
- Business data can be accessed by competitors
- User emails can be harvested
- Subscription data can be manipulated

**Required Actions:**
Enable RLS and create policies for each table:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_failures ENABLE ROW LEVEL SECURITY;

-- Example policies (customize based on your needs)
-- Users: Only service role can access
CREATE POLICY "Service role full access" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- Restaurants: Public read, owner write
CREATE POLICY "Anyone can view active restaurants" ON restaurants
  FOR SELECT USING (active = true);

CREATE POLICY "Service role can manage restaurants" ON restaurants
  FOR ALL USING (auth.role() = 'service_role');

-- Subscriptions: Only service role
CREATE POLICY "Service role full access" ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');

-- Deals: Public read active deals, service role manages
CREATE POLICY "Anyone can view active deals" ON deals
  FOR SELECT USING (active = true);

CREATE POLICY "Service role can manage deals" ON deals
  FOR ALL USING (auth.role() = 'service_role');

-- Payment failures: Only service role
CREATE POLICY "Service role full access" ON payment_failures
  FOR ALL USING (auth.role() = 'service_role');
```

---

### 3. ❌ NO API AUTHENTICATION/AUTHORIZATION (SEVERITY: HIGH)
**Status:** MOST API ROUTES ARE UNPROTECTED

**Problem:**
Critical API endpoints lack authentication:

**Unprotected Admin Endpoints:**
- `/api/admin/beehiiv/subscribers` - Anyone can list all newsletter subscribers
- `/api/admin/beehiiv/subscribe` - Anyone can add subscribers
- `/api/admin/beehiiv/create-newsletter` - Anyone can send newsletters

**Unprotected Business Endpoints:**
- `/api/business/restaurant/[slug]` (PUT) - Anyone can update any restaurant
- `/api/business/restaurant/deals` - Anyone can create deals
- `/api/business/verify-ownership` - No verification, just checks email

**Weak Authentication:**
- JWT tokens issued without verifying ownership
- No token validation on protected routes
- Fallback to 'fallback-secret' if JWT_SECRET missing (line 21 in create-token.post.ts)

**Impact:**
- Anyone can access subscriber data
- Competitors can spam your newsletter
- Malicious users can modify restaurant listings
- Business data integrity compromised

**Required Actions:**
1. Implement middleware for authentication:

```typescript
// server/middleware/auth.ts
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const path = event.path
  
  // Protect admin routes
  if (path.startsWith('/api/admin/')) {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
      // Verify user is admin
      if (decoded.type !== 'admin') {
        throw createError({ statusCode: 403, message: 'Forbidden' })
      }
      event.context.user = decoded
    } catch (error) {
      throw createError({ statusCode: 401, message: 'Invalid token' })
    }
  }
  
  // Protect business routes
  if (path.startsWith('/api/business/')) {
    // Add similar auth check
  }
})
```

2. Remove fallback secret in JWT signing
3. Verify ownership before issuing tokens
4. Add rate limiting per route (currently global)

---

### 4. ⚠️ AUTH MIDDLEWARE NOT IMPLEMENTED (SEVERITY: HIGH)
**Status:** AUTHENTICATION STUB EXISTS BUT NOT FUNCTIONAL

**Problem:**
- `middleware/auth.ts` exists but always returns `isAuthenticated = false`
- Authentication is commented as "implement your auth logic here"
- Business dashboard and admin pages are unprotected

**File:** `middleware/auth.ts` (lines 10-11)
```typescript
// Check if user is authenticated (implement your auth logic here)
const isAuthenticated = false // Replace with actual auth check
```

**Impact:**
- Anyone can access `/business/dashboard`
- Anyone can access `/admin` routes
- No session management

**Required Actions:**
Implement proper authentication:

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const isPrerender = process.env.NUXT_PRERENDER === 'true'
  
  if (isPrerender) {
    return
  }
  
  // Get token from cookie or localStorage
  const token = useCookie('auth_token')
  
  if (!token.value) {
    return navigateTo('/business/login')
  }
  
  // Verify token (you may want to do this on server)
  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!)
    // Check if token is for business user
    if (decoded.type !== 'business_owner' && decoded.type !== 'admin') {
      return navigateTo('/business/login')
    }
  } catch (error) {
    return navigateTo('/business/login')
  }
})
```

---

### 5. ⚠️ STRIPE WEBHOOK NOT PROPERLY SECURED (SEVERITY: MEDIUM)
**Status:** SIGNATURE VERIFICATION EXISTS BUT NEEDS REVIEW

**Problem:**
- Webhook signature verification is implemented (✅)
- BUT: Error handling may leak information
- No IP allowlisting (Stripe webhooks come from specific IPs)

**Current Code:** `server/api/stripe-webhook.post.ts`
```typescript
try {
  stripeEvent = stripe.webhooks.constructEvent(body!, sig!, config.stripeWebhookSecret)
} catch (err) {
  console.error('Webhook signature verification failed:', err)
  throw createError({ statusCode: 400, message: 'Invalid signature' })
}
```

**Required Actions:**
1. Add IP allowlisting for Stripe webhook IPs
2. Don't log full error details in production
3. Add retry logic for failed webhook processing
4. Store webhook events in database for replay

---

### 6. ⚠️ env.example CONTAINS PARTIAL SECRETS (SEVERITY: LOW)
**Status:** HARDCODED VALUES IN EXAMPLE FILE

**Problem:**
File `env.example` contains:
```
# domain
dev-hwru7mq43np63pk4.us.auth0.com

# client ID
BN6lolGjUxfaeqOghS1SpgUghvIQIdod

# client Secret
NdkJ-rk8CcwSJFX6EBx3WWsV0JmHr6c0pQUigYmlMEiW-vLY1N5NE9SupwFbrORP
```

**Impact:**
- LOW: These appear to be example/old credentials
- Still bad practice to include any real-looking credentials

**Required Actions:**
Remove real credentials from env.example:
```env
# Auth0 Configuration
AUTH0_DOMAIN=your_auth0_domain.auth0.com
AUTH0_CLIENT_ID=your_client_id_here
AUTH0_CLIENT_SECRET=your_client_secret_here
```

---

## ⚠️ MEDIUM PRIORITY ISSUES

### 7. ⚠️ NO INPUT VALIDATION/SANITIZATION
**Status:** MISSING ON MOST API ROUTES

**Problem:**
- No validation library (Zod, Joi, Yup) in use
- User input directly used in database queries
- No email validation
- No sanitization of HTML/markdown content

**Example:** `server/api/business/restaurant/[slug].put.ts`
```typescript
const updatedData = {
  ...existingData,
  title: body.title || existingData.title,  // No validation
  cuisine: body.cuisine || existingData.cuisine,  // No sanitization
  // ...
};
```

**Required Actions:**
1. Install Zod: `npm install zod`
2. Create validation schemas for all API inputs
3. Validate before processing

---

### 8. ⚠️ CONSOLE.LOG IN PRODUCTION CODE
**Status:** SENSITIVE DATA MAY BE LOGGED

**Problem:**
Multiple `console.log` and `console.error` statements throughout:
- `server/api/stripe-webhook.post.ts` - Logs webhook events
- May log sensitive payment information
- Creates large log files in production

**Required Actions:**
1. Replace with proper logging library (Pino, Winston)
2. Sanitize logs to remove PII/secrets
3. Use log levels (info, warn, error)
4. Disable debug logs in production

---

### 9. ⚠️ RATE LIMITING IS IN-MEMORY
**Status:** WILL NOT WORK IN MULTI-SERVER DEPLOYMENTS

**Current Config:** `nuxt.config.ts`
```typescript
rateLimiter: {
  driver: {
    name: 'memory'  // ⚠️ In-memory
  }
}
```

**Problem:**
- Each server instance has its own rate limit counter
- Users can bypass by hitting different servers
- Counter resets on server restart

**Required Actions:**
Use Redis for distributed rate limiting:
```typescript
rateLimiter: {
  driver: {
    name: 'redis',
    options: {
      url: process.env.REDIS_URL
    }
  }
}
```

---

### 10. ⚠️ NO ERROR MONITORING
**Status:** NO SENTRY OR ERROR TRACKING SERVICE

**Problem:**
- Production errors go to console only
- No visibility into runtime errors
- Can't track error rates or patterns

**Required Actions:**
1. Set up Sentry: `npm install @sentry/nuxt`
2. Add DSN to environment variables
3. Configure error sampling and filtering

---

## ✅ SECURITY STRENGTHS

### What's Working Well:

1. ✅ **Security Headers Configured**
   - CSP, HSTS, X-Frame-Options, X-Content-Type-Options all present
   - Good configuration in `nuxt.config.ts`

2. ✅ **Stripe Webhook Signature Verification**
   - Properly validates webhook signatures
   - Prevents webhook spoofing

3. ✅ **Environment Variables Used**
   - Secrets not hardcoded in source code
   - Using runtime config properly

4. ✅ **HTTPS Enforcement**
   - HSTS headers configured
   - Secure cookies (when implemented)

5. ✅ **JWT for Authentication**
   - Using industry-standard JWT
   - Token expiry configured (1 year - could be shorter)

6. ✅ **Supabase Client Configuration**
   - Using service role key for server operations
   - Auto-refresh disabled for server client

7. ✅ **Rate Limiting Enabled**
   - 100 requests/minute per IP
   - Helps prevent DDoS

8. ✅ **Production Build Works**
   - Build completed successfully
   - No compilation errors

---

## 📊 PRODUCTION READINESS ASSESSMENT

| Category | Status | Score | Notes |
|----------|--------|-------|-------|
| **Security** | ❌ CRITICAL ISSUES | 2/10 | Exposed secrets, no RLS, no auth |
| **Authentication** | ❌ NOT IMPLEMENTED | 1/10 | Stub code only |
| **Authorization** | ❌ NOT IMPLEMENTED | 1/10 | No access controls |
| **Database Security** | ❌ NO RLS | 0/10 | All data exposed |
| **API Security** | ❌ UNPROTECTED | 2/10 | No auth on critical routes |
| **Input Validation** | ⚠️ MISSING | 3/10 | No validation library |
| **Error Handling** | ⚠️ BASIC | 5/10 | Needs monitoring |
| **Performance** | ✅ GOOD | 8/10 | Build succeeds, optimized |
| **SEO** | ✅ EXCELLENT | 9/10 | Comprehensive meta tags |
| **Code Quality** | ✅ GOOD | 7/10 | TypeScript, organized |

### **OVERALL PRODUCTION READINESS: 3/10** ❌

---

## 🚨 BLOCKER ISSUES (MUST FIX BEFORE PRODUCTION)

### Cannot Deploy Until These Are Fixed:

1. ❌ **Rotate all API keys and secrets** (in .env)
2. ❌ **Remove .env from git history**
3. ❌ **Enable RLS on all database tables**
4. ❌ **Implement authentication on API routes**
5. ❌ **Implement auth middleware properly**
6. ❌ **Add admin role verification**

**Estimated Time to Fix:** 4-6 hours

---

## 📋 IMMEDIATE ACTION PLAN

### Step 1: Secret Rotation (30 minutes)
1. Stripe Dashboard → API Keys → Create new test keys
2. Supabase Dashboard → Settings → API → Regenerate service_role key
3. Resend Dashboard → API Keys → Create new key
4. Beehiiv → Settings → API → Generate new key
5. Auth0 Dashboard → Applications → Rotate client secret
6. Generate new JWT secret: `openssl rand -base64 48`
7. Update `.env` with new values

### Step 2: Git History Cleanup (15 minutes)
1. Click GitHub bypass link to allow current push
2. Run: `git rm --cached .env && git commit -m "Remove .env" && git push`
3. Verify `.env` is in `.gitignore`

### Step 3: Database Security (45 minutes)
1. Connect to Supabase
2. Run RLS enable commands (provided above)
3. Create policies for each table
4. Test with anon key to verify protection

### Step 4: API Authentication (2 hours)
1. Create auth middleware
2. Add token validation to admin routes
3. Add token validation to business routes
4. Test authentication flows
5. Remove fallback secrets

### Step 5: Input Validation (1 hour)
1. Install Zod: `npm install zod`
2. Create validation schemas
3. Add validation to critical routes
4. Test with malformed input

### Step 6: Testing (1 hour)
1. Test all API routes with/without auth
2. Test RLS policies
3. Test input validation
4. Test rate limiting

---

## 📈 POST-DEPLOYMENT RECOMMENDATIONS

After fixing blockers:

1. **Set up Sentry** - Error monitoring
2. **Upgrade to Redis** - For rate limiting
3. **Add logging** - Replace console.log with Pino
4. **Implement RBAC** - Role-based access control
5. **Add IP allowlisting** - For admin dashboard
6. **Set up monitoring** - Uptime and performance
7. **Create security.txt** - For responsible disclosure
8. **Implement CORS properly** - Restrict origins
9. **Add request signing** - For sensitive operations
10. **Regular security audits** - Every 3-6 months

---

## 🎯 SUMMARY

Your I-90 Eats platform has **excellent frontend, SEO, and performance** but has **critical security vulnerabilities** that must be addressed before production deployment.

### The Good:
- ✅ Modern tech stack
- ✅ Clean code organization
- ✅ Security headers configured
- ✅ Stripe integration secure
- ✅ SEO optimized
- ✅ Production build works

### The Critical:
- ❌ Secrets exposed in git history
- ❌ Database has no access controls
- ❌ API routes unprotected
- ❌ Authentication not implemented
- ❌ No input validation

### Recommendation:
**DO NOT DEPLOY TO PRODUCTION** until all blocker issues are resolved. The platform is functionally ready but critically insecure. Estimate 4-6 hours to fix all blocking issues.

---

**Report Generated:** December 16, 2025  
**Next Audit Recommended:** After fixes are implemented
