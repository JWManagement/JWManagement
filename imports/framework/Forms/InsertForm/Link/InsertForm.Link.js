import { Template } from 'meteor/templating'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getKey, getEntityTranslation } from '/imports/framework/Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '/imports/framework/Helpers/Error'

import './InsertForm.Link.jade'

Template.InsertFormLink.helpers({
  getKey,
  getEntityTranslation,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getValue () {
    const template = Template.instance()

    if (template.displayValue != null) {
      return template.displayValue
    }
    let value = 'placeholder'
    const data = Template.currentData().data

    if (data.value != null) {
      value = data.value
    }

    let messagePathParts = FlowRouter.getRouteName().split('.')
    messagePathParts.pop()
    messagePathParts.splice(1, 0, 'entity')
    messagePathParts = messagePathParts.concat(data.key.replace(/_/g, '.'))

    return TAPi18n.__(messagePathParts.join('.') + 'Values.' + value)
  }
})

Template.InsertFormLink.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.key = data.key
  template.insertForm = data.parentInstance

  if (data.allowedKeyValues != null && data.value != null) {
    template.displayValue = data.allowedKeyValues.filter((keyValue) => {
      return keyValue.key === data.value
    })[0].value
  }
})

Template.InsertFormLink.onRendered(() => {})

Template.InsertFormLink.onDestroyed(() => {})

Template.InsertFormLink.events({
  'click .link': (e, template) => {
    template.insertForm.activeField.set(template.key)
  }
})
