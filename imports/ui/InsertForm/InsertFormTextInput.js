Template.InsertFormTextInput.helpers({
    getValue() {
        const data = Template.currentData().data;
        if (data.value != null) {
            return data.value;
        }
        return '';
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
    'change input': (e, template) => {
        const value = $(e.target).val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
