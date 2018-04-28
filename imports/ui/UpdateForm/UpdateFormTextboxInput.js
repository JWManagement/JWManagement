import autosize from 'autosize';

Template.UpdateFormTextboxInput.helpers({
    getValue() {
        return Template.instance().value;
    }
});

Template.UpdateFormTextboxInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateForm = data.parentInstance;
});

Template.UpdateFormTextboxInput.onRendered(() => {
    autosize(document.querySelectorAll('textarea'));
});

Template.UpdateFormTextboxInput.onDestroyed(() => {});

Template.UpdateFormTextboxInput.events({
    'change textarea': (e, template) => {
        const value = $(e.target).val().trim();
        template.updateForm.updateEntity(value);
    }
});
