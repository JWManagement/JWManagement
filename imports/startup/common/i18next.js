import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../../i18n/en/_export'
import de from '../../i18n/de/_export'
import it from '../../i18n/it/_export'
import zhTW from '../../i18n/zh-TW/_export'
import zhCN from '../../i18n/zh-CN/_export'

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      de: { translation: de },
      it: { translation: it },
      'zh-TW': { translation: zhTW },
      'zh-CN': { translation: zhCN }
    }
  })
