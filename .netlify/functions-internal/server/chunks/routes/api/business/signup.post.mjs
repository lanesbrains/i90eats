import { d as defineEventHandler, u as useRuntimeConfig, r as readBody, a as getHeader, c as createError } from '../../../nitro/nitro.mjs';
import Stripe from 'stripe';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const signup_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripe.secretKey);
  const body = await readBody(event);
  const {
    restaurantName,
    ownerEmail,
    location,
    address,
    phone,
    cuisine,
    website,
    description,
    plan,
    priceId
  } = body;
  try {
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: ownerEmail,
      limit: 1
    });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: ownerEmail,
        name: restaurantName,
        metadata: {
          type: "business",
          restaurant_name: restaurantName,
          location,
          plan
        }
      });
    }
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${getHeader(event, "origin")}/business/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getHeader(event, "origin")}/business/signup`,
      metadata: {
        type: "business_signup",
        restaurant_name: restaurantName,
        owner_email: ownerEmail,
        location,
        address,
        phone,
        cuisine,
        website: website || "",
        description,
        plan
      }
    });
    return {
      success: true,
      data: {
        checkout_url: session.url,
        session_id: session.id
      }
    };
  } catch (error) {
    console.error("Business signup error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create business subscription"
    });
  }
});

export { signup_post as default };
//# sourceMappingURL=signup.post.mjs.map
