<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
</script>