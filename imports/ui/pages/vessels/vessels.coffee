import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/components/addVesselModal/addVesselModal.coffee'
import '/imports/ui/components/editVesselModal/editVesselModal.coffee'

import './vessels.tpl.jade'

searchString = new ReactiveVar

Template.vessels.onCreated ->

	initDone = false
	projectId = FlowRouter.getParam('projectId')

	drawVesselList = -> if initDone
		Tracker.afterFlush ->
			vessels = Vessels.find {}, sort: name: 1

			columns = [
				{ name: '_id', title: '', breakpoints: '', visible: false, filterable: false }
				{ name: 'id', title: '#', breakpoints: '', filterable: false }
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

			rows = []

			for vessel, index in vessels.fetch()
				rows.push
					_id: vessel._id
					id: index + 1
					name: vessel.name
					flag: vessel.flag
					type: TAPi18n.__('vessels.types.' + vessel.type)
					callsign: vessel.callsign
					eni: vessel.eni
					imo: vessel.imo
					mmsi: vessel.mmsi
					lastVisit: vessel.lastVisit
					harborGroup: vessel.harborGroup
					nextVisit: vessel.nextVisit
					languages: vessel.languages
					comments: vessel.comments

			$('#vesselTable').html('').footable
				columns: columns
				rows: rows
				paging:
					enabled: true
					size: 15
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
		FlowRouter.getParam('language') # redraw with new language

		handle = Meteor.subscribe 'vessels', searchString.get()
		if handle.ready()
			Vessels.find().observe
				added: drawVesselList
				changed: drawVesselList
				removed: drawVesselList

			initDone = true

			drawVesselList()

Template.vessels.events

	'keyup #vesselSearch': (e) ->
		searchString.set(e.target.value)

	'click #addVessel': ->
		wrs -> FlowRouter.setQueryParams addVessel: true
