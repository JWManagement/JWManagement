import './DetailsForm.Text.jade';

import { getValue, getKey } from '/imports/framework/DetailsForm/DetailsForm';
import { getEntityTranslation } from '/imports/framework/Helpers';

Template.DetailsFormText.helpers({
  getKey,
  getValue,
  getEntityTranslation
});

Template.DetailsFormText.onCreated(() => {});

Template.DetailsFormText.onRendered(() => {});

Template.DetailsFormText.onDestroyed(() => {});

Template.DetailsFormText.events({});
