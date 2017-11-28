import './InsertFormDropdownInput.tpl.jade';

Template.InsertFormDropdownInput.helpers({
    items() {
        const template = Template.instance();
        return template.allowedValues;
    },
    getItemKey() {
        const template = Template.instance();
        const item = Template.currentData();
        return template.key + 'Values.' + item;
    },
    getKey() {
        return Template.instance().key;
    }
});

Template.InsertFormDropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.value = data.value;
    template.updateEntity = data.updateEntity;
    template.allowedValues = data.allowedValues;
});

Template.InsertFormDropdownInput.onRendered(() => {
    const template = Template.instance();

    Tracker.afterFlush(() => {
        $('select[name=' + template.key + ']').val(template.value);
    });
});

Template.InsertFormDropdownInput.onDestroyed(() => {});

Template.InsertFormDropdownInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
