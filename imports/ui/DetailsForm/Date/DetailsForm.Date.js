import './DetailsForm.Date.jade';

Template.DetailsFormDate.helpers({
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

        if (!value) {
            return '';
        } else {
            const uiFormat = TAPi18n.__('dateFormat.' + definition.uiFormat);
            const dbFormat = definition.dbFormat;

            return moment(value, dbFormat).format(uiFormat);
        }
    }
});

Template.DetailsFormDate.onCreated(() => {});

Template.DetailsFormDate.onRendered(() => {});

Template.DetailsFormDate.onDestroyed(() => {});

Template.DetailsFormDate.events({});
