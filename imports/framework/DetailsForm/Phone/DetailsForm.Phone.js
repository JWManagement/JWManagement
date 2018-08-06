import { Template } from 'meteor/templating';

import { getValue } from '/imports/framework/DetailsForm/DetailsForm.Helpers';
import { getEntityTranslation } from '/imports/framework/Helpers';

import './DetailsForm.Phone.jade';

Template.DetailsFormPhone.helpers({ getValue, getEntityTranslation });

Template.DetailsFormPhone.onCreated(() => {});

Template.DetailsFormPhone.onRendered(() => {});

Template.DetailsFormPhone.onDestroyed(() => {});

Template.DetailsFormPhone.events({});
