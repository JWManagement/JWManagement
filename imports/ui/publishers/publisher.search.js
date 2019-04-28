import { Template } from 'meteor/templating'

import Permissions from '../../framework/Constants/Permissions'

Template['publisher.search'].helpers({
  data: {
    entityId: 'userId',
    backLink: 'project.details',
    allowCreate: true,
    columns: [
      {
        name: '_id',
        visible: false
      }, {
        name: 'profile_firstname',
        mobile: true
      }, {
        name: 'profile_lastname',
        mobile: true
      }, {
        name: 'profile_email',
        mobile: true
      }, {
        name: 'profile_gender',
        mobile: true
      }, {
        name: 'status_lastLogin_date',
        type: 'date',
        format: 'YYYY-MM-DD',
        mobile: false
      }, {
        name: 'username',
        mobile: true
      }
    ]
  }
})
