import { defineStore } from 'pinia'

export const useCodeStore = defineStore('codeStore', () => {
  const code = ref<string | undefined>()

  const setCode = (c: string) => {
    code.value = c
  }

  return { code, setCode }
})
