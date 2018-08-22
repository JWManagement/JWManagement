import { Template } from 'meteor/templating';

Template['users.online.details'].helpers({
  data: {
    getMethod: 'users.online.get',
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'users',
      contents: [{
        key: 'users',
        type: 'array',
        item: {
          key: 'user',
          type: 'link',
          icon: 'person',
          action: {
            type: 'route',
            route: 'user.details'
          }
        }
      }]
    }]
  }
});
