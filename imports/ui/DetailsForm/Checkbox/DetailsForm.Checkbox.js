import './DetailsForm.Checkbox.jade';

import { getKey, getValue } from '../DetailsForm';

Template.DetailsFormCheckbox.helpers({
  getKey,
  getValue(definition, entity) {
    let value = entity;

    if (typeof value != 'boolean') {
      value = getValue(definition, entity);
    }

    return value ? TAPi18n.__('detailsForm.yes') : TAPi18n.__('detailsForm.no');
  }
});

Template.DetailsFormCheckbox.onCreated(() => {});

Template.DetailsFormCheckbox.onRendered(() => {});

Template.DetailsFormCheckbox.onDestroyed(() => {});

Template.DetailsFormCheckbox.events({});
