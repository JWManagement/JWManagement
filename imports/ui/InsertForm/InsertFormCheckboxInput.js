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
            return 'This field is required'; // TODO: translation
        } else {
            return 'There already is a record with this value'; // TODO: translation
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
        const value = $(e.target).val();

        template.insertForm.setFieldValue(template.key, value);
    }
});
