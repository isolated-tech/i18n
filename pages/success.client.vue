<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div
    class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
  >
    <section
      class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40"
    >
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="mx-auto max-w-2xl">
          <div class="max-w-lg">
            <NuxtLink to="/">
              <ArrowLeftIcon class="h-11 cursor-pointer" />
            </NuxtLink>
            <h1
              class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              {{ $t('success.hero') }}
            </h1>
            <p class="mt-5 text-lg leading-8 text-gray-600">
              {{ $t('success.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
