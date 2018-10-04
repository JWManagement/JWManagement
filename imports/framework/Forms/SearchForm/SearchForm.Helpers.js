import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import RouteManager from '/imports/framework/Managers/RouteManager'

function generateRows (template) {
  template.rows.set(template.items.get().map((item) => {
    const row = {}

    template.columnDefinitions.forEach((column) => {
      let value = null

      if (column.name.indexOf('_') > 0) {
        let tmp = item

        for (let property of column.name.split('_')) {
          tmp = tmp[property]
        }

        value = tmp
      } else {
        value = item[column.name]
      }

      if (column.type === 'dropdown') {
        const keys = [
          FlowRouter.getRouteName().split('.')[0],
          'entity',
          column.name + 'Values',
          item[column.name].toLowerCase()
        ]

        value = TAPi18n.__(keys.join('.').replace(/_/g, '.'))
      }

      row[column.name] = value
    })

    return row
  }))
}

function generateMobileRows (template) {
  const mobileColumns = template.columnDefinitions
    .filter((column) => {
      return column.mobile === true
    })
    .map((column) => {
      return {
        name: column.name,
        translation: TAPi18n.__([
          FlowRouter.getRouteName().split('.')[0],
          'entity',
          column.name
        ].join('.').replace(/_/g, '.'))
      }
    })

  template.mobileRows.set(template.rows.get().map((row) => {
    return {
      link: FlowRouter.path(RouteManager.getLink('details'), RouteManager.getParams(template.entityId, row._id)),
      columns: mobileColumns.map((column) => {
        return {
          th: column.translation,
          td: row[column.name]
        }
      })
    }
  }))
}

function doSearch (template, retrieveAllResults = false) {
  template.isLoading.set(false)

  const routeName = FlowRouter.getRouteName()
  let params = FlowRouter.current().params
  params.searchString = template.searchString.get()
  params.limit = retrieveAllResults ? 0 : template.defaultResultsPerPage
  template.resultsShown.set(params.limit)

  Meteor.call(routeName, params, (e, r) => {
    if (e !== null) {
      alert(e); return
    }

    if (r !== null) {
      template.items.set(r.items)
      template.itemCount.set(r.total)
      template.isLoading.set(false)

      generateRows(template)
      generateMobileRows(template)
    }
  })
}

function updateSearch (template, search) {
  if (template.searchString.get() !== search) {
    template.searchString.set(search)
    Session.set(FlowRouter.getRouteName() + '.searchString', search)

    if (search === '' || search === '*' || search === '?' || search === '%') {
      template.searchString.set('.')
      template.regEx.set(new RegExp('.', 'i'))
    } else {
      template.regEx.set(new RegExp(search, 'i'))
    }

    doSearch(template)
  }
}

export { updateSearch, doSearch }
