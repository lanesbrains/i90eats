export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const reportWebVital = (metric: any) => {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/web-vitals', body)
    } else {
      fetch('/api/web-vitals', {
        body,
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  const loadWebVitals = async () => {
    try {
      const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')
      
      onCLS(reportWebVital)
      onFID(reportWebVital)
      onFCP(reportWebVital)
      onLCP(reportWebVital)
      onTTFB(reportWebVital)
      onINP(reportWebVital)
    } catch (error) {
      console.error('Failed to load web-vitals:', error)
    }
  }

  if (document.readyState === 'complete') {
    loadWebVitals()
  } else {
    window.addEventListener('load', loadWebVitals)
  }
})
