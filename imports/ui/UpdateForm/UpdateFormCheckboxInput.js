Template.UpdateFormCheckboxInput.helpers({
    getValue() {
        return Template.instance().value;
    }
});

Template.UpdateFormCheckboxInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateForm = data.parentInstance;
});

Template.UpdateFormCheckboxInput.onRendered(() => {});

Template.UpdateFormCheckboxInput.onDestroyed(() => {});

Template.UpdateFormCheckboxInput.events({
    'change input': (e) => {
        const template = Template.instance();
        const value = $(e.target).is(':checked');

        template.updateForm.updateEntity(value);
    }
});
