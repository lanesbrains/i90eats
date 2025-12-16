<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4">
    <div class="max-w-2xl w-full text-center">
      <div class="relative mb-8">
        <div class="text-9xl font-black text-orange-200 select-none">
          {{ error.statusCode }}
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-32 h-32 text-orange-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ errorMessage }}
      </h1>
      
      <p class="text-xl text-gray-600 mb-8">
        {{ errorDescription }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="goHome" class="btn-primary text-lg px-8 py-3">
          Go Home
        </button>
        <button @click="goBack" class="btn-secondary text-lg px-8 py-3">
          Go Back
        </button>
      </div>

      <div v-if="isDevelopment" class="mt-12 p-6 bg-red-50 border-2 border-red-200 rounded-lg text-left">
        <h3 class="text-lg font-semibold text-red-900 mb-2">Development Error Details:</h3>
        <pre class="text-sm text-red-800 whitespace-pre-wrap break-words">{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const isDevelopment = process.dev

const errorMessages = {
  404: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. It might have been moved or deleted."
  },
  500: {
    title: "Server Error",
    description: "Something went wrong on our end. We're working to fix it."
  },
  403: {
    title: "Access Denied",
    description: "You don't have permission to access this page."
  },
  default: {
    title: "Something Went Wrong",
    description: "An unexpected error occurred. Please try again later."
  }
}

const errorInfo = computed(() => {
  return errorMessages[props.error?.statusCode] || errorMessages.default
})

const errorMessage = computed(() => errorInfo.value.title)
const errorDescription = computed(() => errorInfo.value.description)

const goHome = () => {
  navigateTo('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

useHead({
  title: `${props.error?.statusCode} - ${errorMessage.value}`,
  meta: [
    {
      name: 'description',
      content: errorDescription.value
    }
  ]
})
</script>
