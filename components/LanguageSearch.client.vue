<script setup lang="ts">
import { type Language } from '@/lib/constants'

interface Props {
  languages: Language[]
}

defineProps<Props>()
</script>

<template>
  <Command :default-open="false">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Languages">
        <CommandItem v-for="language in languages" :value="language.code">
          {{ language.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
