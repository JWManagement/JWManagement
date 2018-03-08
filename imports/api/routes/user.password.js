import Helpers from './routeHelpers.js';

// search

// insert
FlowRouter.route('/:language/:projectId/new/user/:userId/password', {
    name: 'user.password.change',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/users/user.password.change.js');
            BlazeLayout.render('user.password.change');
        });
    }
});

// details

//update
