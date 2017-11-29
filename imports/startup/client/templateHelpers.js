Template.registerHelper('getEntityTranslation', (key) => {
    if (key == null) {
        key = FlowRouter.getParam('key');
    }

    const routeNameParts = FlowRouter.getRouteName().split('.');
    routeNameParts.pop();
    routeNameParts.splice(1, 0, 'entity');

    return TAPi18n.__(routeNameParts.concat([key]).join('.'));
});

Template.registerHelper('getTitle', (key) => {
    return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
});
