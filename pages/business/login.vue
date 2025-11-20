<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Business Login</h2>
          <p class="mt-2 text-sm text-gray-600">Access your restaurant dashboard</p>
        </div>
  
        <form class="mt-8 space-y-6" @submit.prevent="login">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input-field rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="input-field rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <NuxtLink to="/business/signup" class="font-medium text-primary-600 hover:text-primary-500">
                Don't have an account? Sign up
              </NuxtLink>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="loading"
            >
              {{ loading ? 'Logging in...' : 'Log in' }}
            </button>
          </div>
        </form>
  
        <div v-if="error" class="text-red-600 text-sm text-center mt-4">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const { signInBusiness } = useAuth();
const router = useRouter();

const form = ref({
  email: ''
});

const loading = ref(false);
const error = ref('');

const login = async () => {
  loading.value = true;
  error.value = '';

  try {
    const result = await signInBusiness(form.value.email);
    
    if (result.success) {
      router.push('/business/dashboard');
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = 'Unable to verify business ownership.';
  } finally {
    loading.value = false;
  }
};
</script>