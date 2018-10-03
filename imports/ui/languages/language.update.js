import { Template } from 'meteor/templating'

import SystemLanguages from '/imports/framework/Constants/SystemLanguages'

Template['language.update'].helpers({
  data: {
    getMethod: 'language.get',
    backLink: 'language.details',
    fields: [{
      key: 'language',
      type: 'picker',
      allowedValues: SystemLanguages.allowedValues
    }]
  }
})
