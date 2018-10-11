import { Template } from 'meteor/templating'

Template['project.insert'].helpers({
  data: {
    backLink: 'dashboard.details',
    entityKey: 'project',
    fields: [{
      key: 'projectName',
      required: true
    }, {
      key: 'projectEmail',
      required: true
    }, {
      key: 'language'
    }]
  },
  actions: [{
    key: 'create',
    type: 'confirm',
    style: 'info'
  }]
})

Template['project.insert'].events({})
