import './UpdateFormDropdownInput.tpl.jade';

Template.UpdateFormDropdownInput.helpers({
    items() {
        const template = Template.instance();
        return template.allowedValues;
    }
});

Template.UpdateFormDropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateForm = data.parentInstance;
});

Template.UpdateFormDropdownInput.onRendered(() => {});

Template.UpdateFormDropdownInput.onDestroyed(() => {});

Template.UpdateFormDropdownInput.events({
    'change select': () => {
        const template = Template.instance();
        const value = $('select').val();

        template.updateForm.updateEntity(value);
    }
});
