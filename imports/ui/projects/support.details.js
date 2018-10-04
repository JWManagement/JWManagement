import { Template } from 'meteor/templating';

Template['support.details'].helpers({
  data: {
    navigation: {
      backLink: 'project.details'
    },
    sections: [{
      title: 'title',
      contents: [{
        key: 'title',
        type: 'content',
        readonly: true
      }]
    }]
  }
});
