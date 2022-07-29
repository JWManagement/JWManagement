import { Template } from 'meteor/templating'
import i18next from 'i18next'

Template.footer.helpers({
  getLanguage: () => i18next.languages.find(lang => ['de', 'en'].find(lng => lang === lng)) || 'en'
})
