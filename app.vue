<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <html class="h-screen overflow-scroll">
    <body>
      <NuxtPage />
      <LoginDialog class="absolute top-0 right-0" />
      <Toaster />
    </body>
  </html>
</template>
