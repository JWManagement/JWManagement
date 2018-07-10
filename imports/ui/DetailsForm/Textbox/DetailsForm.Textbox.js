import './DetailsForm.Textbox.jade';

import { getValue } from '../DetailsForm';

Template.DetailsFormTextbox.helpers({
    getKey(definition) {
        if (definition.linkedKey != null) {
            return definition.linkedKey;
        }

        return definition.key;
    },
    getValue(definition, entity) {
        return getValue(definition, entity).replace(/\r?\n|\r/g, '<br>', );
    }
});

Template.DetailsFormTextbox.onCreated(() => {});

Template.DetailsFormTextbox.onRendered(() => {});

Template.DetailsFormTextbox.onDestroyed(() => {});

Template.DetailsFormTextbox.events({});
