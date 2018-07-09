import './DetailsForm.Navigation.jade';

Template.DetailsFormNavigation.helpers({
    hasBackLink() {
        return Template.currentData().data.backLink != null;
    },
    getBackLink() {
        FlowRouter.getParam('language');

        return FlowRouter.path(
            Template.currentData().data.backLink,
            FlowRouter.current().params);
    },
    getNavbarStyle() {
        const navbarStyle = Template.currentData().data.navbarStyle;

        return (navbarStyle != null ? navbarStyle : '');
    },
    showTitle() {
        return !Template.currentData().data.hideTitle;
    }
});

Template.DetailsFormNavigation.onCreated(() => {});

Template.DetailsFormNavigation.onRendered(() => {});

Template.DetailsFormNavigation.onDestroyed(() => {});

Template.DetailsFormNavigation.events({});
