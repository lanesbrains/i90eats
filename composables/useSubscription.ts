export const useSubscription = () => {
  const isSubscribed = ref(false)
  const subscriptionStatus = ref<'active' | 'past_due' | 'cancelled' | 'unpaid' | null>(null)
  const loading = ref(false)

  // Check subscription status from localStorage or API
  const checkSubscription = async (email?: string) => {
    loading.value = true
    
    try {
      // First check localStorage for quick access
      const localStatus = localStorage.getItem('subscription_status')
      if (localStatus) {
        const data = JSON.parse(localStatus)
        isSubscribed.value = data.active
        subscriptionStatus.value = data.status
      }

      // If email provided, verify with server
      if (email) {
        const { data } = await $fetch('/api/subscription/status', {
          method: 'GET',
          query: { email }
        })

        if (data) {
          isSubscribed.value = data.active
          subscriptionStatus.value = data.status
          
          // Update localStorage
          localStorage.setItem('subscription_status', JSON.stringify({
            active: data.active,
            status: data.status,
            expires: data.current_period_end,
            email: email
          }))
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
      // If API fails, rely on localStorage
    } finally {
      loading.value = false
    }
  }

  // Subscribe user
  const subscribe = async (email: string, locations: string[]) => {
    loading.value = true
    
    try {
      const { data } = await $fetch('/api/subscription/create', {
        method: 'POST',
        body: {
          email,
          locations,
          priceId: 'price_newsletter_monthly' // Your Stripe price ID
        }
      })

      if (data.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = data.checkout_url
      }
    } catch (error) {
      console.error('Subscription error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Cancel subscription
  const cancelSubscription = async (email: string) => {
    loading.value = true
    
    try {
      await $fetch('/api/subscription/cancel', {
        method: 'POST',
        body: { email }
      })
      
      isSubscribed.value = false
      subscriptionStatus.value = 'cancelled'
      localStorage.removeItem('subscription_status')
    } catch (error) {
      console.error('Cancel error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    isSubscribed: readonly(isSubscribed),
    subscriptionStatus: readonly(subscriptionStatus),
    loading: readonly(loading),
    checkSubscription,
    subscribe,
    cancelSubscription
  }
}