import { defineStore } from 'pinia'
import { languages as baseLanguages, type Language } from '~/lib/constants'

export const useLangStore = defineStore('langStore', () => {
  const languages = ref<Language[]>(baseLanguages)
  const inputLanguage = ref<Language>()
  const outputLanguages = ref<Language[]>([])

  const setLanguage = (r: Ref<any>, lang: Language) => {
    r.value = lang
  }

  const setLanguages = (languages: Language[]) => {
    outputLanguages.value = languages
  }

  const toggleAllLanguages = (checkTo: boolean) => {
    languages.value.forEach((language: Language) => {
      language.checked = checkTo
    })
  }

  const resetLanguages = () => {
    toggleAllLanguages(false)
  }

  const checkedLanguages = computed(() => {
    return languages.value.filter((language: Language) => language.checked)
  })

  return {
    languages,
    inputLanguage,
    setLanguage,
    outputLanguages,
    setLanguages,
    checkedLanguages,
    resetLanguages,
    toggleAllLanguages,
  }
})
