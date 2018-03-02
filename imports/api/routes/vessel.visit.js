import Helpers from './routeHelpers.js';

// search

// details
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

// insert
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

// update
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
