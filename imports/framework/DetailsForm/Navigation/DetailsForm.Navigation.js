import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { getTitle } from '/imports/framework/DetailsForm/DetailsForm.Helpers';

import './DetailsForm.Navigation.jade';

Template.DetailsFormNavigation.helpers({
  getTitle,
  hasBackLink() {
    if (Template.currentData().data) {
      return Template.currentData().data.backLink != null;
    }
  },
  getBackLink() {
    if (Template.currentData().data) {
      FlowRouter.getParam('language');

      return FlowRouter.path(
        Template.currentData().data.backLink,
        FlowRouter.current().params);
    }
  },
  getNavbarStyle() {
    if (Template.currentData().data) {
      const navbarStyle = Template.currentData().data.navbarStyle;

      return (navbarStyle != null ? navbarStyle : '');
    }
  },
  showTitle() {
    if (Template.currentData().data) {
      return !Template.currentData().data.hideTitle;
    }
  }
});

Template.DetailsFormNavigation.onCreated(() => {});

Template.DetailsFormNavigation.onRendered(() => {});

Template.DetailsFormNavigation.onDestroyed(() => {});

Template.DetailsFormNavigation.events({});
