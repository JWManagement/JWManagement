import { Template } from 'meteor/templating'

Template.footer.helpers({
  getLanguage: () => {
    if ((navigator.language || navigator.userLanguage) === "de-DE") {
      return "de";
    }
    return "en";
  },
})