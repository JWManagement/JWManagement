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
        key: 'discord',
        type: 'link',
        route: 'https://discord.com/invite/S6DZyRVury',
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
        route: 'https://www.paypal.com/donate/?hosted_button_id=UPK5UN546TR8J',
        outbound: true
      }, {
        key: 'iban',
        type: 'text',
        readonly: true
      }]
    }]
  }
})
