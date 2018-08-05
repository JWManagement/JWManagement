import './DetailsForm.Textbox.jade';

import { getValue, getKey } from '/imports/framework/DetailsForm/DetailsForm.Helpers';

Template.DetailsFormTextbox.helpers({
  getKey,
  getValue(definition, entity) {
    return getValue(definition, entity).replace(/\r?\n|\r/g, '<br>', );
  }
});

Template.DetailsFormTextbox.onCreated(() => {});

Template.DetailsFormTextbox.onRendered(() => {});

Template.DetailsFormTextbox.onDestroyed(() => {});

Template.DetailsFormTextbox.events({});
