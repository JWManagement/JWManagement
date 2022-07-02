import moment from 'moment'
import { Template } from 'meteor/templating'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getValue, getKey, isType } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Array.Entity.jade'

Template.DetailsFormArrayEntity.helpers({
  getEntityTranslation,
  getKey,
  getValue (definition, entity) {
    const value = getValue(definition, entity)

    if (definition.type === 'dropdown') {
      return i18next.t('language.' + entity._id.toUpperCase())
    }

    if (definition.type === 'date' && value != null) {
      const uiFormat = i18next.t('dateFormat.' + definition.uiFormat)
      const dbFormat = definition.dbFormat

      return moment(value, dbFormat).format(uiFormat)
    }

    if (definition.translationKey) {
      return i18next.t(definition.translationKey + value)
    }

    return value
  },
  isType
})

Template.DetailsFormArrayEntity.onCreated(() => { })

Template.DetailsFormArrayEntity.onRendered(() => { })

Template.DetailsFormArrayEntity.onDestroyed(() => { })

Template.DetailsFormArrayEntity.events({
  'click tr.array-item' (e) {
    e.stopPropagation()

    const data = Template.currentData()
    const link = data.definition.link
    const key = data.definition.key
    const entityId = data.entity._id

    let params = FlowRouter.current().params
    params[key + 'Id'] = entityId

    FlowRouter.go(FlowRouter.path(link, params))
  }
})
