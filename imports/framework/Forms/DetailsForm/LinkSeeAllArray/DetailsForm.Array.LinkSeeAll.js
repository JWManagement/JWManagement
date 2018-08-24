import { Template } from 'meteor/templating';

import {
  getValueForSeeAllItems,
  clickHandlerForSeeAllItems
} from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers';

import './DetailsForm.Array.LinkSeeAll.jade';

Template.DetailsFormArrayLinkSeeAll.helpers({
  getValue: getValueForSeeAllItems
});

Template.DetailsFormArrayLinkSeeAll.onCreated(() => {});

Template.DetailsFormArrayLinkSeeAll.onRendered(() => {});

Template.DetailsFormArrayLinkSeeAll.onDestroyed(() => {});

Template.DetailsFormArrayLinkSeeAll.events({
  'click .input.form-group.array-item': clickHandlerForSeeAllItems
});
