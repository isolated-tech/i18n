import { defineStore } from 'pinia'
import { languages as baseLanguages, type Language } from '~/lib/constants'

export const useLangStore = defineStore('langStore', () => {
  const languages = ref<Language[]>(baseLanguages)
  const inputLanguage = ref<Language>()
  const outputLanguages = ref<Language[]>([])

  const setInputLanguage = (lang: Language) => {
    inputLanguage.value = lang
  }

  const setOutputLanguages = (languages: Language[]) => {
    outputLanguages.value = languages
  }

  const toggleAllLanguages = (checkTo: boolean) => {
    languages.value.forEach(language => {
      language.checked = checkTo
    })
  }

  const resetOutputLanguages = () => {
    toggleAllLanguages(false)
  }

  const checkedLanguages = computed(() => {
    return languages.value.filter(language => language.checked)
  })

  return {
    languages,
    inputLanguage,
    setInputLanguage,
    outputLanguages,
    setOutputLanguages,
    checkedLanguages,
    resetOutputLanguages,
    toggleAllLanguages,
  }
})
