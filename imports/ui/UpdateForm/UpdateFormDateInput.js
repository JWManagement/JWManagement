import './UpdateFormDateInput.tpl.jade';

Template.UpdateFormDateInput.helpers({
    getKeyTranslation() {
        return TAPi18n.__(FlowRouter.getRouteName().replace('update', 'entity.') + FlowRouter.getParam('key'));
    },
    getValue() {
        return Template.instance().value;
    }
});

Template.UpdateFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.UpdateFormDateInput.onRendered(() => {});

Template.UpdateFormDateInput.onDestroyed(() => {});

Template.UpdateFormDateInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
