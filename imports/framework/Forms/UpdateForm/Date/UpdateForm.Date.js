import moment from 'moment'
import { Template } from 'meteor/templating'
import i18next from 'i18next'

import { getKey, getEntityTranslation } from '../../../Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '../../../Helpers/Error'

import './UpdateForm.Date.jade'

Template.UpdateFormDate.helpers({
  getEntityTranslation,
  getKey,
  hasError,
  getErrorClass,
  getEntityErrorTranslation
})

Template.UpdateFormDate.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.valueRaw = data.value
  template.format = data.format
  template.updateForm = data.parentInstance

  if (template.valueRaw != null && template.valueRaw === 'today') {
    template.valueRaw = moment(Date()).format(template.format)
  }
})

Template.UpdateFormDate.onRendered(() => {
  const template = Template.instance()
  const $datePicker = template.$('.datepicker')

  $datePicker.datepicker({
    maxViewMode: 0,
    weekStart: 1,
    language: i18next.language
  })
    .on('changeDate', () => {
      const value = $datePicker.datepicker('getDate')
      let valueRaw = parseInt(moment(value, 'YYYY-MM-DD').format(template.format), 10)

      if (value === '') {
        valueRaw = null
      }

      if (valueRaw !== template.valueRaw) {
        template.valueRaw = valueRaw
        template.updateForm.updateEntity(valueRaw)
      }
    })

  if (template.valueRaw != null && template.valueRaw !== '') {
    $datePicker.datepicker('setDate', moment(template.valueRaw, template.format).toDate())
  }

  $datePicker.find('.table-condensed').removeClass('table-condensed')
})

Template.UpdateFormDate.onDestroyed(() => {})
