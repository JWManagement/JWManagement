import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import moment from 'moment';

import { doIfLoggedIn } from '/imports/framework/Managers/RouteManager.Helpers';
import RouteManager from '/imports/framework/Managers/RouteManager';

RouteManager.registerTranslatedPage('dashboard', {
  details: ''
});
RouteManager.registerTranslatedPage('dashboard.myProjects', {
  details: 'myProjects'
});
RouteManager.registerTranslatedPage('dashboard.missingShiftReports', {
  details: 'missingShiftReports'
});
RouteManager.registerTranslatedPage('project', {
  search: 'projects'
});
RouteManager.registerTranslatedPage('users.online', {
  details: 'users/online'
});
RouteManager.registerTranslatedPage('user', {
  search: 'users',
  details: 'user/:userId'
});
RouteManager.registerTranslatedPage('language', {
  details: 'language',
  update: 'language/:key'
});
RouteManager.registerEntity('project', {
  details: ''
});
RouteManager.registerEntity('publisher.password', {
  insert: 'publishers/:userId/password',
  forwarding: {
    route: 'publishers/:userId/password/forwarding',
    name: 'publisher.password.details',
    link: 'publisher.details'
  }
});
RouteManager.registerEntity('publisher.profile.availability', {
  insert: 'publishers/:userId/availability/:key/new',
  details: 'publishers/:userId/availability/:key'
});
RouteManager.registerEntity('publisher.profile.vacation', {
  insert: 'publishers/:userId/vacation/new',
  forwarding: {
    route: 'publishers/:userId/vacation/forwarding',
    name: 'publisher.profile.vacation.details',
    link: 'publisher.details'
  }
});
RouteManager.registerEntity('publisher', {
  search: 'publishers',
  insert: 'publishers/new',
  details: 'publishers/:userId',
  update: 'publishers/:userId/:key'
});
RouteManager.registerEntity('vessel', {
  search: 'vessels',
  insert: 'vessels/new',
  details: 'vessels/:vesselId',
  update: 'vessels/:vesselId/:key'
});
RouteManager.registerEntity('vessel.visit', {
  insert: 'vessels/:vesselId/visits/new',
  details: 'vessels/:vesselId/visits/:visitId',
  update: 'vessels/:vesselId/visits/:visitId/:key'
});
RouteManager.registerEntity('vessel.visit.language', {
  insert: 'vessels/:vesselId/visits/:visitId/languages/new',
  forwarding: {
    route: 'vessels/:vesselId/visits/:visitId/language/forwarding',
    name: 'vessel.visit.language.details',
    link: 'vessel.visit.details'
  }
});
RouteManager.registerEntity('note', {
  search: 'notes',
  insert: 'notes/new',
  details: 'notes/:noteId',
  update: 'notes/:noteId/:key'
});

FlowRouter.route('/:projectId/publisherActions', {
  name: 'publisherActions',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'publisherActions' });
    });
  }
});

FlowRouter.route('/:projectId/calendar/:year?/:month?/:day?', {
  name: 'calendar',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'calendar' });
    });
  }
});

FlowRouter.route('/:projectId/kb', {
  name: 'wiki',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'wiki' });
    });
  }
});

FlowRouter.route('/:projectId/shifts', {
  name: 'shifts',
  action: () => {
    doIfLoggedIn(() => {
      let parent = Session.get('parent');

      if (parent != 'settings') {
        Session.set('parent', 'project.details');
        Session.set('target', null);
      }

      BlazeLayout.render('mainLayout', { content: 'shifts' });
    });
  }
});

FlowRouter.route('/goToShift/:shiftId', {
  name: 'shift.details',
  action: () => {
    doIfLoggedIn(() => {
      Meteor.call('shift.getShiftOverview', {
        shiftId: FlowRouter.getParam('shiftId')
      }, (e, shift) => {
        const momentObj = moment(shift.date, 'YYYYDDD');
        const year = parseInt(momentObj.format('YYYY'), 10);
        const month = parseInt(momentObj.format('MM'), 10);
        const day = parseInt(momentObj.format('DD'), 10);

        FlowRouter.go('calendar', {
          projectId: shift.projectId,
          year: year,
          month: month,
          day: day
        }, {
          showShift: FlowRouter.getParam('shiftId')
        });
      });
    });
  }
});

FlowRouter.route('/:projectId/settings', {
  name: 'settings',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'settings' });
    });
  }
});

FlowRouter.route('/:projectId/reports', {
  name: 'reports',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'reports' });
    });
  }
});

FlowRouter.route('/:projectId/store', {
  name: 'store',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', 'project.details');
      BlazeLayout.render('mainLayout', { content: 'store' });
    });
  }
});
