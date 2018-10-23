import { Template } from 'meteor/templating'

Template['dashboard.missingShiftReports.details'].helpers({
  data: {
    getMethod: 'dashboard.missingShiftReports.get',
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'missingShiftReports',
      contents: [{
        key: 'missingShiftReports',
        type: 'array',
        item: {
          key: 'shift',
          link: 'shift.details',
          icon: 'announcement',
          type: 'entity',
          rows: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }
      }]
    }]
  }
})
