import moment from 'moment'
import { Template } from 'meteor/templating'
import i18next from 'i18next'

import { getKey, getEntityTranslation } from '../../../Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '../../../Helpers/Error'

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
    if (data.defaultValue === 'today') {
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
    language: i18next.language
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
