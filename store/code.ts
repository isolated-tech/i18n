import { defineStore } from 'pinia'
import type { Language } from '~/lib/constants'

interface CodeOutput {
  [key: string]: string
}

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref<string | undefined>()
  const codeOutput = ref<CodeOutput>({})
  const inputLang = ref<Language>()

  const setCode = (c: string) => {
    code.value = c
  }

  const setCodeOutput = (l: Language, c: string) => {
    codeOutput.value[l.code] = c
  }

  const setInputLang = (lang: Language) => {
    inputLang.value = lang
  }

  onMounted(() => {
    if (!inputLang.value) {
      navigateTo('/get-started')
    } else if (inputLang.value && !code) {
      navigateTo('/input')
    }
  })

  return { code, setCode, codeOutput, setCodeOutput, inputLang, setInputLang }
})
