import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { wrs } from '/imports/framework/Functions/Async';
import { doIfLoggedIn } from '/imports/framework/Managers/RouteManager.Helpers';

FlowRouter.route('/profile', {
  name: 'profile',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('target', null);
      Session.set('parent', 'dashboard.details');
      BlazeLayout.render('mainLayout', { content: 'profile' });
    });
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  action: () => {
    const language = Meteor.user().profile.language;

    BlazeLayout.render('blankLayout', { content: 'logout' });

    Meteor.logout(() => {
      wrs(() => {
        FlowRouter.go('welcome', { language: language });
      });
    });
  }
});

FlowRouter.route('/oldDashboard', {
  name: 'home',
  action: () => {
    doIfLoggedIn(() => {
      Session.set('parent', '');
      BlazeLayout.render('mainLayout', { content: 'dashboard' });
    },
    () => {
      const language = Meteor.user().profile.language;

      FlowRouter.go('welcome', { language: language });
    });
  }
});
