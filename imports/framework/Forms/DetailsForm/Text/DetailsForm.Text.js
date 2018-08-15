import { Template } from 'meteor/templating';

import { getValue, getKey } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers';
import { getEntityTranslation } from '/imports/framework/Helpers';

import './DetailsForm.Text.jade';

Template.DetailsFormText.helpers({
  getKey,
  getValue,
  getEntityTranslation
});

Template.DetailsFormText.onCreated(() => {});

Template.DetailsFormText.onRendered(() => {});

Template.DetailsFormText.onDestroyed(() => {});

Template.DetailsFormText.events({});
