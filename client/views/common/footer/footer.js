import { Template } from 'meteor/templating'
import i18next from 'i18next'

Template.footer.helpers({
  getLanguage: () => {
    let languageShort = i18next.language.substring(0, 2);

    if (['de', 'en'].includes(languageShort)) {
      return languageShort;
    }

    if ((navigator.language || navigator.userLanguage || '').startsWith('de')) {
      return 'de';
    }

    return 'en';
  },
})
