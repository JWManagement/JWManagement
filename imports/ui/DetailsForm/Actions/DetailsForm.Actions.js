import './DetailsForm.Actions.jade';

Template.DetailsFormActions.helpers({
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
