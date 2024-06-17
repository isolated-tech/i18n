<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import type { Language } from '@/lib/constants'
import { useLangStore } from '@/store/language'
import { useToast } from '@/components/ui/toast/use-toast'

interface Props {
  single?: boolean
}

const { toast } = useToast()
const { t } = useI18n()

const langStore = useLangStore()
const { resetLanguages, toggleAllLanguages } = langStore
const { languages, checkedLanguages } = storeToRefs(langStore)

const { single } = defineProps<Props>()
const emit = defineEmits(['languagesUpdated'])
const searchTerm = ref()

const { data } = useAuth()
const isSubbed = computed(() => data.value?.user.is_subscribed)
const freeTierLimit = computed(
  () => !isSubbed.value && checkedLanguages.value.length >= 2
)

const handleToggle = (language: Language) => {
  if (language) {
    if (language.code === 'all' && !isSubbed.value) {
      allDisabledToast()
    } else if (language.code === 'all' && !single) {
      toggleAllLanguages(!language.checked)
    } else if (single) {
      toggleAllLanguages(false)
      language.checked = !language.checked
    } else if (!language.checked && freeTierLimit.value) {
      freeTierToast()
      language.checked = false
    } else {
      language.checked = !language.checked
    }
  }
}

const freeTierToast = () => {
  toast({
    title: t('languageSelector.limitReached'),
    description: t('languageSelector.limitedToTwo'),
  })
}

const allDisabledToast = () => {
  toast({
    title: t('languageSelector.disabled'),
    description: t('languageSelector.translatingAllRequiredPaid'),
  })
}

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

onMounted(() => {
  resetLanguages()
})

watch(freeTierLimit, (newVal, oldVal) => {
  if (newVal === true) {
    freeTierToast()
  }
})
</script>

<template>
  <fieldset>
    <legend
      class="flex justify-between items-end text-base font-semibold leading-6 text-gray-900 w-full pr-5"
    >
      <p>{{ $t('languageSelector.language') }}</p>
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          {{ $t('languageSelector.search') }}
        </label>
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
            :placeholder="$t('searchLanguages')"
            autocomplete="off"
            required
          />
        </div>
      </form>
      <p class="text-gray-500 font-medium text-xs" v-if="languages && !single">
        {{ `${checkedLanguages.length} / ${languages.length}` }}
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
            :disabled="!language.checked && freeTierLimit"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            :class="{
              'cursor-pointer': language.checked && freeTierLimit,
            }"
            @change="() => handleToggle(language)"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>
