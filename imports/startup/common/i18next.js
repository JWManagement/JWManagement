import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../../i18n/en/_export'
import de from '../../i18n/de/_export'
import fi from '../../i18n/fi/_export'
import fr from '../../i18n/fr/_export'
import hu from '../../i18n/hu/_export'
import it from '../../i18n/it/_export'
import pl from '../../i18n/pl/_export'
import pt from '../../i18n/pt/_export'
import ru from '../../i18n/ru/_export'
import zhTW from '../../i18n/zh-TW/_export'
import zhCN from '../../i18n/zh-CN/_export'

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      de: { translation: de },
      fi: { translation: fi },
      fr: { translation: fr },
      hu: { translation: hu },
      it: { translation: it },
      pl: { translation: pl },
      pt: { translation: pt },
      ru: { translation: ru },
      'zh-TW': { translation: zhTW },
      'zh-CN': { translation: zhCN }
    }
  })
