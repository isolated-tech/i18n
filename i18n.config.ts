import eng_Latn from './i18n/eng_Latn.json'
import fra_Latn from './i18n/fra_Latn.json'
import hin_Deva from './i18n/hin_Deva.json'
import jpn_Jpan from './i18n/jpn_Jpan.json'
import spa_Latn from './i18n/spa_Latn.json'
import zho_Hans from './i18n/zho_Hans.json'
import zho_Hant from './i18n/zho_Hant.json'
import deu_Latn from './i18n/deu_Latn.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    eng_Latn: eng_Latn,
    fra_Latn: fra_Latn,
    hin_Deva: hin_Deva,
    jpn_Jpan: jpn_Jpan,
    spa_Latn: spa_Latn,
    zho_Hans: zho_Hans,
    zho_Hant: zho_Hant,
    deu_Latn: deu_Latn,
  },
}))
