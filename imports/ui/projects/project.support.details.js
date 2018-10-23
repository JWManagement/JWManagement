import { Template } from 'meteor/templating'

Template['project.support.details'].helpers({
  data: {
    getMethod: 'project.support.get',
    navigation: {
      backLink: 'project.details'
    },
    sections: [{
      title: 'title',
      contents: [{
        key: 'phone',
        type: 'phone',
        readonly: true
      }, {
        key: 'email',
        type: 'email',
        readonly: true
      }, {
        key: 'github',
        type: 'link',
        route: 'https://github.com/JWDeveloper/JWManagement/issues'
      }]
    }, {
      title: 'donate',
      contents: [{
        key: 'paypal',
        type: 'link',
        route: 'https://www.paypal.me/marvinzeising'
      }]
    }]
  }
})
