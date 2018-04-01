Template.registerHelper('getTitle', (key) => {
    return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
});

Template.registerHelper('getEntityTranslation', (key, suffix) => {
    if (key == null) {
        key = FlowRouter.getParam('key');
    }

    const attributeParts = [key];

    if (suffix != null && typeof(suffix) == 'string') {
        attributeParts.push(suffix);
    }

    const routeNameParts = FlowRouter.getRouteName().split('.');
    routeNameParts.pop();
    routeNameParts.splice(1, 0, 'entity');

    return TAPi18n.__(routeNameParts.concat(attributeParts).join('.'));
});

Template.registerHelper('getKey', (key) => {
    return Template.instance().key;
});

Template.registerHelper('hasError', (key) => {
    const data = Template.currentData().data;
    return isHandledError(data.error);
});

Template.registerHelper('getErrorClass', (key) => {
    const data = Template.currentData().data;
    if (isHandledError(data.error)) {
        return 'has-error';
    }
    return '';
});

Template.registerHelper('getEntityErrorTranslation', (key) => {
    const data = Template.currentData().data;
    if (isHandledError(data.error)) {
        return TAPi18n.__('validation.' + data.error);
    }
    return '';
});

function isHandledError(error) {
    return ['required', 'unique', 'minString8', 'passwordMismatch', 'hasToBeBigger'].indexOf(error) > -1;
}
