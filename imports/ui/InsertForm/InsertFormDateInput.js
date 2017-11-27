import './InsertFormDateInput.tpl.jade';

Template.InsertFormDateInput.helpers({});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.insertForm = data.parentInstance;
});

Template.InsertFormDateInput.onRendered(() => {});

Template.InsertFormDateInput.onDestroyed(() => {});

Template.InsertFormDateInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.insertForm.setFieldValue(template.key, value);
    }
});
