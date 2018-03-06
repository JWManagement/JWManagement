import Helpers from './routeHelpers.js';

// search
FlowRouter.route('/:language/:projectId/new/users', {
    name: 'user.search',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/users/user.search.js');
            BlazeLayout.render('user.search');
        });
    }
});

// insert

// details
FlowRouter.route('/:language/:projectId/new/users/:userId', {
    name: 'user.details',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/users/user.details.js');
            BlazeLayout.render('user.details');
        });
    }
});

//update
FlowRouter.route('/:language/:projectId/new/users/:userId/:key', {
    name: 'user.update',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/users/user.update.js');
            BlazeLayout.render('user.update');
        });
    }
});
