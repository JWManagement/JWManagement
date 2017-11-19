import './TextInput.tpl.jade';

Template.TextInput.helpers({
    'getKeyTranslation': () => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', 'entity.') + FlowRouter.getParam('key'));
    },
    'getValue': () => {
        return Template.instance().value;
    }
});

Template.TextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.TextInput.onRendered(() => {});

Template.TextInput.onDestroyed(() => {});

Template.TextInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
