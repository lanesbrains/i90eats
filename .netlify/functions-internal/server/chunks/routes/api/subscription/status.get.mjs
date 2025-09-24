import { d as defineEventHandler, u as useRuntimeConfig, b as getQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const status_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const stripe = new Stripe(config.stripe.secretKey);
  const query = getQuery(event);
  const customerEmail = query.email;
  if (!customerEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email required"
    });
  }
  try {
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });
    if (customers.data.length === 0) {
      return {
        success: true,
        data: {
          active: false,
          status: null
        }
      };
    }
    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 1
    });
    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      return {
        success: true,
        data: {
          active: subscription.status === "active",
          status: subscription.status,
          current_period_end: subscription.current_period_end
        }
      };
    }
    return {
      success: true,
      data: {
        active: false,
        status: null
      }
    };
  } catch (error) {
    console.error("Status check error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to check subscription status"
    });
  }
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
