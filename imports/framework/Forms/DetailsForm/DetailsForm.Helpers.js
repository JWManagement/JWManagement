import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { TAPi18n } from 'meteor/tap:i18n'

import RoleManager from '/imports/framework/Managers/RoleManager'
import RouteManager from '/imports/framework/Managers/RouteManager'

function loadData (template) {
  if (template.getMethod !== null) {
    Meteor.call(template.getMethod, FlowRouter.current().params, (e, entity) => {
      if (e === null) {
        template.item.set(entity)
        template.noResult.set(false)
        template.isLoading.set(false)
      } else {
        alert('SERVER ERROR')
      }
    })
  } else {
    template.item.set({})
    template.noResult.set(false)
    template.isLoading.set(false)
  }
}

function getValue (definition, entity) {
  const key = definition.key
  let value = entity[key]

  if (key.indexOf('_') > 0) {
    value = entity

    for (let property of key.split('_')) {
      if (property in value) {
        value = value[property]
      } else {
        return ''
      }
    }
  }

  return value
}

function getKey (definition) {
  if (definition.linkedKey !== null) {
    return definition.linkedKey
  }

  return definition.key
}

function isType (field, type) {
  return field && field.type === type
}

function hasPermissionToSee (definition) {
  let hasRole = true
  let customFulfilled = true

  if (definition.canSee !== null) {
    const projectId = FlowRouter.getParam('projectId')
    hasRole = RoleManager.hasPermission(projectId, definition.canSee)
  }

  if (definition.custom !== null) {
    const template = Template.instance()
    const item = template.item.get()
    customFulfilled = definition.custom(item)
  }

  return hasRole && customFulfilled
}

function defaultClickHandler (e) {
  const $e = $(e.target).closest('.input')
  const key = $e.attr('key')
  const link = $e.attr('link')

  if (link !== null) {
    let params = FlowRouter.current().params

    if (key !== null) {
      params.key = key
    }

    FlowRouter.go(FlowRouter.path(link, params))
  } else {
    RouteManager.navigateToUpdate(key)
  }
}

function getValueForSeeAllItems (definition, entity) {
  const array = getValue(definition, entity)
  const moreItemsCount = array.length - definition.maxItemsShown
  let messagePathParts = FlowRouter.getRouteName().split('.')

  messagePathParts.pop()
  messagePathParts.splice(1, 0, 'entity')
  messagePathParts.push(definition.key)
  messagePathParts.push('seeAllItems')

  return TAPi18n.__(messagePathParts.join('.'), { count: moreItemsCount })
}

function clickHandlerForSeeAllItems (e) {
  e.stopPropagation()

  const data = Template.currentData()
  let params = FlowRouter.current().params
  const route = data.definition.allItemsRoute

  FlowRouter.go(FlowRouter.path(route, params))
}

export {
  loadData,
  getValue,
  getKey,
  isType,
  hasPermissionToSee,
  defaultClickHandler,
  getValueForSeeAllItems,
  clickHandlerForSeeAllItems
}
