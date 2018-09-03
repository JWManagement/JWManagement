import { Template } from 'meteor/templating';

import { getValue, getKey, defaultClickHandler } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers';

import './DetailsForm.Textbox.jade';

Template.DetailsFormTextbox.helpers({
  getKey,
  getValue(definition, entity) {
    return getValue(definition, entity).replace(/\r?\n|\r/g, '<br>');
  }
});

Template.DetailsFormTextbox.onCreated(() => {});

Template.DetailsFormTextbox.onRendered(() => {});

Template.DetailsFormTextbox.onDestroyed(() => {});

Template.DetailsFormTextbox.events({
  'click .input': defaultClickHandler
});
