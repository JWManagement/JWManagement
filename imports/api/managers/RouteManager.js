import Helpers from '/imports/ui/routes/Helpers.js';

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
                action: () => {
                    wrs(() => {
                        FlowRouter.go(routes.forwarding.link, FlowRouter.current().params);
                    });
                }
            });
        }

    },

    navigateTo: function(form, params) {
        const routeName = this.getLink(form);

        FlowRouter.go(routeName, params);
    },

    navigateToUpdate: function(key) {
        const params = this.getParams('key', key);

        this.navigateTo('update', params);
    },

    navigateToDetails: function(entityKey, entityId, saveToSession = false) {
        const params = this.getParams(entityKey, entityId);

        if (saveToSession) {
            Session.set(this.getLink('search') + '.searchString', entityId);
        }

        this.navigateTo('details', params);
    },

    navigateToInsert: function() {
        const params = FlowRouter.current().params;

        this.navigateTo('insert', params);
    },

    getLink: function(form) {
        let routeName = FlowRouter.getRouteName();
        let routeNameParts = routeName.split('.');
        routeNameParts.pop();
        routeNameParts = routeNameParts.concat([form]);
        return routeNameParts.join('.');
    },

    getParams: function(entityKey, entityId) {
        const params = FlowRouter.current().params;
        params[entityKey] = entityId;
        return params;
    }

}
