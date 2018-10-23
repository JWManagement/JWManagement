import { Template } from 'meteor/templating'

import { getValue, getKey, defaultClickHandler } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

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
