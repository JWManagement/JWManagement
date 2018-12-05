import moment from 'moment'
import { Template } from 'meteor/templating'
import i18next from 'i18next'

import { getValue, getKey, defaultClickHandler } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Date.jade'

Template.DetailsFormDate.helpers({
  getEntityTranslation,
  getKey,
  getValue (definition, entity) {
    const value = getValue(definition, entity)

    if (!value) {
      return ''
    }
    const uiFormat = i18next.t('dateFormat.' + definition.uiFormat)
    const dbFormat = definition.dbFormat

    return moment(value, dbFormat).format(uiFormat)
  }
})

Template.DetailsFormDate.onCreated(() => {})

Template.DetailsFormDate.onRendered(() => {})

Template.DetailsFormDate.onDestroyed(() => {})

Template.DetailsFormDate.events({
  'click .input': defaultClickHandler
})
