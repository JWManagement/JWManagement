import { Template } from 'meteor/templating';

Template['dashboard.myProjects.details'].helpers({
  data: {
    getMethod: 'dashboard.myProjects.get',
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'myProjects',
      contents: [{
        key: 'myProjects',
        type: 'array',
        item: {
          key: 'project',
          type: 'link',
          icon: 'group',
          action: {
            type: 'route',
            route: 'project.details'
          }
        }
      }]
    }]
  }
});
