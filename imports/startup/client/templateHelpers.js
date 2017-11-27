Template.registerHelper('getEntityTranslation', (key) => {
    if (key == null) {
        key = FlowRouter.getParam('key');
    }

    return TAPi18n.__([
        FlowRouter.getRouteName().split('.')[0],
        'entity',
        key
    ].join('.'));
})

Template.registerHelper('getTitle', (key) => {
    return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
})
