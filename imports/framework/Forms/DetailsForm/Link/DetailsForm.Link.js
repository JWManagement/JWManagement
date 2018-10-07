import { Template } from 'meteor/templating'

import { getValue, getKey, defaultClickHandler } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers'
import { getEntityTranslation } from '/imports/framework/Helpers/Helpers'

import './DetailsForm.Link.jade'

Template.DetailsFormLink.helpers({
  getKey,
  getValue,
  getEntityTranslation
})

Template.DetailsFormLink.onCreated(() => {})

Template.DetailsFormLink.onRendered(() => {})

Template.DetailsFormLink.onDestroyed(() => {})

Template.DetailsFormLink.events({
  'click .input': defaultClickHandler
})
