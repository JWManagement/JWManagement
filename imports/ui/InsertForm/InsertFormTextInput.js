import './InsertFormTextInput.tpl.jade';

Template.InsertFormTextInput.helpers({
    getKey() {
        return Template.instance().key;
    },
    getValue() {
        const data = Template.currentData().data;
        if (data.value != null) {
            return data.value;
        }
        return '';
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

Template.InsertFormTextInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormTextInput.onRendered(() => {});

Template.InsertFormTextInput.onDestroyed(() => {});

Template.InsertFormTextInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = $(e.target).val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
