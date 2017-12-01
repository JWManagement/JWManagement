import './InsertFormCheckboxInput.tpl.jade';

Template.InsertFormCheckboxInput.helpers({
    getKey() { // TODO: register global helper
        return Template.instance().key;
    },
    getErrorClass() { // TODO: register global helper
        const data = Template.currentData().data;
        if (data.error != null) {
            return 'has-error';
        }
        return '';
    },
    hasError() { // TODO: register global helper
        const data = Template.currentData().data;
        return ['required', 'unique'].includes(data.error);
    },
    getEntityErrorTranslation() { // TODO: register global helper
        const data = Template.currentData().data;
        if (data.error == 'required') {
            return TAPi18n.__('validation.required');
        } else if (data.error == 'unique') {
            return TAPi18n.__('validation.unique');
        }
    }
});

Template.InsertFormCheckboxInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.value = data.value;
    template.insertForm = data.parentInstance;
});

Template.InsertFormCheckboxInput.onRendered(() => {});

Template.InsertFormCheckboxInput.onDestroyed(() => {});

Template.InsertFormCheckboxInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = $(e.target).is(':checked');

        template.insertForm.setFieldValue(template.key, value);
    }
});
