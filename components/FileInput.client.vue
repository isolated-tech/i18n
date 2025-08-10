<script setup lang="ts">
const emit = defineEmits(['fileChange'])

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    emit('fileChange', {
      code: e.target?.result,
      type: file.type === '' ? 'ts' : file.type,
    })
  }

  reader.readAsText(file)
}
</script>

<template>
  <Input id="picture" type="file" accept="json" @change="handleFileChange" />
</template>
