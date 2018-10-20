import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getKey, getEntityTranslation } from '../../../Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '../../../Helpers/Error'

import './UpdateForm.Dropdown.jade'

Template.UpdateFormDropdown.helpers({
  getEntityTranslation,
  getKey,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  isAllowedValues () {
    const template = Template.instance()
    return template.allowedValues != null
  },
  isAllowedKeyValues () {
    const template = Template.instance()
    return template.allowedKeyValuesMethod != null
  },
  getItems () {
    const template = Template.instance()
    return template.allowedValues
  },
  getKeyValues () {
    const template = Template.instance()
    return template.allowedKeyValues.get()
  },
  getItemKey () {
    const item = Template.currentData()
    return FlowRouter.getParam('key') + 'Values.' + item
  }
})

Template.UpdateFormDropdown.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.value = data.value
  template.updateForm = data.parentInstance
  template.allowedValues = data.allowedValues
  template.allowedKeyValuesMethod = data.allowedKeyValuesMethod
  template.allowedKeyValues = new ReactiveVar([])

  if (template.allowedKeyValuesMethod != null) {
    Meteor.call(template.allowedKeyValuesMethod, FlowRouter.current().params, (e, keyValues) => {
      if (e == null) {
        template.allowedKeyValues.set(keyValues)
      } else {
        alert('SERVER ERROR')
      }
    })
  }
})

Template.UpdateFormDropdown.onRendered(() => {
  const template = Template.instance()

  template.autorun(() => {
    template.allowedKeyValues.get()

    Tracker.afterFlush(() => {
      template.$('select').val(template.value)
    })
  })
})

Template.UpdateFormDropdown.onDestroyed(() => {})

Template.UpdateFormDropdown.events({
  'change select' (e, template) {
    const value = template.$(e.target).val()

    template.updateForm.updateEntity(value)

    $(e.target).closest('.section').removeClass('has-error')
  }
})
