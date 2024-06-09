<script setup lang="ts">
import { type Language, languages as languagesConst } from '@/lib/constants'

const { t } = useI18n()

const selectedLanguages = ref<Language[]>(languagesConst)
</script>

<template>
  <div class="bg-white">
    <div
      class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"
    >
      <div
        class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
      >
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <img
                class="h-11"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
                alt="Your Company"
              />
              <h1
                class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Select your input language
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                Get started by selecting the language you plan on inputting.
                This is typically your base i18n file that you work with within
                your native tongue.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0">
          <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white md:shadow-xl md:shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div class="md:shadow-lg md:rounded-3xl">
            <div
              class="bg-white [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
            >
              <div
                class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div
                  class="mx-auto max-w-2xl bg-opacity-95 md:mx-0 md:max-w-none"
                >
                  <LanguageSelector
                    v-model="selectedLanguages"
                    :single="true"
                  />
                </div>
                <div
                  class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"
      />
    </div>
  </div>
</template>
