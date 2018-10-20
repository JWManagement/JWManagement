import { Template } from 'meteor/templating'

Template['publisher.profile.vacation.insert'].helpers({
  data: {
    backLink: 'publisher.details',
    entityKey: 'vacationId',
    fields: [{
      key: 'start',
      type: 'date',
      format: 'YYYYMMDD',
      required: true
    }, {
      key: 'end',
      type: 'date',
      format: 'YYYYMMDD',
      required: true
    }]
  }
})
