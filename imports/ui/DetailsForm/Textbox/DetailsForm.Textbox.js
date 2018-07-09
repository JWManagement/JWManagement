import './DetailsForm.Textbox.jade';

Template.DetailsFormTextbox.helpers({
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

        return value.replace(/\r?\n|\r/g, '<br>', );
    }
});

Template.DetailsFormTextbox.onCreated(() => {});

Template.DetailsFormTextbox.onRendered(() => {});

Template.DetailsFormTextbox.onDestroyed(() => {});

Template.DetailsFormTextbox.events({});
