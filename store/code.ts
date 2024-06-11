import { defineStore } from 'pinia'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref<string | undefined>()
  const codeOutput = ref<string | undefined>()

  const setCode = (c: string) => {
    code.value = c
  }

  const setCodeOutput = (c: string) => {
    codeOutput.value = c
  }

  return { code, setCode, codeOutput, setCodeOutput }
})
