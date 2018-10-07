import { Template } from 'meteor/templating'

import {
  getValueForSeeAllItems,
  clickHandlerForSeeAllItems
} from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers'

import './DetailsForm.Array.EntitySeeAll.jade'

Template.DetailsFormArrayEntitySeeAll.helpers({
  getValue: getValueForSeeAllItems
})

Template.DetailsFormArrayEntitySeeAll.onCreated(() => {})

Template.DetailsFormArrayEntitySeeAll.onRendered(() => {})

Template.DetailsFormArrayEntitySeeAll.onDestroyed(() => {})

Template.DetailsFormArrayEntitySeeAll.events({
  'click tr.array-item': clickHandlerForSeeAllItems
})
