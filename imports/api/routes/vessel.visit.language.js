import Helpers from './routeHelpers.js';

// search

// insert
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


// details
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

// update
