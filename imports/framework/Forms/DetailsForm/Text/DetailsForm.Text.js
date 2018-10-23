import { Template } from 'meteor/templating'

import { getValue, getKey, defaultClickHandler } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Text.jade'

Template.DetailsFormText.helpers({
  getKey,
  getValue,
  getEntityTranslation
})

Template.DetailsFormText.onCreated(() => {})

Template.DetailsFormText.onRendered(() => {})

Template.DetailsFormText.onDestroyed(() => {})

Template.DetailsFormText.events({
  'click .input': defaultClickHandler
})
