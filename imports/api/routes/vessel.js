import Helpers from './routeHelpers.js';

// search
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

// details
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

// insert
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

// update
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
