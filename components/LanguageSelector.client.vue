<script setup lang="ts">
import { type Language } from '@/lib/constants'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

interface Props {
  single?: boolean
}

const { single } = defineProps<Props>()
const languages = defineModel<Language[]>()
const emit = defineEmits(['languagesUpdated'])
const searchTerm = ref()

const toggleAllLanguages = (checkTo: boolean) => {
  languages.value.forEach(language => {
    language.checked = checkTo
  })
}

const handleToggle = (code: string) => {
  const language = languages.value?.find(l => l.code === code)

  if (language) {
    if (language.code === 'all' && !single) {
      toggleAllLanguages(!language.checked)
    } else if (single) {
      toggleAllLanguages(false)
      language.checked = !language.checked
    } else {
      language.checked = !language.checked
    }
  }
}

const checkedCount = computed(() => {
  if (languages.value && languages.value.length) {
    return languages.value.filter(l => l.checked).length
  }
})

const renderedLanguages = computed(() => {
  const searchedLanguages = languages.value?.filter(language =>
    language.title.toLowerCase().includes(searchTerm.value)
  )

  return searchedLanguages && searchedLanguages.length > 0
    ? searchedLanguages
    : single
    ? languages.value?.slice(1)
    : languages.value
})

watch(languages, () => {
  emit('languagesUpdated', languages)
})

onMounted(() => toggleAllLanguages(false))
</script>

<template>
  <fieldset>
    <legend
      class="flex justify-between items-end text-base font-semibold leading-6 text-gray-900 w-full pr-5"
    >
      <p>Language</p>
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            v-model="searchTerm"
            type="search"
            id="default-search"
            class="block w-full ps-10 text-sm font-normal text-black border border-gray-300 rounded-lg bg-white focus:ring-black focus:border-black"
            placeholder="Search languages"
            autocomplete="off"
            required
          />
        </div>
      </form>
      <p class="text-gray-500 font-medium text-xs" v-if="languages && !single">
        {{ `${checkedCount} / ${languages.length}` }}
      </p>
    </legend>

    <div
      class="max-h-screen min-h-screen overflow-y-scroll mt-4 divide-y divide-gray-200 border-b border-t border-gray-200 pr-5"
    >
      <div
        v-for="(language, index) in renderedLanguages"
        :key="language.code"
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
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            @change="() => handleToggle(language.code)"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>
