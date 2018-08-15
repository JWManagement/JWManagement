import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { getEntityTranslation } from '/imports/framework/Helpers/Helpers';

import './DetailsForm.Actions.jade';

Template.DetailsFormActions.helpers({
  getEntityTranslation,
  isType(action, type) {
    return action.type == type;
  },
  getActionPath(action) {
    return FlowRouter.path(
      action.route,
      FlowRouter.current().params);
  }
});

Template.DetailsFormActions.onCreated(() => {});

Template.DetailsFormActions.onRendered(() => {});

Template.DetailsFormActions.onDestroyed(() => {});

Template.DetailsFormActions.events({});
