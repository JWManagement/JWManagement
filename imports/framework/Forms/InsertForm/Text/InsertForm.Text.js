import { Template } from 'meteor/templating'

import { getKey, getEntityTranslation } from '../../../Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '../../../Helpers/Error'

import './InsertForm.Text.jade'

Template.InsertFormText.helpers({
  getKey,
  getEntityTranslation,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getValue () {
    const data = Template.currentData().data
    if (data.value != null) {
      return data.value
    }
    return ''
  }
})

Template.InsertFormText.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.key = data.key
  template.insertForm = data.parentInstance
})

Template.InsertFormText.onRendered(() => {})

Template.InsertFormText.onDestroyed(() => {})

Template.InsertFormText.events({
  'change input' (e, template) {
    const value = $(e.target).val().trim()

    template.insertForm.setFieldValue(template.key, value)
  }
})
