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
    }]
  }
})

Template['project.insert'].events({})
