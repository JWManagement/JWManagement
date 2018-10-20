import { Template } from 'meteor/templating'

import Permissions from '../../framework/Constants/Permissions'

Template['publisher.permissions.details'].helpers({
  data: {
    getMethod: 'publisher.permissions.get',
    navigation: {
      backLink: 'publisher.details'
    },
    sections: [{
      title: 'permissions.project',
      contents: [{
        key: 'project',
        type: 'dropdown',
        allowedValues: Permissions.member
      }]
    }, {
      title: 'permissions.tags',
      contents: [{
        key: 'tags',
        type: 'array',
        item: {
          key: 'tag',
          link: 'publisher.permissions.tag.details',
          type: 'entity',
          rows: [{
            key: 'tag',
            type: 'text'
          }, {
            key: 'role',
            type: 'text'
          }]
        }
      }]
    }]
  }
})
