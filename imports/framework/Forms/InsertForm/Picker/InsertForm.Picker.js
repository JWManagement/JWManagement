import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getKey, getEntityTranslation } from '/imports/framework/Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Error'

import './InsertForm.Picker.jade'

Template.InsertFormPicker.helpers({
  getKey,
  getEntityTranslation,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  isAllowedValues () {
    const template = Template.instance()
    return template.allowedValues != null
  },
  isAllowedKeyValues () {
    const template = Template.instance()
    return template.allowedKeyValues.get() != null
  },
  stringify: item => item.toString(),
  getItems () {
    const template = Template.instance()
    const searchText = template.insertForm.searchText.get()

    if (searchText) {
      const regEx = new RegExp(searchText, 'gi')

      return template.allowedValues
        .filter(item => item.match(regEx))
    }

    return template.allowedValues
  },
  getKeyValues () {
    const template = Template.instance()
    const searchText = template.insertForm.searchText.get()

    if (searchText) {
      const regEx = new RegExp(searchText, 'gi')

      return template.allowedKeyValues.get()
        .filter(({ key, value }) => key.match(regEx) || value.match(regEx))
    }
    return template.allowedKeyValues.get()
  },
  getItemKey () {
    const template = Template.instance()
    return `${template.key}Values.${this}`
  },
  isChecked (keyValue) {
    const template = Template.instance()
    return keyValue === template.value.get()
  },
  getSearchEnabledClass () {
    const data = Template.currentData().data

    if (data.search === true) {
      return 'search-enabled'
    }
    return 'search-disabled'
  }
})

Template.InsertFormPicker.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.key = data.key
  template.value = new ReactiveVar(data.value)
  template.insertForm = data.parentInstance
  template.allowedValues = data.allowedValues
  template.allowedKeyValuesMethod = data.allowedKeyValuesMethod
  template.allowedKeyValues = new ReactiveVar(data.allowedKeyValues)

  if (template.allowedKeyValuesMethod != null) {
    Meteor.call(template.allowedKeyValuesMethod, FlowRouter.current().params, (e, keyValues) => {
      if (e == null) {
        template.allowedKeyValues.set(keyValues)
      } else {
        console.log(e)
        alert('SERVER ERROR')
      }
    })
  }
})

Template.InsertFormPicker.onRendered(() => {})

Template.InsertFormPicker.onDestroyed(() => {})

Template.InsertFormPicker.events({
  'click .form-group' (e, template) {
    const key = $(e.target).closest('.section').attr('key')
    let value = $(e.target).closest('.form-group').attr('key')

    if (parseInt(value)) {
      value = parseInt(value)
    }

    template.insertForm.setFieldValue(key, value)
    template.value.set(value)
  }
})
