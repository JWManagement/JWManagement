import './DetailsForm.Text.jade';

import { getValue } from '../DetailsForm';

Template.DetailsFormText.helpers({
    getKey(definition) {
        if (definition.linkedKey != null) {
            return definition.linkedKey;
        }

        return definition.key;
    },
    getValue
});

Template.DetailsFormText.onCreated(() => {});

Template.DetailsFormText.onRendered(() => {});

Template.DetailsFormText.onDestroyed(() => {});

Template.DetailsFormText.events({});
