import { Template } from 'meteor/templating'

Template['project.support.details'].helpers({
  data: {
    getMethod: 'project.support.get',
    navigation: {
      backLink: 'project.details'
    },
    sections: [{
      title: 'support',
      contents: [{
        key: 'supportText',
        type: 'textbox',
        readonly: true
      }, {
        key: 'phone',
        type: 'phone',
        readonly: true
      }, {
        key: 'discord',
        type: 'link',
        route: 'https://discord.gg/Te9TKD8',
        outbound: true
      }, {
        key: 'github',
        type: 'link',
        route: 'https://github.com/JWDeveloper/JWManagement/issues',
        outbound: true
      }]
    }, {
      title: 'donate',
      contents: [{
        key: 'donateText',
        type: 'textbox',
        readonly: true
      }, {
        key: 'paypal',
        type: 'link',
        route: 'https://www.paypal.me/marvinzeising',
        outbound: true
      }, {
        key: 'iban',
        type: 'text',
        readonly: true
      }]
    }]
  }
})
