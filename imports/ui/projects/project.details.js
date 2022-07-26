import { Template } from 'meteor/templating'

import Permissions from '../../framework/Constants/Permissions'

Template['project.details'].helpers({
  data: {
    getMethod: 'project.get',
    navigation: {
      backLink: 'dashboard.details',
      navbarStyle: 'flat',
      hideTitle: true
    },
    header: {
      title: 'name',
      description: 'news_text'
    },
    sections: [{
      title: 'modules',
      contents: [{
        key: 'calendar',
        type: 'link',
        route: 'calendar',
        icon: 'today',
        canSee: Permissions.member
      }, {
        key: 'shifts',
        type: 'link',
        route: 'shifts',
        icon: 'date_range',
        canSee: Permissions.member
      }, {
        key: 'knowledgeBase',
        type: 'link',
        route: 'wiki',
        icon: 'school',
        canSee: Permissions.member
      }, {
        key: 'vessels',
        type: 'link',
        route: 'vessel.search',
        icon: 'directions_boat',
        canSee: Permissions.member,
        custom: project => project.vesselModule
      }]
    }, {
      title: 'administration',
      contents: [{
        key: 'settings',
        type: 'link',
        route: 'settings',
        icon: 'settings',
        canSee: Permissions.shiftAdmin
      }, {
        key: 'publishers',
        type: 'link',
        route: 'publisher.search',
        icon: 'person',
        canSee: Permissions.admin
      }, {
        key: 'publisherActions',
        type: 'link',
        route: 'publisherActions',
        icon: 'people',
        canSee: Permissions.admin
      }, {
        key: 'supportPage',
        type: 'link',
        route: 'project.support.details',
        icon: 'help',
        canSee: Permissions.admin
      }]
    }, {
      title: 'participation',
      contents: [],
      actions: [{
        key: 'leave',
        type: 'confirm',
        style: 'danger',
        method: 'project.leave',
        route: 'dashboard.details',
        icon: 'meeting_room'
      }]
    }]
  }
})
