import './DetailsForm.Checkbox.jade';

import { getKey, getValue } from '/imports/framework/DetailsForm/DetailsForm';
import { getEntityTranslation } from '/imports/framework/Helpers';

Template.DetailsFormCheckbox.helpers({
  getEntityTranslation,
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
