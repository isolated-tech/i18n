<script setup lang="ts">
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const { t, locale, locales, setLocale } = useI18n()
const localeName = computed(
  () => locales.value.find(l => l.code === locale.value)?.name
)
</script>

<template>
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">
        {{ t('i18nLanguageSelector.language') }}
      </h3>
      <div className="mt-4">
        <Select @update:model-value="setLocale">
          <SelectTrigger
            className="w-full border flex items-center px-2 py-1 rounded justify-between"
          >
            <SelectValue
              class="text-sm font-medium"
              :placeholder="localeName"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="locale in locales"
              :key="locale.code"
              :value="locale.code"
            >
              {{ locale.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>
