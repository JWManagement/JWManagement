import './DetailsForm.Array.Dropdown.jade';

import { getKey } from '../../DetailsForm';

Template.DetailsFormArrayDropdown.helpers({
  getKey,
  getValue(entity) {
    return TAPi18n.__('language._' + entity._id.toUpperCase());
  }
});

Template.DetailsFormArrayDropdown.onCreated(() => {});

Template.DetailsFormArrayDropdown.onRendered(() => {});

Template.DetailsFormArrayDropdown.onDestroyed(() => {});

Template.DetailsFormArrayDropdown.events({});
