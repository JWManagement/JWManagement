import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import Helpers from '/imports/api/routes/Helpers';

import { wrs } from '/imports/framework/Functions/Async';

const RouteManager = {

  registerTranslatedPage(entityName, routes) {
    this.registerEntity(entityName, routes, '/');
  },

  registerEntity(entityName, routes, prefix = '/:projectId/') {
    if ('search' in routes) {
      FlowRouter.route(prefix + routes.search, {
        name: entityName + '.search',
        action: () => {
          Helpers.doIfLoggedIn(() => {
            BlazeLayout.render(entityName + '.search');
          });
        }
      });
    }

    if ('insert' in routes) {
      FlowRouter.route(prefix + routes.insert, {
        name: entityName + '.insert',
        action: () => {
          Helpers.doIfLoggedIn(() => {
            BlazeLayout.render(entityName + '.insert');
          });
        }
      });
    }

    if ('details' in routes) {
      FlowRouter.route(prefix + routes.details, {
        name: entityName + '.details',
        action: () => {
          Helpers.doIfLoggedIn(() => {
            BlazeLayout.render(entityName + '.details');
          });
        }
      });
    }

    if ('update' in routes) {
      FlowRouter.route(prefix + routes.update, {
        name: entityName + '.update',
        action: () => {
          Helpers.doIfLoggedIn(() => {
            BlazeLayout.render(entityName + '.update');
          });
        }
      });
    }

    if ('forwarding' in routes) {
      FlowRouter.route(prefix + routes.forwarding.route, {
        name: routes.forwarding.name,
        action: () => {
          wrs(() => {
            FlowRouter.go(routes.forwarding.link, FlowRouter.current().params);
          });
        }
      });
    }

  },

  navigateTo(form, params) {
    const routeName = this.getLink(form);

    FlowRouter.go(routeName, params);
  },

  navigateToUpdate(key) {
    const params = this.getParams('key', key);

    this.navigateTo('update', params);
  },

  navigateToDetails(entityKey, entityId, saveToSession = false) {
    const params = this.getParams(entityKey, entityId);

    if (saveToSession) {
      Session.set(this.getLink('search') + '.searchString', entityId);
    }

    this.navigateTo('details', params);
  },

  navigateToInsert() {
    const params = FlowRouter.current().params;

    this.navigateTo('insert', params);
  },

  getLink(form) {
    let routeName = FlowRouter.getRouteName();
    let routeNameParts = routeName.split('.');
    routeNameParts.pop();
    routeNameParts = routeNameParts.concat([form]);
    return routeNameParts.join('.');
  },

  getParams(entityKey, entityId) {
    const params = FlowRouter.current().params;
    params[entityKey] = entityId;
    return params;
  }

};

export default RouteManager;
