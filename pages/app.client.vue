<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { js_beautify } from 'js-beautify'

const file = ref<string>()
const code = ref<string | undefined>("console.log('Hello, world!')")
const codeOutput = ref<string | undefined>()
const extensions = [json(), oneDark]
const worker = ref<Worker>()
const ready = ref()
const disabled = ref(false)
const progressItems = ref([])
const sourceLanguage = ref('eng_Latn')
const targetLanguage = ref('fra_Latn')
const { t } = useI18n()
const formattedCodeOutput = computed(() =>
  // JSON.stringify(codeOutput.value, null, 4)
  js_beautify(codeOutput.value, options)
)
const options = { indent_size: 2, space_in_empty_paren: true }

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
      codeOutput.value = e.data.output
      break

    case 'complete':
      handleDownload(JSON.stringify(e.data.output), 'i18n.json')

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
  <div class="mt-10 h-screen">
    <div class="flex flex-col w-screen">
      <div class="flex flex-col items-center justify-center gap-8">
        <div class="flex gap-2">
          <FileInput
            class="w-auto cursor-pointer"
            @file-change="content => handleFileContents(content)"
          />
          <Button :disabled @click="translate">{{ t('translate') }}</Button>
        </div>

        <div>
          <label v-if="ready === false"
            >Loading models... (only run once)</label
          >

          <div v-for="data in progressItems" :key="data.file">
            <Progress :model-value="data.progress" />
          </div>
        </div>
      </div>

      <div class="flex gap-5 mt-10">
        <div class="w-1/2 h-full">
          <Codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '100vh' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @ready="handleReady"
          />
        </div>

        <div class="w-1/2 h-full">
          <Codemirror
            :model-value="formattedCodeOutput"
            placeholder="Output"
            :style="{ height: '100vh' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @ready="handleReady"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cm-editor {
  @apply !w-full;
}
</style>
