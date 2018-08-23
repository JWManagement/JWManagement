import { Template } from 'meteor/templating';

Template['dashboard.upcomingShifts.details'].helpers({
  data: {
    getMethod: 'dashboard.upcomingShifts.get',
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'upcomingShifts',
      contents: [{
        key: 'upcomingShifts',
        type: 'array',
        item: {
          key: 'shift',
          link: 'shift.details',
          icon: 'event_available',
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
});
