import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
  data: {
    getMethod: 'dashboard.get',
    navigation: {},
    sections: [{
      title: 'myProjects',
      contents: [{
        key: 'myProjects',
        icon: 'group',
        type: [{
          key: 'project',
          click: {
            type: 'link',
            link: 'project.details'
          }
        }]
      }]
    }, {
      title: 'missingShiftReports',
      contents: [{
        key: 'missingShiftReports',
        icon: 'announcement',
        type: [{
          key: 'shift',
          link: 'shift.details',
          type: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }]
      }]
    }, {
      title: 'upcomingShifts',
      contents: [{
        key: 'upcomingShifts',
        icon: 'event_available',
        type: [{
          key: 'shift',
          link: 'shift.details',
          type: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }]
      }]
    }, {
      title: 'pendingRequests',
      contents: [{
        key: 'pendingRequests',
        icon: 'hourglass_empty',
        type: [{
          key: 'shift',
          link: 'shift.details',
          type: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }]
      }]
    }, {
      title: 'olderShifts',
      contents: [{
        key: 'olderShifts',
        icon: 'event_available',
        type: [{
          key: 'shift',
          link: 'shift.details',
          type: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'time',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }]
      }]
    }, {
      title: 'administration',
      contents: [{
        key: 'profile',
        type: 'link',
        route: 'profile',
        icon: 'account_circle'
      }, {
        key: 'language',
        type: 'link',
        route: 'language.details',
        icon: 'translate'
      }, {
        key: 'projects',
        type: 'link',
        route: 'project.search',
        icon: 'view_module',
        canSee: Permissions.support
      }, {
        key: 'users',
        type: 'link',
        route: 'user.search',
        icon: 'group',
        canSee: Permissions.support
      }]
    }, {
      title: 'account',
      contents: [{
        key: 'oldDashboard',
        type: 'link',
        route: 'home',
        icon: 'dashboard',
        canSee: Permissions.admin
      }, {
        key: 'logout',
        type: 'link',
        route: 'logout',
        icon: 'power_settings_new'
      }]
    }]
  }
});
