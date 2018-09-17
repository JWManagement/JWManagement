import { Template } from 'meteor/templating';

Template['publisher.permissions.tag.details'].helpers({
  data: {
    getMethod: 'publisher.permissions.tags.get',
    navigation: {
      backLink: 'publisher.permissions.details'
    },
    sections: [{
      title: 'permissions.tag',
      contents: [{
        key: 'role',
        type: 'dropdown'
      }]
    }]
  }
});
