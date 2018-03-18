import Helpers from '/imports/api/routes/routeHelpers.js';

export default RouteManager = {

    registerEntity: (entityName, routes) => {
        if ('search' in routes) {
            FlowRouter.route('/:language/:projectId/' + routes.search, {
                name: entityName + '.search',
                triggersEnter: [ Helpers.checkLanguage ],
                action: () => {
                    Helpers.doIfLoggedIn(() => {
                        BlazeLayout.render(entityName + '.search');
                    });
                }
            });
        }

        if ('insert' in routes) {
            FlowRouter.route('/:language/:projectId/' + routes.insert, {
                name: entityName + '.insert',
                triggersEnter: [ Helpers.checkLanguage ],
                action: () => {
                    Helpers.doIfLoggedIn(() => {
                        BlazeLayout.render(entityName + '.insert');
                    });
                }
            });
        }

        if ('details' in routes) {
            FlowRouter.route('/:language/:projectId/' + routes.details, {
                name: entityName + '.details',
                triggersEnter: [ Helpers.checkLanguage ],
                action: () => {
                    Helpers.doIfLoggedIn(() => {
                        BlazeLayout.render(entityName + '.details');
                    });
                }
            });
        }

        if ('update' in routes) {
            FlowRouter.route('/:language/:projectId/' + routes.update, {
                name: entityName + '.update',
                triggersEnter: [ Helpers.checkLanguage ],
                action: () => {
                    Helpers.doIfLoggedIn(() => {
                        BlazeLayout.render(entityName + '.update');
                    });
                }
            });
        }

        if ('forwarding' in routes) {
            FlowRouter.route('/:language/:projectId/' + routes.forwarding.route, {
                name: routes.forwarding.name,
                triggersEnter: [ Helpers.checkLanguage ],
                action: () => {
                    Helpers.doIfLoggedIn(() => {
                        wrs(() => {
                            FlowRouter.go(routes.forwarding.link, FlowRouter.current().params);
                        });
                    });
                }
            });
        }

    }

}
