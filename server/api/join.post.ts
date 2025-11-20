// server/api/join.post.ts
import { defineEventHandler, readBody, createError } from 'h3';
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  console.log('🚀 JOIN API: Request received');
  
  try {
    // DEBUG: Check runtime config
    const runtimeConfig = useRuntimeConfig();
    console.log('🔧 Runtime config keys:', Object.keys(runtimeConfig));
    console.log('💳 Stripe config available:', !!runtimeConfig.stripe);
    console.log('🔑 Stripe secret key exists:', !!runtimeConfig.stripe?.secretKey);
    console.log('🌐 Site URL:', process.env.NUXT_PUBLIC_SITE_URL);
    
    const { stripe } = runtimeConfig;
    
    if (!stripe?.secretKey) {
      console.error('❌ CRITICAL: Stripe secret key not found!');
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Server configuration error' 
      });
    }
    
    const stripeInstance = new Stripe(stripe.secretKey);
    console.log('✅ Stripe instance created successfully');
    
    const body = await readBody(event);
    const { plan, priceId, ...listingData } = body;
    
    console.log('📋 Request body:', { plan, priceId, hasListingData: !!Object.keys(listingData).length });
    
    if (plan === 'basic' || plan === 'premium') {
      console.log('💳 Attempting to create Stripe checkout session...');
      console.log('🏷️ Price ID:', priceId);
      
      try {
        const sessionConfig = {
          mode: 'subscription',
          payment_method_types: ['card'],
          line_items: [{ price: priceId, quantity: 1 }],
          success_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/business/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://i90eats.com'}/business/signup?canceled=1`,
          metadata: { 
            listingData: JSON.stringify(listingData),
            plan: plan
          }
        };
        
        console.log('🔧 Session config:', JSON.stringify(sessionConfig, null, 2));
        
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
          requestId: stripeError.requestId
        });
        
        throw createError({ 
          statusCode: 500, 
          statusMessage: `Stripe error: ${stripeError.message}` 
        });
      }
    }
    
    console.log('❌ Invalid plan submitted:', plan);
    throw createError({ statusCode: 400, statusMessage: 'Invalid plan' });
    
  } catch (error) {
    console.error('💥 UNEXPECTED ERROR in join API:', error);
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Internal server error' 
    });
  }
});