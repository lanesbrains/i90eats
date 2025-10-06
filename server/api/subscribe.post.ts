import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { beehiivApiKey, beehiivPublicationId } = useRuntimeConfig();
  const body = await readBody(event);
  const { email, locations } = body;

  if (!email || !locations?.length) {
    return { statusCode: 400, body: { error: 'Missing email or locations' } };
  }

  try {
    const response = await $fetch(`https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${beehiivApiKey}`, 'Content-Type': 'application/json' },
      body: {
        email,
        send_welcome_email: true,
        custom_fields: [{ name: 'locations', value: locations.join(',') }],
        reactivate_existing: true,
        utm_source: 'website_signup'
      }
    });
    return { ok: true, data: response };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: { error: 'Failed to subscribe' } };
  }
});