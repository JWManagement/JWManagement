import { Template } from 'meteor/templating';

Template['users.online.details'].helpers({
  data: {
    getMethod: 'users.online.get',
    refreshRateInSeconds: 1,
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'users.online',
      contents: [{
        key: 'onlineUsers',
        type: 'array',
        item: {
          key: 'user',
          type: 'link',
          icon: 'check',
          action: {
            type: 'route',
            route: 'user.details'
          }
        }
      }]
    }, {
      title: 'users.idle',
      contents: [{
        key: 'idleUsers',
        type: 'array',
        item: {
          key: 'user',
          type: 'link',
          icon: 'hourglass_empty',
          action: {
            type: 'route',
            route: 'user.details'
          }
        }
      }]
    }]
  }
});
