import './InsertFormDropdownInput.tpl.jade';
import './InsertFormDropdownHeader.tpl.jade';

Template.InsertFormDropdownInput.helpers({
    'items': () => {
        return [];
    }
});

Template.InsertFormDropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.InsertFormDropdownInput.onRendered(() => {});

Template.InsertFormDropdownInput.onDestroyed(() => {});

Template.InsertFormDropdownInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
