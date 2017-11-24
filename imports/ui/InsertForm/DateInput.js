import './DateInput.tpl.jade';

Template.DateInput.helpers({
    'getKeyTranslation': () => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', 'entity.') + FlowRouter.getParam('key'));
    },
    'getValue': () => {
        return Template.instance().value;
    }
});

Template.DateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.DateInput.onRendered(() => {});

Template.DateInput.onDestroyed(() => {});

Template.DateInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
