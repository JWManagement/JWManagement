import { Template } from 'meteor/templating'
import { TAPi18n } from 'meteor/tap:i18n'

import { getKey, getValue, defaultClickHandler } from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers'
import { getEntityTranslation } from '/imports/framework/Helpers/Helpers'

import './DetailsForm.Checkbox.jade'

Template.DetailsFormCheckbox.helpers({
  getEntityTranslation,
  getKey,
  getValue (definition, entity) {
    let value = entity

    if (typeof value !== 'boolean') {
      value = getValue(definition, entity)
    }

    return value ? TAPi18n.__('detailsForm.yes') : TAPi18n.__('detailsForm.no')
  }
})

Template.DetailsFormCheckbox.onCreated(() => {})

Template.DetailsFormCheckbox.onRendered(() => {})

Template.DetailsFormCheckbox.onDestroyed(() => {})

Template.DetailsFormCheckbox.events({
  'click .input': defaultClickHandler
})
