import { Template } from 'meteor/templating';

import { getValue } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers';

import './DetailsForm.Header.jade';

Template.DetailsFormHeader.helpers({
  getValueByKey(key, entity) {
    return getValue({ key: key }, entity);
  }
});

Template.DetailsFormHeader.onCreated(() => {});

Template.DetailsFormHeader.onRendered(() => {});

Template.DetailsFormHeader.onDestroyed(() => {});

Template.DetailsFormHeader.events({});
