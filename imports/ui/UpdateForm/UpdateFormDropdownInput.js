import './UpdateFormDropdownInput.tpl.jade';

Template.UpdateFormDropdownInput.helpers({
    items() {
        return [];
    }
});

Template.UpdateFormDropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.UpdateFormDropdownInput.onRendered(() => {});

Template.UpdateFormDropdownInput.onDestroyed(() => {});

Template.UpdateFormDropdownInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
