import { Template } from 'meteor/templating';

import Languages from '/imports/framework/Constants/Languages';

Template['publisher.permissions.tag.details'].helpers({
  data: {
    getMethod: 'publisher.permissions.tag.get',
    navigation: {
      backLink: 'publisher.permissions.details'
    },
    sections: [{
      title: 'permissions.tag',
      type: 'header',
      contents: [{
        key: 'gender',
        type: 'dropdown',
        linkedKey: 'profile_gender', // OPTIONAL
        icon: 'group' // OPTIONAL
      }]
    }]
  }
});
