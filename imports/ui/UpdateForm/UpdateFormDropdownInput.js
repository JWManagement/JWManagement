import './UpdateFormDropdownInput.tpl.jade';

Template.UpdateFormDropdownInput.helpers({
    items() {
        const template = Template.instance();
        return template.allowedValues;
    },
    getItemKey() {
        const template = Template.instance();
        const item = Template.currentData();
        return FlowRouter.getParam('key') + 'Values.' + item;
    }
});

Template.UpdateFormDropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.allowedValues = data.allowedValues;
    template.updateForm = data.parentInstance;
});

Template.UpdateFormDropdownInput.onRendered(() => {
    const template = Template.instance();

    Tracker.afterFlush(() => {
        template.$('select').val(template.value);
    });
});

Template.UpdateFormDropdownInput.onDestroyed(() => {});

Template.UpdateFormDropdownInput.events({
    'change select': (e) => {
        const template = Template.instance();
        const value = template.$('select').val();

        template.updateForm.updateEntity(value);

        $(e.target).closest('.section').removeClass('has-error');
    }
});
