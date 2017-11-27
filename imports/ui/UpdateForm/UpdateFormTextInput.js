import './UpdateFormTextInput.tpl.jade';

Template.UpdateFormTextInput.helpers({
    'getKeyTranslation': () => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', 'entity.') + FlowRouter.getParam('key'));
    },
    'getValue': () => {
        return Template.instance().value;
    }
});

Template.UpdateFormTextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.UpdateFormTextInput.onRendered(() => {});

Template.UpdateFormTextInput.onDestroyed(() => {});

Template.UpdateFormTextInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
