<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
import { storeToRefs } from 'pinia'

import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { useCodeStore } from '~/store/code'
import { useLangStore } from '~/store/language'

const codeStore = useCodeStore()
const { setCode } = codeStore
// TODO: Ensure code is validate JSON
// TODO: Error/Toast if not
const { code } = storeToRefs(codeStore)

const langStore = useLangStore()
const { inputLanguage } = storeToRefs(langStore)

const router = useRouter()
const extensions = [json(), oneDark]

const handleFileContents = (e: any) => {
  setCode(e)
}

const handleNav = () => {
  router.push({
    path: '/output',
  })
}

onMounted(() => {
  if (!inputLanguage.value) {
    navigateTo('/get-started')
  }
})
</script>

<template>
  <div class="bg-white overflow-scroll h-screen">
    <div
      class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"
    >
      <div
        class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
      >
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <NuxtLink to="get-started">
                <ArrowLeftIcon class="h-11 cursor-pointer" />
              </NuxtLink>
              <h1
                class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Import your JSON
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                To import your JSON file, you have two options: either paste the
                file contents into the editor by copying from a text editor and
                pasting here, or use the file input to select your JSON file
                directly from your computer, which will automatically load the
                contents into the editor for you.
              </p>
            </div>

            <div class="flex flex-col mt-20">
              <div class="flex gap-10">
                <FileInput
                  class="w-auto cursor-pointer"
                  @file-change="content => handleFileContents(content)"
                />

                <Button :disabled="!code?.length" @click="handleNav">
                  Submit
                </Button>
              </div>
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
              <div class="h-full flex flex-col my-2">
                <div class="flex">
                  <div class="relative w-full md:pr-0">
                    <div class="mx-auto w-full max-w-2xl md:mx-0 md:max-w-none">
                      <div
                        class="w-full overflow-hidden rounded-t-xl bg-[#282C34]"
                      >
                        <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                          <div
                            class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
                          ></div>
                          <button
                            class="bg-[#282C34] border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white"
                          >
                            {{ inputLanguage?.title }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Codemirror
                  v-model="code"
                  :placeholder="`${$t('pasteYourJsonHere')}...`"
                  :style="{
                    height: '100vh',
                    width: '100vw',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    overflow: 'hidden',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="extensions"
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
