import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'
import i18next from 'i18next'
import moment from 'moment'

import RouteManager from '../../Managers/RouteManager'
import { getTitle } from '../../Helpers/Helpers'
import { updateSearch, doSearch } from './SearchForm.Helpers'

import './SearchForm.jade'
import './SearchForm.scss'

Template.SearchForm.helpers({
  getTitle,
  getBackLink () {
    return FlowRouter.path(Template.instance().backLink, FlowRouter.current().params)
  },
  getTranslation (key) {
    return i18next.t(FlowRouter.getRouteName() + '.' + key.replace(/_/g, '.'))
  },
  valueOrDash (value) {
    return (value !== '' ? value : '-')
  },
  isLoading () {
    return Template.instance().isLoading.get()
  },
  noResults () {
    const template = Template.instance()
    return !template.isLoading.get() && template.items.get().length === 0
  },
  resultsMobile () {
    const template = Template.instance()
    return template.mobileRows.get()
  },
  moreResultsAvailable () {
    const template = Template.instance()
    const resultsShown = template.resultsShown.get()
    return template.itemCount.get() > resultsShown && resultsShown > 0
  },
  totalFound () {
    const template = Template.instance()
    return template.itemCount.get()
  },
  resultsShown () {
    return Template.instance().resultsShown.get()
  },
  allowCreate () {
    return Template.instance().allowCreate
  },
  isCreating () {
    return Template.instance().isCreating.get()
  }
})

Template.SearchForm.onCreated(() => {
  const template = Template.instance()
  const data = Template.currentData().data

  template.translatedAttributes = data.translatedAttributes
  template.columnDefinitions = data.columns
  template.entityId = data.entityId
  template.backLink = data.backLink
  template.allowCreate = data.allowCreate

  template.searchString = new ReactiveVar(Session.get(FlowRouter.getRouteName() + '.searchString') || '')
  template.isLoading = new ReactiveVar(false)
  template.isCreating = new ReactiveVar(false)
  template.itemCount = new ReactiveVar(0)
  template.items = new ReactiveVar([])
  template.regEx = new ReactiveVar(new RegExp(''))
  template.table = null
  template.defaultResultsPerPage = 20
  template.resultsShown = new ReactiveVar(template.defaultResultsPerPage)

  template.rows = new ReactiveVar([])
  template.mobileRows = new ReactiveVar([])
})

Template.SearchForm.onRendered(() => {
  const template = Template.instance()
  const columns = template.columnDefinitions.map((column) => {
    let routeParts = FlowRouter.getRouteName().split('.')
    routeParts.pop()
    const translationString = routeParts.concat(['entity', column.name]).join('.').replace(/_/g, '.')

    column.title = i18next.t(translationString)
    return column
  })

  template.autorun(() => {
    const rows = template.rows.get()
      .map((row) => {
        for (let column of columns) {
          if (column.type === 'date') {
            row[column.name] = moment(row[column.name]).format(column.format)

            if (row[column.name] === 'Invalid date') {
              row[column.name] = ''
            }
          }
        }
        return row
      })

    Tracker.afterFlush(() => {
      $('#table').html('')

      template.table = FooTable.init('#table', {
        columns: columns,
        rows: rows,
        empty: '',
        showToggle: false,
        paging: {
          enabled: true,
          size: template.defaultResultsPerPage
        },
        sorting: {
          enabled: true
        }
      })
    })
  })

  const searchString = template.searchString.get()
  $('#search').val(searchString)
  template.searchString.set(null)

  updateSearch(template, searchString)
})

Template.SearchForm.events({
  'click #more' (e, template) {
    doSearch(template, true)
  },
  'click .results-desktop tbody tr:not(.footable-empty)' (e, template) {
    const entityId = $(e.target).closest('tr').find('td').first().html()

    RouteManager.navigateToDetails(template.entityId, entityId)
  },
  'click .navbar-create' () {
    RouteManager.navigateToInsert()
  },
  'keyup #search' (e, template) {
    updateSearch(template, e.target.value)
  },
  'change #search' (e, template) {
    updateSearch(template, e.target.value)
  }
})
