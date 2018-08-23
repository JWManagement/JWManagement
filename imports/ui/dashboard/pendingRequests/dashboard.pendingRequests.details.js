import { Template } from 'meteor/templating';

Template['dashboard.pendingRequests.details'].helpers({
  data: {
    getMethod: 'dashboard.pendingRequests.get',
    navigation: {
      backLink: 'dashboard.details',
    },
    sections: [{
      title: 'pendingRequests',
      contents: [{
        key: 'pendingRequests',
        type: 'array',
        item: {
          key: 'shift',
          icon: 'hourglass_empty',
          link: 'shift.details',
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
