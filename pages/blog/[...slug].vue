<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'

const { page } = useContent()
</script>

<template>
  <main
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
              {{ page.title }}
            </h1>
            <div class="text-lg leading-8 text-gray-600">
              <ContentDoc class="flex flex-col gap-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
a {
  @apply !text-gray-800;
}
</style>
