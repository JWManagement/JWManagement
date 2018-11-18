import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../../i18n/en/_export'
import de from '../../i18n/de/_export'

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      de: { translation: de }
    }
  })
