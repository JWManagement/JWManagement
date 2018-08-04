import './DetailsForm.Header.jade';

import { getValue } from '../DetailsForm';

Template.DetailsFormHeader.helpers({
  getValueByKey(key, entity) {
    return getValue({ key: key }, entity);
  }
});

Template.DetailsFormHeader.onCreated(() => {});

Template.DetailsFormHeader.onRendered(() => {});

Template.DetailsFormHeader.onDestroyed(() => {});

Template.DetailsFormHeader.events({});
