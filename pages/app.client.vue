<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { js_beautify } from 'js-beautify'
import { type Language, languages as languagesConst } from '@/lib/constants'

const file = ref<string>()
const code = ref<string | undefined>("console.log('Hello, world!')")
const codeOutput = ref<string | undefined>()
const extensions = [json(), oneDark]
const worker = ref<Worker>()
const ready = ref()
const disabled = ref(false)
const progressItems = ref([])
const sourceLanguage = ref<Language>()
const targetLanguage = ref('fra_Latn')
const { t } = useI18n()
const languages = ref<string[]>([])
const language = ref<string>()
const selectedLanguages = ref<Language[]>(languagesConst)
const otherCode = ref()

const setL = (l: string) => {
  language.value = l
  otherCode.value = JSON.stringify(JSON.parse(codeOutput.value)[language.value])
}

const checkedLanguages = computed(() => {
  return selectedLanguages.value.filter(language => language.checked)
})

const formattedCodeOutput = computed(() => {
  if (otherCode.value) {
    return js_beautify(otherCode.value, {
      indent_size: 2,
      space_in_empty_paren: true,
    })
  }
})

const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}

const handleFileContents = (e: any) => {
  file.value = e
}

watch(file, (newVal, _oldVal) => (code.value = newVal))

const handleDownload = (fileContent: string, fileName: string) => {
  const element = document.createElement('a')
  const file = new Blob([fileContent], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = fileName
  document.body.appendChild(element) // Required for Firefox
  element.click()
  document.body.removeChild(element)
}

// Create a callback function for messages from the worker thread.
const onMessageReceived = e => {
  switch (e.data.status) {
    case 'initiate':
      // Model file start load: add a new progress item to the list.
      ready.value = false
      // setProgressItems(prev => [...prev, e.data])
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
  if (!worker.value) {
    worker.value = new Worker(new URL('../assets/worker.js', import.meta.url), {
      type: 'module',
    })
  }

  worker.value.addEventListener('error', error => {
    console.error('Error creating worker:', error)
  })

  // Attach the callback function as an event listener.
  worker.value.addEventListener('message', onMessageReceived)
})

onUnmounted(() => {
  // Define a cleanup function for when the component is unmounted.
  worker.value?.removeEventListener('message', onMessageReceived)
})

const translate = () => {
  worker.value?.postMessage({
    text: code.value,
    src_lang: sourceLanguage.value,
    tgt_lang: targetLanguage.value,
  })
}
</script>

<template>
  <div class="h-screen">
    <div class="flex flex-col w-screen">
      <div class="grid grid-cols-2 gap-10">
        <!-- Input -->
        <div class="h-full flex flex-col my-2 ml-2">
          <div class="flex">
            <div class="relative w-full md:pr-0">
              <div class="mx-auto w-full max-w-2xl md:mx-0 md:max-w-none">
                <div class="w-full overflow-hidden rounded-t-xl bg-[#282C34]">
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div
                      class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
                    ></div>
                    <button
                      class="bg-[#282C34] border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white"
                    >
                      eng_Latn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Codemirror
            v-model="code"
            placeholder="Paste your JSON here..."
            :style="{
              height: '94svh',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
            }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @ready="handleReady"
          />
        </div>

        <!-- Output -->
        <div class="h-full flex flex-col">
          <div v-if="language" class="mt-2">
            <div class="flex">
              <div class="relative md:pr-0">
                <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div
                    class="w-screen overflow-hidden rounded-tl-xl bg-[#282C34]"
                  >
                    <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div
                        class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
                      ></div>
                      <button
                        v-for="(l, index) in languages"
                        @click="() => setL(l)"
                        :class="{
                          'rounded-tl-md': index === 0,
                          'bg-[#282C34] border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white':
                            language === l,
                          'bg-[#282C34] border-r border-gray-600/10 px-4 py-2 text-white':
                            language !== l,
                        }"
                      >
                        {{ l }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Codemirror
              :model-value="formattedCodeOutput"
              placeholder="Output"
              :style="{ height: '100vh' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              :class="{
                'rounded-bl': true,
              }"
              @ready="handleReady"
            />
          </div>

          <div class="flex flex-col h-full justify-around">
            <div v-if="checkedLanguages.length <= 0">
              <LanguageSelector v-model="selectedLanguages" />
            </div>
            <!-- <div class="flex flex-col">
              <div class="flex gap-2">
                <FileInput
                  class="w-auto cursor-pointer"
                  @file-change="content => handleFileContents(content)"
                />
                <Button :disabled @click="translate">{{
                  t('translate')
                }}</Button>
              </div>

              <div>
                <label v-if="ready === false">
                  Loading models... (only run once)
                </label>

                <div v-for="data in progressItems" :key="data.file">
                  <Progress :model-value="data.progress" />
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cm-editor {
  @apply !w-full;
}

.ͼo.cm-gutter {
  border-bottom-left-radius: 10px !important;
}
.cm-gutter.cm-foldGutter {
  border-bottom-left-radius: 10px !important;
}

.cm-scroller {
  border-bottom-left-radius: 10px !important;
}

body
  > div
  > div
  > div
  > div
  > div.h-full.flex.flex-col.my-2.ml-2
  > div.v-codemirror
  > div
  > div.cm-scroller
  > div.cm-content
  > div
  > span.ͼq {
  color: #9cdcfe !important;
}

body
  > div
  > div
  > div
  > div
  > div.h-full.flex.flex-col.my-2.ml-2
  > div.v-codemirror
  > div
  > div.cm-scroller
  > div.cm-content
  > div
  > span.ͼ13 {
  color: #ce9178 !important;
}
/* #101827 */
</style>
