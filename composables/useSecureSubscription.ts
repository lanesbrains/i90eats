import { ref, onMounted } from 'vue';

export const useSecureSubscription = () => {
  const isSubscribed = ref(false);
  const email = ref('');  // From signup or prompt

  onMounted(async () => {
    const storedEmail = localStorage.getItem('i90_email');
    const storedSub = localStorage.getItem('i90_subscribed');
    if (storedSub === 'true' && storedEmail) {
      email.value = storedEmail;
      await verifySubscription(storedEmail);  // Re-verify on load
    }
  });

  const verifySubscription = async (userEmail) => {
    try {
      const { data } = await $fetch('/api/verify-sub', {
        method: 'POST',
        body: { email: userEmail }
      });
      if (data.subscribed) {
        isSubscribed.value = true;
        localStorage.setItem('i90_subscribed', 'true');
      } else {
        isSubscribed.value = false;
        localStorage.removeItem('i90_subscribed');
      }
    } catch {
      isSubscribed.value = false;  // Offline/fail = locked
    }
  };

  const signupAndVerify = async (userEmail) => {
    localStorage.setItem('i90_email', userEmail);
    await verifySubscription(userEmail);
  };

  return { isSubscribed, email, signupAndVerify };
};