import { Template } from 'meteor/templating'

Template['project.search'].helpers({
  data: {
    entityId: 'projectId',
    backLink: 'dashboard.details',
    columns: [{
      name: '_id',
      visible: false
    }, {
      name: 'name',
      mobile: true
    }]
  }
})
