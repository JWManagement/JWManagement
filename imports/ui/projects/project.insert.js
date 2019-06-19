import { Template } from 'meteor/templating'

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
