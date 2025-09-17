# 🎯 Pricing Management Guide

This guide explains how to update pricing for I-90 Eats subscription and business listing plans.

## 📊 Current Pricing Structure

### Newsletter Subscription

- **Current Price**: $2.99/month
- **Stripe Price ID**: `price_newsletter_monthly`
- **Target**: Food lovers and I-90 travelers

### Business Listings

- **Basic Plan**: $9.99/month
- **Premium Plan**: $19.99/month
- **Stripe Price IDs**:
  - Basic: `price_business_basic`
  - Premium: `price_business_premium`

## 🔧 How to Update Pricing

### Step 1: Update Stripe Dashboard

1. **Log into Stripe Dashboard**

   - Go to [stripe.com](https://stripe.com) and sign in

2. **Navigate to Products**

   - Go to Products → [Your Products](https://dashboard.stripe.com/products)

3. **Update Existing Price**

   - Find the product you want to update
   - Click on the product name
   - In the "Pricing" section, click the price you want to change
   - Click "Edit price"
   - Update the amount (note: Stripe uses cents, so $2.99 = 299)
   - Save changes

4. **Create New Price (Alternative)**
   - If you want to create a new price while keeping the old one active:
   - Click "Add another price" in the product
   - Set the new amount and save
   - Update the Price ID in your code (see Step 2)

### Step 2: Update Codebase References

After updating Stripe, update these files with the new pricing information:

#### Frontend Display Prices

**File: `pages/subscribe.vue`**

```javascript
// Update the displayed price
<div class="text-4xl font-bold text-primary-600 mb-2">$NEW_PRICE</div>

// Update the terms text
I will be charged $NEW_PRICE/month
```

**File: `pages/index.vue`**

```javascript
// Update subscription buttons
Subscribe Now - $NEW_PRICE/month
```

**File: `pages/directory.vue`**

```javascript
// Update deal unlock buttons
View Deals - $NEW_PRICE/month
Subscribe Now - $NEW_PRICE/month
```

**File: `pages/subscription/success.vue`**

```javascript
// Update success page pricing
<div class="font-medium text-gray-900">$NEW_PRICE/month</div>
```

#### API Price ID References

**File: `pages/subscribe.vue`**

```javascript
// Update the Stripe Price ID if creating a new price
priceId: "price_newsletter_monthly", // Change this to new price ID
```

### Step 3: Update Documentation

**File: `READY_FOR_PRODUCTION.md`**

```markdown
- Newsletter subscriptions ($NEW_PRICE/month)
- `price_newsletter_monthly` - $NEW_PRICE/month (Newsletter)
```

**File: `PRODUCTION_SETUP.md`**

```markdown
- Amount: $NEW_PRICE/month
```

### Step 4: Test the Changes

1. **Test Subscription Flow**

   - Use Stripe test mode
   - Complete a subscription with test card: `4242 4242 4242 4242`
   - Verify correct amount is charged

2. **Verify Display Updates**
   - Check all pages show the new pricing
   - Ensure Stripe checkout shows correct amount

## 🚨 Important Notes

### Stripe Pricing Best Practices

1. **Don't Delete Old Prices**: Keep them for existing subscribers
2. **Use Test Mode First**: Always test pricing changes in Stripe test mode
3. **Update Both Environments**: Make sure production and test environments have matching prices
4. **Communicate Changes**: Notify existing subscribers of price changes

### Code Update Checklist

- [ ] Update `pages/subscribe.vue` display price
- [ ] Update `pages/index.vue` subscription buttons
- [ ] Update `pages/directory.vue` deal unlock buttons
- [ ] Update `pages/subscription/success.vue` confirmation
- [ ] Update Stripe Price ID if creating new price
- [ ] Update documentation files
- [ ] Test subscription flow with new pricing
- [ ] Verify Stripe checkout shows correct amount

## 📞 Support

If you need help with pricing updates:

1. Contact Stripe support for dashboard questions
2. Check the Stripe API documentation
3. Review your current subscriber analytics before major price changes

## 🔄 Subscription Management

### For Existing Subscribers

- **Price Changes**: New prices only affect new subscribers
- **Prorating**: Stripe handles proration automatically
- **Cancellation**: Subscribers can cancel anytime

### Revenue Tracking

Monitor pricing impact through:

- Stripe Dashboard revenue reports
- Subscription analytics
- Conversion rate tracking
