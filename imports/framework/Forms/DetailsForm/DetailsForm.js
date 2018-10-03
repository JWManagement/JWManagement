import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'
import moment from 'moment'

import './DetailsForm.jade'
import './DetailsForm.scss'

import './Actions/DetailsForm.Actions'
import './Checkbox/DetailsForm.Checkbox'
import './Date/DetailsForm.Date'
import './Dropdown/DetailsForm.Dropdown'
import './DropdownArray/DetailsForm.Array.Dropdown'
import './Email/DetailsForm.Email'
import './EntityArray/DetailsForm.Array.Entity'
import './EntitySeeAllArray/DetailsForm.Array.EntitySeeAll'
import './Link/DetailsForm.Link'
import './LinkArray/DetailsForm.Array.Link'
import './LinkSeeAllArray/DetailsForm.Array.LinkSeeAll'
import './Navigation/DetailsForm.Navigation'
import './Phone/DetailsForm.Phone'
import './Text/DetailsForm.Text'
import './Textbox/DetailsForm.Textbox'
import './Header/DetailsForm.Header'

import {
  getValue,
  isType,
  loadData,
  hasPermissionToSee
} from '/imports/framework/Forms/DetailsForm/DetailsForm.Helpers'

Template.DetailsForm.helpers({
  getValue (definition, entity) {
    const array = getValue(definition, entity)

    if (definition.maxItemsShown) {
      return array.slice(0, definition.maxItemsShown)
    }

    return array
  },
  hasMoreItems (definition, entity) {
    if (definition.maxItemsShown) {
      const array = getValue(definition, entity)

      return array.length > definition.maxItemsShown
    }

    return false
  },
  isEmptyArray (field) {
    const template = Template.instance()
    const value = getValue(field, template.item.get())
    return value.length == 0
  },
  getSectionTranslation (key) {
    return TAPi18n.__(FlowRouter.getRouteName() + '.sections.' + key.replace(/_/g, '.'))
  },
  getBackgroundColor (section) {
    return (section.background != null ? section.background : '')
  },
  isType,
  getItem () {
    const template = Template.instance()
    return template.item.get()
  },
  getInstance () {
    return Template.instance()
  },
  isLoading () {
    return Template.instance().isLoading.get()
  },
  noResult () {
    return Template.instance().noResult.get()
  },
  isSectionVisible (section) {
    if (section.contents && section.contents.length > 0) {
      for (let definition of section.contents) {
        if (hasPermissionToSee(definition)) {
          return true
        }
      }
      return false
    }
    return true
  },
  hasPermissionToSee,
  sections () {
    const template = Template.instance()
    const item = template.item.get()

    if (item != null) {
      return template.sections.map((section) => {
        if (section.contents != null) {
          section.contents = section.contents.map((content) => {
            if ('canUpdate' in content) {
              if (content.canUpdate == 'author') {
                content.readonly = item.createdBy != Meteor.userId()
              }
            }
            if (content.type == 'array') {
              if ('action' in content.item && 'canDo' in content.item.action) {
                if (content.item.action.canDo == 'author' && item.createdBy != Meteor.userId()) {
                  delete content.item.action
                }
              }
            }
            return content
          })
        }
        if (section.actions != null) {
          section.actions = section.actions.filter((action) => {
            if ('canSee' in action && action.canSee == 'author') {
              if (item.createdBy != Meteor.userId()) {
                return false
              }
            }
            return true
          })
        }
        return section
      })
        .filter((section) =>
          ('contents' in section && section.contents.length > 0) ||
        ('actions' in section && section.actions.length > 0) ||
        ('type') in section && section.type == 'header')
    }

    return template.sections
  },
  header () {
    return Template.instance().header
  },
  getProperty (entity, field) {
    if (field.type == 'dropdown') {
      return TAPi18n.__('language._' + entity._id.toUpperCase())
    }

    if (field.key in entity) {
      const value = entity[field.key]

      if (field.type == 'date') {
        if (value != null) {
          const uiFormat = TAPi18n.__('dateFormat.' + field.uiFormat)
          const dbFormat = field.dbFormat

          return moment(value, dbFormat).format(uiFormat)
        }
        return ''
      }
      return entity[field.key]
    }
  },
  getNoElementsTranslation (item) {
    let translationString = []

    if (item.action) {
      if (item.action.type == 'route') {
        translationString = item.action.route.split('.')
      } else if (item.action.type == 'method') {
        translationString = item.action.method.split('.')
      }
    } else {
      translationString = item.link.split('.')
    }

    translationString.pop()
    translationString.splice(1, 0, 'entity')
    translationString.push('noElements')

    return TAPi18n.__(translationString.join('.').replace(/_/g, '.'))
  }
})

Template.DetailsForm.onCreated(() => {
  const template = Template.instance()

  template.sections = []
  template.header = {}
  template.isLoading = new ReactiveVar(true)
  template.noResult = new ReactiveVar(false) // TODO: is this working?
  template.item = new ReactiveVar({})
})

Template.DetailsForm.onRendered(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.sections = data.sections
  template.header = data.header
  template.getMethod = data.getMethod

  template.isLoading.set(true)
  template.noResult.set(false)
  template.item.set({})

  if (data.refreshRateInSeconds) {
    template.intervalHandle = setInterval(function () {
      loadData(template)
    }, data.refreshRateInSeconds * 1000)
  } else {
    loadData(template)
  }

  window.scrollTo(0, 0)
})

Template.DetailsForm.onDestroyed(() => {
  const template = Template.instance()

  if (template.intervalHandle) {
    clearInterval(template.intervalHandle)
  }
})

Template.DetailsForm.events({})
