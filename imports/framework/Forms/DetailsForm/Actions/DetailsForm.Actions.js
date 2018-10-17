import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { getEntityTranslation } from '../../../Helpers/Helpers'

import './DetailsForm.Actions.jade'

Template.DetailsFormActions.helpers({
  getEntityTranslation,
  isType (action, type) {
    return action.type === type
  },
  getActionPath (action) {
    return FlowRouter.path(
      action.route,
      FlowRouter.current().params)
  }
})

Template.DetailsFormActions.onCreated(() => {})

Template.DetailsFormActions.onRendered(() => {})

Template.DetailsFormActions.onDestroyed(() => {})

Template.DetailsFormActions.events({
  'click .confirm-button' (e) {
    const key = $(e.target).attr('key')
    const method = $(e.target).attr('method')
    const route = $(e.target).attr('route')

    let messagePathParts = FlowRouter.getRouteName().split('.')
    messagePathParts.pop()
    messagePathParts.splice(1, 0, 'entity')
    messagePathParts.push(key + 'Confirmation')

    if (confirm(TAPi18n.__(messagePathParts.join('.').replace(/_/g, '.')))) {
      Meteor.call(method, FlowRouter.current().params, (error) => {
        if (error == null) {
          FlowRouter.go(FlowRouter.path(route, FlowRouter.current().params))
        } else {
          alert('SERVER ERROR')
        }
      })
    }
  }
})
