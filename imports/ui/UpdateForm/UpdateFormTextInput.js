import './UpdateFormTextInput.tpl.jade';

Template.UpdateFormTextInput.helpers({
    getKeyTranslation() {
        return TAPi18n.__([
            FlowRouter.getRouteName().split('.')[0],
            'entity',
            FlowRouter.getParam('key')
        ].join('.'));
    },
    getValue() {
        return Template.instance().value;
    },
    getErrorClass() {
        const data = Template.currentData().data;
        if (data.error != null) {
            return 'has-error';
        }
        return '';
    },
    hasError() {
        const data = Template.currentData().data;
        return ['required', 'unique'].includes(data.error);
    },
    getEntityErrorTranslation() {
        const data = Template.currentData().data;
        if (data.error == 'required') {
            return TAPi18n.__('validation.required');
        } else if (data.error == 'unique') {
            return TAPi18n.__('validation.unique');
        }
    }
});

Template.UpdateFormTextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateForm = data.parentInstance;
});

Template.UpdateFormTextInput.onRendered(() => {});

Template.UpdateFormTextInput.onDestroyed(() => {});

Template.UpdateFormTextInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateForm.updateEntity(value);
    }
});
