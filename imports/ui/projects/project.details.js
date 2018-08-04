import Permissions from '/imports/api/util/Permissions.js';

Template['project.details'].helpers({
  data: {
  getMethod: 'project.get',
  navigation: {
    backLink: 'dashboard.details',
    navbarStyle: 'flat',
    hideTitle: true
  },
  sections: [{
    type: 'header',
    title: 'name',
    description: 'news_text'
  }, {
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
      custom: (project) => {
        return project.vesselModule == true;
      }
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
      icon: 'people',
      canSee: Permissions.admin
    }, {
      key: 'reports',
      type: 'link',
      route: 'reports',
      icon: 'question_answer',
      canSee: Permissions.shiftAndStoreAdmin
    }, {
      key: 'store',
      type: 'link',
      route: 'store',
      icon: 'storage',
      canSee: Permissions.storeAdmin
    }, {
      key: 'notes',
      type: 'link',
      route: 'note.details',
      icon: 'note',
      canSee: Permissions.shiftAndStoreAdmin
    }]
  }, {
    title: 'participation',
    contents: [{
      key: 'leave',
      type: 'link',
      route: 'project.leave.insert',
      icon: 'meeting_room'
    }]
  }]
  }
});
