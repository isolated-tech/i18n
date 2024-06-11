import { defineStore } from 'pinia'
import type { Language } from '~/lib/constants'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref<string | undefined>()
  const codeOutput = ref<string | undefined>()
  const inputLang = ref<Language>()

  const setCode = (c: string) => {
    code.value = c
  }

  const setCodeOutput = (c: string) => {
    codeOutput.value = c
  }

  const setInputLang = (lang: Language) => {
    inputLang.value = lang
  }

  return { code, setCode, codeOutput, setCodeOutput, inputLang, setInputLang }
})
