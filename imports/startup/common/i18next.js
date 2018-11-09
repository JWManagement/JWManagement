import i18next from 'i18next'
import en from '../../i18n/en/en'

i18next.init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en
    }
  }
})
