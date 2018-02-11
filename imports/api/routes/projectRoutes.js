import Helpers from './routeHelpers.js';

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

            if (Roles.userIsInRole(Meteor.userId(), Permissions.storeAdmin, projectId)) {
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

// VESSELS
FlowRouter.route('/:language/:projectId/vessels', {
    name: 'vessel.search',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.search.js');
            BlazeLayout.render('vessel.search');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/new', {
    name: 'vessel.insert',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.insert.js');
            BlazeLayout.render('vessel.insert');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId', {
    name: 'vessel.details',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.details.js');
            BlazeLayout.render('vessel.details');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId/visits/new', { // TODO: generalize
    name: 'vessel.visit.insert',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.visit.insert.js');
            BlazeLayout.render('vessel.visit.insert');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId/:key', {
    name: 'vessel.update',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.update.js');
            BlazeLayout.render('vessel.update');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId/visits/:visitId', {
    name: 'vessel.visit.details',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.visit.details.js');
            BlazeLayout.render('vessel.visit.details');
        });
    }
});

// TODO: create custom route option for insert form save button hit
FlowRouter.route('/:language/:projectId/vessels/:vesselId/visits/:visitId/language', {
    name: 'vessel.details.visit.language',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            wrs(() => {
                FlowRouter.go('vessel.visit.details', FlowRouter.current().params);
            });
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId/visits/:visitId/:key', {
    name: 'vessel.visit.update',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.visit.update.js');
            BlazeLayout.render('vessel.visit.update');
        });
    }
});

FlowRouter.route('/:language/:projectId/vessels/:vesselId/visits/:visitId/languages/new', {
    name: 'vessel.visit.language.insert',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/vessels/vessel.visit.language.insert.js');
            BlazeLayout.render('vessel.visit.language.insert');
        });
    }
});
