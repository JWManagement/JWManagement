import Helpers from '/imports/ui/routes/Helpers.js';
import RouteManager from '/imports/api/managers/RouteManager.js';

RouteManager.registerEntity('admin', {
    details: 'admin'
});
RouteManager.registerEntity('user.password', {
    insert: 'publishers/:userId/password',
    forwarding: {
        route: 'publishers/:userId/password/forwarding',
        name: 'user.password.details',
        link: 'user.details'
    }
});
RouteManager.registerEntity('user.profile.availability', {
    insert: 'publishers/:userId/availability/:key/new',
    details: 'publishers/:userId/availability/:key'
});
RouteManager.registerEntity('user.profile.vacation', {
    insert: 'publishers/:userId/vacation/new',
    forwarding: {
        route: 'publishers/:userId/vacation/forwarding',
        name: 'user.profile.vacation.details',
        link: 'user.details'
    }
});
RouteManager.registerEntity('user', {
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

FlowRouter.route('/:language/:projectId/calendar/:year?/:month?/:day?', {
    name: 'calendar',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            Session.set('parent', 'home');
            BlazeLayout.render('mainLayout', { content: 'calendar' });
        });
    }
});

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
