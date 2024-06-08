import en_US from './i18n/en_US.json'
import fr_FR from './i18n/fr_FR.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: en_US,
    fr: fr_FR,
  },
}))
