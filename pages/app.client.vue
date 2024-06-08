<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

const file = ref<string>()
const code = ref("console.log('Hello, world!')")
const extensions = [json(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = payload => {
  view.value = payload.view
}

const handleFileContents = (e: any) => {
  file.value = e
}

watch(file, (newVal, _oldVal) => (code.value = newVal))

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
  // more state info ...
  // return ...
}
</script>

<template>
  <div class="max-w-4xl mx-auto h-screen">
    <FileInput @file-change="content => handleFileContents(content)" />

    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />
  </div>
</template>

<style scoped>
.cm-editor {
  @apply !w-full;
}
</style>
