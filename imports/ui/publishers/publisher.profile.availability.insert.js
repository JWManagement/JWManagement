import { Template } from 'meteor/templating'

import Hour from '/imports/framework/Constants/Hour'

Template['publisher.profile.availability.insert'].helpers({
  data: {
    backLink: 'publisher.profile.availability.details',
    entityKey: 'availabilityId',
    fields: [{
      key: 'start',
      type: 'picker',
      allowedValues: Hour.allowedValues,
      defaultValue: Hour.defaultValue,
      required: true
    }, {
      key: 'end',
      type: 'picker',
      allowedValues: Hour.allowedValues,
      defaultValue: Hour.defaultValue,
      required: true
    }]
  }
})
