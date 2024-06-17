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
              {{ $t('tos.header') }}
            </h1>
            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold">
                1. {{ $t('tos.introduction.header') }}:
              </span>
              {{ $t('tos.introduction.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold">
                2. {{ $t('tos.agreement.header') }}:
              </span>
              {{ $t('tos.agreement.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold"> 3. {{ $t('tos.access.header') }}: </span>
              {{ $t('tos.access.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold">4. {{ $t('tos.refunds.header') }}:</span>
              {{ $t('tos.refunds.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold"
                >5. {{ $t('tos.disclaimer.header') }}:</span
              >
              {{ $t('tos.disclaimer.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold"
                >6. {{ $t('tos.warranties.header') }}:</span
              >
              {{ $t('tos.warranties.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold">
                7. {{ $t('tos.responsibilities.header') }}:
              </span>
              {{ $t('tos.responsibilities.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold"
                >8. {{ $t('tos.generalTerms.header') }}:</span
              >
              {{ $t('tos.generalTerms.description') }}
            </p>

            <p class="mt-5 text-lg leading-8 text-gray-600">
              <span class="font-bold"
                >10. {{ $t('tos.effectiveDate.header') }}:</span
              >
              {{ $t('tos.effectiveDate.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
