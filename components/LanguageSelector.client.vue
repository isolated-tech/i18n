<script setup lang="ts">
import { type Language } from '@/lib/constants'

interface Props {
  single?: boolean
}

defineProps<Props>()
const languages = defineModel<Language[]>()
const emit = defineEmits(['languagesUpdated'])

const toggleAllLanguages = () => {
  const checkTo = !languages.value[0].checked

  languages.value.forEach(language => {
    language.checked = checkTo
  })
}

const handleToggle = (index: number) => {
  if (index === 0) {
    toggleAllLanguages()
  } else {
    const language = languages.value[index]
    language.checked = !language.checked
  }
}

const checkedCount = computed(() => {
  if (languages.value && languages.value.length) {
    return languages.value.filter(l => l.checked).length
  }
})

watch(languages, () => {
  emit('languagesUpdated', languages)
})
</script>

<template>
  <fieldset>
    <legend
      class="flex justify-between text-base font-semibold leading-6 text-gray-900 w-full pr-5"
    >
      <p>Language</p>
      <p class="text-gray-500 font-medium text-xs" v-if="languages">
        {{ `${checkedCount} / ${languages.length}` }}
      </p>
    </legend>

    <div
      class="max-h-96 overflow-y-scroll mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 pr-5"
    >
      <div
        v-for="(language, index) in languages"
        :key="index"
        class="relative flex items-start py-4"
      >
        <div class="min-w-0 flex-1 text-sm leading-6">
          <label
            :for="language.code"
            class="select-none font-medium text-gray-900"
          >
            {{ language.title }}
          </label>
        </div>
        <div class="ml-3 flex h-6 items-center">
          <input
            :id="language.code"
            :name="language.code"
            :checked="language.checked"
            :disabled="index === 0 && single"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            @change="() => handleToggle(index)"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>
