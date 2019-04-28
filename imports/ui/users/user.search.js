import { Template } from 'meteor/templating'

Template['user.search'].helpers({
  data: {
    entityId: 'userId',
    backLink: 'dashboard.details',
    columns: [{
      name: '_id',
      visible: false
    }, {
      name: 'profile_firstname',
      mobile: true
    }, {
      name: 'profile_lastname',
      mobile: true
    }, {
      name: 'username',
      mobile: true
    }, {
      name: 'profile_email',
      mobile: true
    }]
  }
})
