import './DetailsForm.Text.jade';

Template.DetailsFormText.helpers({
    getKey(definition) {
        if (definition.linkedKey != null) {
            return definition.linkedKey;
        }

        return definition.key;
    },
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

Template.DetailsFormText.onCreated(() => {});

Template.DetailsFormText.onRendered(() => {});

Template.DetailsFormText.onDestroyed(() => {});

Template.DetailsFormText.events({});
