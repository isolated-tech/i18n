import eng_Latn from './i18n/eng_Latn.json'
import fra_Latn from './i18n/fra_Latn.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: eng_Latn,
    fr: fra_Latn,
  },
}))
