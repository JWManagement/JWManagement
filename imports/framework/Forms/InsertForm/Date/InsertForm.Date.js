import moment from 'moment'
import { Template } from 'meteor/templating'
import { TAPi18n } from 'meteor/tap:i18n'

import { getKey, getEntityTranslation } from '/imports/framework/Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Error'

import './InsertForm.Date.jade'

Template.InsertFormDate.helpers({
  getKey,
  getEntityTranslation,
  hasError,
  getErrorClass,
  getEntityErrorTranslation
})

Template.InsertFormDate.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.key = data.key
  template.format = data.format
  template.insertForm = data.parentInstance

  if (data.defaultValue != null) {
    if (data.defaultValue == 'today') {
      template.defaultValue = Date()
    } else {
      template.defaultValue = data.defaultValue
    }
  }
})

Template.InsertFormDate.onRendered(() => {
  const template = Template.instance()
  const $datePicker = template.$('.datepicker')

  $datePicker.datepicker({
    maxViewMode: 0,
    weekStart: 1,
    language: TAPi18n.getLanguage()
  })
    .on('changeDate', () => {
      const valueRaw = $datePicker.datepicker('getDate')
      const value = parseInt(moment(valueRaw, 'YYYY-MM-DD').format(template.format), 10)

      template.insertForm.setFieldValue(template.key, value)
    })

  if (template.defaultValue != null) {
    $datePicker.datepicker('setDate', template.defaultValue)
  }
})

Template.InsertFormDate.onDestroyed(() => {})
