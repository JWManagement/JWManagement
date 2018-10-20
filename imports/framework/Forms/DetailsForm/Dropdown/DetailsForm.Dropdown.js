import { Template } from 'meteor/templating'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getValue, getKey, defaultClickHandler } from '../DetailsForm.Helpers'
import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Dropdown.jade'

Template.DetailsFormDropdown.helpers({
  getEntityTranslation,
  getKey,
  getValue (definition, entity) {
    const value = getValue(definition, entity)

    if (!value) {
      return ''
    }

    let routeNameParts = FlowRouter.getRouteName().split('.')
    routeNameParts.pop()
    routeNameParts.splice(1, 0, 'entity')
    routeNameParts.push(definition.key.replace(/_/g, '.') + 'Values')
    routeNameParts.push(value)

    return TAPi18n.__(routeNameParts.join('.'))
  }
})

Template.DetailsFormDropdown.onCreated(() => {})

Template.DetailsFormDropdown.onRendered(() => {})

Template.DetailsFormDropdown.onDestroyed(() => {})

Template.DetailsFormDropdown.events({
  'click .input': defaultClickHandler
})
