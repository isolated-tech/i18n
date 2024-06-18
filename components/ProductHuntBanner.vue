<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <a
    href="https://www.producthunt.com/posts/i18nlocale?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-i18nlocale"
    target="_blank"
  >
    <Alert class="bg-[#DA552E]">
      <div class="flex gap-5 items-center">
        <img src="/product_hunt_logo.png" class="w-20" />
        <div class="flex flex-col text-white">
          <AlertTitle class="font-semibold text-lg"
            >Live on Product Hunt now!</AlertTitle
          >
          <AlertDescription class="text-md">
            Would love your support 🫶
          </AlertDescription>
        </div>
      </div>
    </Alert>
  </a>
</template>
