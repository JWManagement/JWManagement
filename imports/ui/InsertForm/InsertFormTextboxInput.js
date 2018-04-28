import autosize from 'autosize';

Template.InsertFormTextboxInput.helpers({
    getValue() {
        const data = Template.currentData().data;
        if (data.value != null) {
            return data.value;
        }
        return '';
    },
    isRequired() {
        const data = Template.currentData().data;
        if (data.required != null) {
            return data.required;
        }
        return false;
    }
});

Template.InsertFormTextboxInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormTextboxInput.onRendered(() => {
    autosize(document.querySelectorAll('textarea'));
});

Template.InsertFormTextboxInput.onDestroyed(() => {});

Template.InsertFormTextboxInput.events({
    'change textarea': (e, template) => {
        const value = $(e.target).val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
