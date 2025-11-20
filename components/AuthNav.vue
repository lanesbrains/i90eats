<template>
    <div class="flex items-center space-x-4">
      <!-- Mobile: Stack vertically -->
      <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
        <!-- Guest User -->
        <template v-if="!isAuthenticated">
          <NuxtLink to="/subscribe" class="btn-primary text-center">
            Subscribe FREE
          </NuxtLink>
          <NuxtLink to="/business/signup" class="btn-secondary text-center">
            Business Signup
          </NuxtLink>
        </template>
    
        <!-- Subscriber -->
        <template v-else-if="userType === 'subscriber'">
          <div class="text-center md:text-left">
            <div class="text-sm text-gray-600 mb-1">
              Welcome, {{ user.email.split('@')[0] }}
            </div>
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <NuxtLink to="/directory" class="btn-primary text-center">
                Browse Deals
              </NuxtLink>
              <button @click="signOut" class="text-sm text-gray-600 hover:text-gray-800">
                Sign Out
              </button>
            </div>
          </div>
        </template>
    
        <!-- Business Owner -->
        <template v-else-if="userType === 'business'">
          <div class="text-center md:text-left">
            <div class="text-sm text-gray-600 mb-1">
              {{ ownedRestaurant.title }}
            </div>
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <NuxtLink to="/business/dashboard" class="btn-primary text-center">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/directory" class="btn-secondary text-center">
                View Directory
              </NuxtLink>
              <button @click="signOut" class="text-sm text-gray-600 hover:text-gray-800">
                Sign Out
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuth } from '~/composables/useAuth';
  
  const { isAuthenticated, userType, user, ownedRestaurant, signOut } = useAuth();
  </script>