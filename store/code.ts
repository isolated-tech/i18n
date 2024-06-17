import { defineStore } from 'pinia'
import type { Language } from '@/lib/constants'

interface CodeOutput {
  [key: string]: string
}

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref<string | undefined>()
  const codeOutput = ref<CodeOutput>({})

  const setCode = (c: string) => {
    code.value = c
  }

  const setCodeOutput = (l: Language, c: string) => {
    codeOutput.value[l.code] = c
  }

  const getCodeOutput = (l: Language) => {
    return JSON.stringify(codeOutput.value[l.code])
  }

  return { code, setCode, codeOutput, setCodeOutput, getCodeOutput }
})
