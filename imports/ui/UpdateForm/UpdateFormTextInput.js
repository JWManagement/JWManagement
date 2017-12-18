Template.UpdateFormTextInput.helpers({
    getValue() {
        return Template.instance().value;
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
    'change input': (e, template) => {
        const value = $(e.target).val().trim();
        template.updateForm.updateEntity(value);
    }
});
