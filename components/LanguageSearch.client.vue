<script setup lang="ts">
import { type Language } from '@/lib/constants'

interface Props {
  languages: Language[]
}

defineProps<Props>()
</script>

<template>
  <Command :default-open="false">
    <CommandInput :placeholder="$t('inputPlaceholder')" />
    <CommandList>
      <CommandEmpty>{{ $t('noResults') }}</CommandEmpty>
      <CommandGroup heading="Languages">
        <CommandItem v-for="language in languages" :value="language.code">
          {{ language.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
