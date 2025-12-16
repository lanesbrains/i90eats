import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { default: Stripe } = await import('stripe');
  console.log('🚀 JOIN API: Request received');
  
  try {
    // DEBUG: Check environment variables directly
    console.log('🔧 STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('🔧 STRIPE_SECRET_KEY starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 7));
    console.log('🌐 NUXT_PUBLIC_SITE_URL:', process.env.NUXT_PUBLIC_SITE_URL);
    
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.error('❌ CRITICAL: STRIPE_SECRET_KEY environment variable not found!');
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Server configuration error: Missing Stripe key' 
      });
    }
    
    if (!stripeSecretKey.startsWith('sk_test_')) {
      console.warn('⚠️ WARNING: Not using test key - this might cause issues in test mode');
    }
    
    const stripeInstance = new Stripe(stripeSecretKey);
    console.log('✅ Stripe instance created with test key');
    
    const body = await readBody(event);
    const { plan, priceId, ...listingData } = body;
    
    console.log('📋 Request body:', { plan, priceId, hasListingData: !!Object.keys(listingData).length });
    
    if (plan === 'basic' || plan === 'premium') {
      console.log('💳 Attempting to create Stripe checkout session...');
      console.log('🏷️ Price ID:', priceId);
      
      try {
        // Generate slug for restaurant
        const restaurantSlug = listingData.restaurantName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Prepare pending data for success page
        const pendingData = {
          ownerEmail: listingData.email || listingData.ownerEmail,
          restaurantName: listingData.restaurantName,
          location: listingData.location,
          slug: restaurantSlug,
          plan: plan
        };
        
        console.log('📝 Pending restaurant data prepared:', pendingData);
        
        // Create enhanced success URL with authentication data
        const successUrl = `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.vercel.app'}/business/success?ownerEmail=${encodeURIComponent(pendingData.ownerEmail)}&slug=${encodeURIComponent(pendingData.slug)}&name=${encodeURIComponent(pendingData.restaurantName)}&location=${encodeURIComponent(pendingData.location)}&plan=${encodeURIComponent(pendingData.plan)}`;
        
        const sessionConfig = {
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          success_url: successUrl,
          cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.vercel.app'}/business/signup?canceled=1`,
          metadata: { 
            listingData: JSON.stringify(listingData),
            plan: plan,
            restaurantSlug: restaurantSlug
          }
        };
        
        console.log('🔧 Session config created');
        
        const session = await stripeInstance.checkout.sessions.create(sessionConfig);
        
        console.log('✅ Checkout session created successfully:', session.id);
        console.log('🔗 Checkout URL:', session.url);
        
        return { checkout_url: session.url };
        
      } catch (stripeError) {
        console.error('❌ STRIPE API ERROR:', {
          message: stripeError.message,
          type: stripeError.type,
          code: stripeError.code,
          statusCode: stripeError.statusCode,
          requestId: stripeError.requestId,
          raw: stripeError
        });
        
        // Handle specific Stripe errors
        if (stripeError.code === 'resource_missing') {
          throw createError({ 
            statusCode: 400, 
            statusMessage: `Price ID not found: ${priceId}. Check if it exists in test mode.` 
          });
        }
        
        throw createError({ 
          statusCode: 500, 
          statusMessage: `Stripe error: ${stripeError.message}` 
        });
      }
    }
    
    console.log('❌ Invalid plan:', plan);
    throw createError({ statusCode: 400, statusMessage: 'Invalid plan' });
    
  } catch (error) {
    console.error('💥 UNEXPECTED ERROR in join API:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Internal server error: ${error.message}` 
    });
  }
});