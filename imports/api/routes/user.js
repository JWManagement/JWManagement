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

// details

// insert

//update
