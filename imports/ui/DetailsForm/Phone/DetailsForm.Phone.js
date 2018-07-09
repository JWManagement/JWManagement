import './DetailsForm.Phone.jade';

Template.DetailsFormPhone.helpers({
    getValue(definition, entity) {
        const key = definition.key;
        let value = entity[key];

        if (key.indexOf('_') > 0) {
            value = entity;

            for (property of key.split('_')) {
                if (property in value) {
                    value = value[property];
                } else {
                    return '';
                }
            }
        }

        return value;
    }
});

Template.DetailsFormPhone.onCreated(() => {});

Template.DetailsFormPhone.onRendered(() => {});

Template.DetailsFormPhone.onDestroyed(() => {});

Template.DetailsFormPhone.events({});
