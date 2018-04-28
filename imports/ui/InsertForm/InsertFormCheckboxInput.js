Template.InsertFormCheckboxInput.helpers({
    isRequired() {
        const data = Template.currentData().data;
        if (data.required != null) {
            return data.required;
        }
        return false;
    }
});

Template.InsertFormCheckboxInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.value = data.value;
    template.insertForm = data.parentInstance;
});

Template.InsertFormCheckboxInput.onRendered(() => {
    const template = Template.instance();
    template.insertForm.setFieldValue(template.key, true);
});

Template.InsertFormCheckboxInput.onDestroyed(() => {});

Template.InsertFormCheckboxInput.events({
    'change input': (e, template) => {
        const value = $(e.target).is(':checked');

        template.insertForm.setFieldValue(template.key, value);
    }
});
