import { Template } from 'meteor/templating';

import { getValue, getKey } from '/imports/framework/DetailsForm/DetailsForm.Helpers';
import { getEntityTranslation } from '/imports/framework/Helpers';

import './DetailsForm.Link.jade';

Template.DetailsFormLink.helpers({
  getKey,
  getValue,
  getEntityTranslation
});

Template.DetailsFormLink.onCreated(() => {});

Template.DetailsFormLink.onRendered(() => {});

Template.DetailsFormLink.onDestroyed(() => {});

Template.DetailsFormLink.events({});
