import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import Languages from '/imports/framework/Constants/Languages';

Template['vessel.visit.language.insert'].helpers({
  data: {
    backLink: 'vessel.visit.details',
    fields: [{
      key: 'languageIds',
      type: 'picker',
      allowedKeyValues: Languages.allowedValues
      .map((lang) => {
        return { key: lang, value: TAPi18n.__('language._' + lang) };
      })
      .sort((a, b) => {
        if (a.value < b.value) {return -1;}
        if (a.value > b.value) {return 1;}
        return 0;
      }),
      search: true,
      required: true
    }]
  }
});
