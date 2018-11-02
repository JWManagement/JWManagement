import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getKey, getTitle, getEntityTranslation } from '../../Helpers/Helpers'
import { hasError, getErrorClass, getEntityErrorTranslation } from '../../Helpers/Error'

import './UpdateForm.jade'
import './UpdateForm.scss'

import './Text/UpdateForm.Text'
import './Date/UpdateForm.Date'
import './Dropdown/UpdateForm.Dropdown'
import './Picker/UpdateForm.Picker'
import './Checkbox/UpdateForm.Checkbox'
import './Textbox/UpdateForm.Textbox'

const possibleUpdateTypes = ['date', 'checkbox', 'dropdown', 'picker', 'textbox']

Template.UpdateForm.helpers({
  getEntityTranslation,
  getKey,
  getTitle,
  hasError,
  getErrorClass,
  getEntityErrorTranslation,
  getBackLink () {
    return FlowRouter.path(Template.instance().backLink.get(), FlowRouter.current().params)
  },
  getSearchTranslation () {
    if (FlowRouter.getParam('key') != null) {
      const key = FlowRouter.getParam('key').replace(/_/g, '.') + 'Values'

      let routeNameParts = FlowRouter.getRouteName().split('.')
      routeNameParts.pop()
      routeNameParts.splice(1, 0, 'entity')

      let attributeParts = [key]
      attributeParts.push('placeholder')

      return TAPi18n.__(routeNameParts.concat(attributeParts).join('.'))
    }
  },
  isSearchEnabled () {
    return Template.instance().inputData.get().search === true && FlowRouter.getParam('key') != null
  },
  isReady () {
    return !Template.instance().isLoading.get() && !Template.instance().noResult.get()
  },
  isType (data, type) {
    return data.type === type
  },
  getInputData () {
    return Template.instance().inputData.get()
  }
})

Template.UpdateForm.onCreated(() => {
  const template = Template.instance()

  template.backLink = new ReactiveVar('')
  template.isLoading = new ReactiveVar(true)
  template.noResult = new ReactiveVar(true)
  template.inputData = new ReactiveVar({})
  template.inputType = new ReactiveVar('')
  template.searchText = new ReactiveVar('')

  template.updateEntity = (value) => {
    const routeName = FlowRouter.getRouteName()
    const params = FlowRouter.current().params
    const key = FlowRouter.getParam('key')

    Meteor.call(routeName, params, key, value, (e) => {
      if (e != null) {
        let hasOtherErrors = false
        let otherErrorMessage = null

        for (let reason of e.error.reason) {
          if (reason.name !== key.replace(/_/g, '.')) {
            hasOtherErrors = true
            otherErrorMessage = reason.message
            break
          }
        }

        if (hasOtherErrors) {
          alert(`There was an error with another field: ${otherErrorMessage}`)
        } else {
          if (e.error.error === 'validation-error' && e.error.reason.length > 0) {
            let inputData = template.inputData.get()
            inputData.error = e.error.reason[0].type
            template.inputData.set(inputData)
          } else {
            alert(e)
          }
        }
      }
    })
  }
})

Template.UpdateForm.onRendered(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.backLink.set(data.backLink)
  template.isLoading.set(true)
  template.noResult.set(true)
  template.inputData.set({ parentInstance: template })

  Meteor.call(data.getMethod, FlowRouter.current().params, (e, value) => {
    if (e == null) {
      let inputData = template.inputData.get()
      inputData.value = value
      template.inputData.set(inputData)
      template.noResult.set(false)
      template.isLoading.set(false)
    } else {
      alert('SERVER ERROR')
    }
  })

  data.fields.some((field) => {
    if (field.key === FlowRouter.getParam('key')) {
      let inputData = template.inputData.get()
      inputData.type = 'text'

      if (possibleUpdateTypes.indexOf(field.type) > -1) {
        inputData.type = field.type
      }

      if (inputData.type === 'date') {
        inputData.format = field.format
      }

      if (['dropdown', 'picker'].indexOf(inputData.type) > -1) {
        if ('allowedValues' in field) {
          inputData.allowedValues = field.allowedValues
        } else if ('allowedKeyValuesMethod' in field) {
          inputData.allowedKeyValuesMethod = field.allowedKeyValuesMethod
        }

        inputData.search = field.search || false
      }

      template.inputData.set(inputData)
      return true
    }
  })

  window.scrollTo(0, 0)
})

Template.UpdateForm.events({
  'submit form' (e) {
    e.preventDefault()
  },
  'keyup #search' () {
    const template = Template.instance()
    const value = $('#search').val()
    template.searchText.set(value)
  }
})
