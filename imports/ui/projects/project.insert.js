import { Template } from 'meteor/templating'

import SystemLanguages from '../../framework/Constants/SystemLanguages'

Template['project.insert'].helpers({
  data: {
    backLink: 'dashboard.details',
    entityKey: 'project',
    fields: [{
      key: 'name',
      required: true
    }, {
      key: 'email',
      required: true
    }, {
      key: 'language',
      type: 'picker',
      allowedValues: SystemLanguages.allowedValues,
      defaultValue: SystemLanguages.defaultValue,
      required: true
    }]
  },
  actions: [{
    key: 'create',
    type: 'confirm',
    style: 'info'
  }]
})

Template['project.insert'].events({})
