import { ref, onMounted } from 'vue';

export const useSubscription = () => {
  const isSubscribed = ref(false);

  onMounted(() => {
    isSubscribed.value = localStorage.getItem('i90_subscribed') === 'true';
  });

  const checkSubscription = () => {
    isSubscribed.value = localStorage.getItem('i90_subscribed') === 'true';
  };

  const setSubscribed = () => {
    localStorage.setItem('i90_subscribed', 'true');
    isSubscribed.value = true;
  };

  return { isSubscribed, checkSubscription, setSubscribed };
};