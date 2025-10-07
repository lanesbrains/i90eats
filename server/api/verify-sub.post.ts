import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { beehiivApiKey, beehiivPublicationId } = useRuntimeConfig();
  const { email } = await readBody(event);

  try {
    const response = await $fetch(`https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscribers/${email}`, {
      headers: { Authorization: `Bearer ${beehiivApiKey}` }
    });
    return { subscribed: response.status === 'active' || response.subscribed };  // Adjust per Beehiiv response
  } catch {
    return { subscribed: false };
  }
});