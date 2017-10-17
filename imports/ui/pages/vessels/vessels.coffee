import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/components/addVesselModal/addVesselModal.coffee'
import '/imports/ui/components/editVesselModal/editVesselModal.coffee'

import './vessels.tpl.jade'

searchString = new ReactiveVar('')
isLoading = new ReactiveVar(false)
noResults = new ReactiveVar(true)
moreResultsAvailable = new ReactiveVar(false)
tooManyResultsAvailable = new ReactiveVar(false)
itemCount = new ReactiveVar
regEx = new ReactiveVar
table = null
projectId = ''
language = ''
handle = null

columns = [
	{ name: '_id', title: '', breakpoints: '', visible: false, filterable: false }
	{ name: 'name', title: TAPi18n.__('vessels.name'), breakpoints: '' }
	{ name: 'flag', title: TAPi18n.__('vessels.flag'), breakpoints: 'xs sm', filterable: false }
	{ name: 'type', title: TAPi18n.__('vessels.type'), breakpoints: 'xs sm', filterable: false }
	{ name: 'callsign', title: TAPi18n.__('vessels.callsign'), breakpoints: '' }
	{ name: 'eni', title: TAPi18n.__('vessels.eni'), breakpoints: 'xs' }
	{ name: 'imo', title: TAPi18n.__('vessels.imo'), breakpoints: 'xs' }
	{ name: 'mmsi', title: TAPi18n.__('vessels.mmsi'), breakpoints: 'xs' }
	{ name: 'lastVisit', title: TAPi18n.__('vessels.lastVisit'), breakpoints: 'all', filterable: false }
	{ name: 'harborGroup', title: TAPi18n.__('vessels.harborGroup'), breakpoints: 'all', filterable: false }
	{ name: 'nextVisit', title: TAPi18n.__('vessels.nextVisit'), breakpoints: 'all', filterable: false }
	{ name: 'languages', title: TAPi18n.__('vessels.languages'), breakpoints: 'all', filterable: false }
	{ name: 'comments', title: TAPi18n.__('vessels.comments'), breakpoints: 'all', filterable: false }
]

Template.vessels.helpers

	isLoading: -> isLoading.get()

	noResults: -> noResults.get()

	moreResultsAvailable: -> moreResultsAvailable.get()

	tooManyResultsAvailable: -> tooManyResultsAvailable.get()

Template.vessels.onCreated ->

	projectId = FlowRouter.getParam('projectId')
	searchString.set('')
	isLoading.set(false)
	noResults.set(true)
	moreResultsAvailable.set(false)
	tooManyResultsAvailable.set(false)
	itemCount.set(0)

	getRowCount = ->
		Vessels.find
			$or: [
				name: regEx.get()
			,
				callsign: regEx.get()
			,
				eni: regEx.get()
			,
				imo: regEx.get()
			,
				mmsi: regEx.get()
			]
		,
			fields: _id: 1
		.fetch().length

	getRows = ->
		vessels = Vessels.find
			$or: [
				name: regEx.get()
			,
				callsign: regEx.get()
			,
				eni: regEx.get()
			,
				imo: regEx.get()
			,
				mmsi: regEx.get()
			]
		,
			sort: name: 1
		.fetch()

		if vessels.length == 0
			noResults.set(true)
		else
			noResults.set(false)

		if vessels.length == 20
			moreResultsAvailable.set(true)
		else
			moreResultsAvailable.set(false)

		vessels.map (vessel) ->
			vessel.type = TAPi18n.__('vessels.types.' + vessel.type)
			vessel

	drawTable = -> Tracker.afterFlush ->
		table = FooTable.init '#table',
			columns: columns
			rows: getRows()
			empty: ''
			paging:
				enabled: true
				size: 20
			sorting:
				enabled: true
			editing:
				enabled: true
				alwaysShow: true
				allowAdd: false
				allowDelete: false
				editRow: (row) -> wrs ->
					FlowRouter.setQueryParams editVessel: row.value._id

	@autorun ->
		tempLanguage = FlowRouter.getParam('language')

		if language != tempLanguage
			language = tempLanguage

			$('#table').html('')
			drawTable()

	@autorun ->
		if searchString.get().length >= 3
			if handle.ready() && isLoading.get()
				isLoading.set(false)
				itemCount.set(getRowCount())

				table.loadRows(getRows())
		else if table?
			table.loadRows([])

	reloadRowsIfIsUpdate = ->
		if itemCount.get() != getRowCount()
			itemCount.set(getRowCount())

			if !isLoading.get()
				table.loadRows(getRows())

	Vessels.find().observeChanges
		added: reloadRowsIfIsUpdate
		changed: -> table.loadRows(getRows()) if !isLoading.get()
		removed: reloadRowsIfIsUpdate

updateSearch = (search) ->
	if searchString.get() != search
		if search.length >= 3
			isLoading.set(true)
			tooManyResultsAvailable.set(false)
			handle.stop() if handle?
			handle = Meteor.subscribe 'vessels', search, projectId
		else if search.length > 0
			noResults.set(false)
			moreResultsAvailable.set(false)
			tooManyResultsAvailable.set(true)
		else
			noResults.set(true)

		searchString.set(search)
		regEx.set(new RegExp('.*' + search + '.*', 'i'))

Template.vessels.events

	'keyup #search': (e) -> updateSearch(e.target.value)

	'change #search': (e) -> updateSearch(e.target.value)

	'click #addVessel': -> wrs -> FlowRouter.setQueryParams addVessel: true
