import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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
import 'node:url';
import 'ipx';

const create_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { email, locations, priceId } = body;
  console.log("Subscription API called with:", { email, locations: locations == null ? void 0 : locations.length, priceId });
  if (!email || !locations || !Array.isArray(locations) || locations.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input data"
    });
  }
  if (!config.stripe.secretKey) {
    console.log("No Stripe key found, returning mock response");
    return {
      success: true,
      data: {
        checkout_url: "https://checkout.stripe.com/test-session",
        session_id: "test_session_123"
      },
      message: "Mock subscription created successfully (no Stripe key)"
    };
  }
  const stripe = new Stripe(config.stripe.secretKey);
  try {
    let customer;
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1
    });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: {
          locations: JSON.stringify(locations)
        }
      });
    }
    const siteUrl = (config.public.siteUrl || "https://i90eats.com").replace(/\/$/, "");
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        { price: priceId, quantity: 1 }
      ],
      mode: "subscription",
      success_url: `${siteUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/subscribe`,
      metadata: { locations: JSON.stringify(locations) }
    });
    return {
      success: true,
      data: {
        checkout_url: session.url,
        session_id: session.id
      }
    };
  } catch (error) {
    console.error("Stripe error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create subscription"
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
