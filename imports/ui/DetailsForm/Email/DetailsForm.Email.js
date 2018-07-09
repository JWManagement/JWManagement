import './DetailsForm.Email.jade';

Template.DetailsFormEmail.helpers({
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

Template.DetailsFormEmail.onCreated(() => {});

Template.DetailsFormEmail.onRendered(() => {});

Template.DetailsFormEmail.onDestroyed(() => {});

Template.DetailsFormEmail.events({});
