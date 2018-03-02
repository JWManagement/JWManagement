import Helpers from './routeHelpers.js';

import './user.js'
import './vessel.js'
import './vessel.visit.js'
import './vessel.visit.language.js'

FlowRouter.route('/:language/:projectId/kb', {
    name: 'wiki',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'home');
            BlazeLayout.render('mainLayout', { content: 'wiki' });
        });
    }
});

FlowRouter.route('/:language/:projectId/shifts', {
    name: 'shifts',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            let parent = Session.get('parent');

            if (parent != 'settings' && parent != 'home') {
                Session.set('parent', 'home');
            }

            BlazeLayout.render('mainLayout', { content: 'shifts' });
        });
    }
});

FlowRouter.route('/:language/:projectId/admin', {
    name: 'admin',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            const projectId = FlowRouter.getParam('projectId');

            if (Roles.userIsInRole(Meteor.userId(), Permissions.shiftAndStoreAdmin, projectId)) {
                Session.set('parent', 'home');
                BlazeLayout.render('invertedLayout', { content: 'admin' });
            } else {
                wrs(() => {
                    FlowRouter.go('home');
                });
            }
        });
    }
});

FlowRouter.route('/:language/:projectId/settings', {
    name: 'settings',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'admin');
            BlazeLayout.render('mainLayout', { content: 'settings' });
        });
    }
});

FlowRouter.route('/:language/:projectId/users', {
    name: 'users',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'admin');
            BlazeLayout.render('mainLayout', { content: 'users' });
        });
    }
});

FlowRouter.route('/:language/:projectId/reports', {
    name: 'reports',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'admin');
            BlazeLayout.render('mainLayout', { content: 'reports' });
        });
    }
});

FlowRouter.route('/:language/:projectId/store', {
    name: 'store',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'admin');
            BlazeLayout.render('mainLayout', { content: 'store' });
        });
    }
});

FlowRouter.route('/:language/:projectId/notes', {
    name: 'notes',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'admin');
            BlazeLayout.render('mainLayout', { content: 'notes' });
        });
    }
});
