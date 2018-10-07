import { Template } from 'meteor/templating'

import Permissions from '/imports/framework/Constants/Permissions'

Template['publisher.permissions.tag.update'].helpers({
  data: {
    getMethod: 'publisher.permissions.tag.get',
    backLink: 'publisher.permissions.details',
    fields: [{
      key: 'role',
      type: 'picker',
      allowedValues: Permissions.participantWithNone
    }]
  }
})
