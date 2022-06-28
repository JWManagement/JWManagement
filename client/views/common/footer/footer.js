import { Template } from 'meteor/templating'

Template.footer.helpers({
  getLanguage: () => {
    if ((navigator.language || navigator.userLanguage || '').startsWith('de')) {
      return "de";
    }
    return "en";
  },
})