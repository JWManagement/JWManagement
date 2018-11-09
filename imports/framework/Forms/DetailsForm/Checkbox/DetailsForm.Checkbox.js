import { Template } from 'meteor/templating'
import i18next from 'i18next'

import { getKey, getValue, defaultClickHandler } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Checkbox.jade'

Template.DetailsFormCheckbox.helpers({
  getEntityTranslation,
  getKey,
  getValue (definition, entity) {
    let value = entity

    if (typeof value !== 'boolean') {
      value = getValue(definition, entity)
    }

    return value ? i18next.t('detailsForm.yes') : i18next.t('detailsForm.no')
  }
})

Template.DetailsFormCheckbox.onCreated(() => {})

Template.DetailsFormCheckbox.onRendered(() => {})

Template.DetailsFormCheckbox.onDestroyed(() => {})

Template.DetailsFormCheckbox.events({
  'click .input': defaultClickHandler
})
