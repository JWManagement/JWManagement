import './DetailsForm.Actions.jade';

Template.DetailsFormActions.helpers({
  isButton(action) {
    return action.type == 'link';
  },
  isConfirm(action) {
    return action.type == 'confirm';
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
