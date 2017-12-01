Template.registerHelper('getTitle', (key) => {
    return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
});

Template.registerHelper('getEntityTranslation', (key) => {
    if (key == null) {
        key = FlowRouter.getParam('key');
    }

    const routeNameParts = FlowRouter.getRouteName().split('.');
    routeNameParts.pop();
    routeNameParts.splice(1, 0, 'entity');

    return TAPi18n.__(routeNameParts.concat([key]).join('.'));
});

Template.registerHelper('getKey', (key) => {
    return Template.instance().key;
});

Template.registerHelper('hasError', (key) => {
    const data = Template.currentData().data;
    return ['required', 'unique'].includes(data.error);
});

Template.registerHelper('getErrorClass', (key) => {
    const data = Template.currentData().data;
    if (data.error != null) {
        return 'has-error';
    }
    return '';
});

Template.registerHelper('getEntityErrorTranslation', (key) => {
    const data = Template.currentData().data;
    if (data.error == 'required') {
        return TAPi18n.__('validation.required');
    } else if (data.error == 'unique') {
        return TAPi18n.__('validation.unique');
    }
});
