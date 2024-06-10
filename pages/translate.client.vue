<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
import { languages, type Language } from '@/lib/constants'
import MyWorker from '@/lib/worker?worker'
import { useCodeStore } from '~/store/code'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const codeStore = useCodeStore()
const { code } = storeToRefs(codeStore)

const worker = ref<Worker>()
const ready = ref()

const progressItems = ref([])
const selectedLanguages = ref<Language[]>(languages)
const route = useRoute()
const langCode = ref()

const checkedLanguages = computed(() => {
  return selectedLanguages.value.filter(language => language.checked)
})

const handleDownload = (fileContent: string, fileName: string) => {
  const element = document.createElement('a')
  const file = new Blob([fileContent], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = fileName
  document.body.appendChild(element) // Required for Firefox
  element.click()
  document.body.removeChild(element)
}

const onMessageReceived = e => {
  switch (e.data.status) {
    case 'initiate':
      // Model file start load: add a new progress item to the list.
      ready.value = false

      progressItems.value = [...progressItems.value, e.data]
      break

    case 'progress':
      // Model file progress: update one of the progress items.
      progressItems.value = progressItems.value.map(item => {
        if (item.file === e.data.file) {
          return { ...item, progress: e.data.progress }
        }
        return item
      })

      console.log('progress: ', e.data.progress)
      break

    case 'done':
      // Model file loaded: remove the progress item from the list.
      progressItems.value = progressItems.value.filter(
        item => item.file !== e.data.file
      )
      break

    case 'ready':
      // Pipeline ready: the worker is ready to accept messages.

      ready.value = true
      break

    case 'update':
      // Generation update: update the output text.
      const language = e.data.output.language as string
      if (!languages.value.includes(language)) {
        languages.value.push(language)
      }

      codeOutput.value = e.data.output.data
      console.log(e.data.output.data)
      break

    case 'complete':
      handleDownload(JSON.stringify(e.data.output.data), 'i18n.json')

      disabled.value = false
      break

    case 'log':
      console.log('log: ', e)
  }
}

onMounted(() => {
  selectedLanguages.value.forEach(l => {
    l.checked = false
  })

  langCode.value = route.query.lang

  worker.value = new MyWorker()
  worker.value.addEventListener('error', error => {
    console.error('Error creating worker:', error)
  })

  worker.value.addEventListener('message', onMessageReceived)
})

onUnmounted(() => {
  worker.value?.removeEventListener('message', onMessageReceived)
})

const translate = () => {
  worker.value?.postMessage({
    text: code.value,
    src_lang: langCode.value,
    targetLanguages: languages,
  })
}
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
              <!-- TODO: This should pass query as well -->
              <NuxtLink to="input">
                <ArrowLeftIcon class="h-11 cursor-pointer" />
              </NuxtLink>
              <h1
                class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Select output languages
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                Now select that language(s) to translate to. Our
                <a
                  class="underline"
                  href="https://huggingface.co/facebook/nllb-200-distilled-600M"
                  target="_blank"
                >
                  model
                </a>
                supports {{ languages.length }} languages. Please keep in mind
                that the time of task completion will vary depending on the
                number of languages you wish to translate to.
              </p>
            </div>

            <Button
              class="mt-10"
              :disabled="checkedLanguages.length <= 0"
              @click="translate"
            >
              {{ t('translate') }}
            </Button>

            <div class="mt-10">
              <label v-if="ready === false">
                Loading models... (only run once)
              </label>

              <div v-for="data in progressItems" :key="data.file">
                <Progress :model-value="data.progress" />
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
              <div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div
                  class="mx-auto max-w-2xl bg-opacity-95 md:mx-0 md:max-w-none"
                >
                  <LanguageSelector v-model="selectedLanguages" />
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
