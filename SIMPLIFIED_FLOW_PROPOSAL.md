# Simplified User Flow Proposal

## Current Issues

- Complex user authentication system
- Separate business and consumer flows
- API routes not working due to static generation
- Form reactivity issues

## Proposed Simplified Flow

### For Consumers (Deal Seekers)

1. **Newsletter Subscription** ($2.99/month)

   - Simple email + location selection
   - Stripe subscription for payment
   - Access to weekly deal emails
   - Access to online deal directory

2. **Deal Directory Access**
   - Gated behind subscription status
   - Check subscription via email lookup
   - Simple "Enter your email" gate

### For Businesses

1. **Business Registration** (Free)
   - Contact form submission
   - Manual review and onboarding
   - Add deals via admin interface or simple form

## Benefits

- Much simpler user experience
- No complex authentication system
- Easier to maintain
- Better conversion rates
- Focus on core value: deals via newsletter

## Technical Implementation

- Newsletter subscription via Stripe
- Simple email-based access control
- Business submissions via contact forms
- Admin interface for deal management

## Recommended Changes

1. Remove complex user auth
2. Simplify to newsletter subscription model
3. Gate directory access by subscription status
4. Keep business onboarding simple
