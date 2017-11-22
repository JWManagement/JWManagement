import './DropdownInput.tpl.jade';
import './DropdownHeader.tpl.jade';

Template.DropdownInput.helpers({
    'items': () => {
        return [];
    }
});

Template.DropdownInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = data.value;
    template.updateEntity = data.updateEntity;
});

Template.DropdownInput.onRendered(() => {});

Template.DropdownInput.onDestroyed(() => {});

Template.DropdownInput.events({
    'change input': () => {
        const template = Template.instance();
        const value = $('input').val().trim();

        template.updateEntity(value);
    }
});
