import Helpers from './routeHelpers.js';

// search

// insert

// details
FlowRouter.route('/:language/:projectId/new/admin', {
    name: 'admin.details',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/admin/admin.details.js');
            BlazeLayout.render('admin.details');
        });
    }
});

//update
