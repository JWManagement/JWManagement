import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './vessels.tpl.jade'

Template.vessels.onCreated ->

	initDone = false
	projectId = FlowRouter.getParam('projectId')

	drawVesselList = -> if initDone
		Tracker.afterFlush ->
			vessels = Vessels.find
				localName: 1
			, sort:
				localName: 1

			columns = [
				{ name: 'id', title: '', breakpoints: '', filterable: false }
				{ name: 'localName', title: TAPi18n.__('vessels.localName'), breakpoints: '' }
				{ name: 'flag', title: TAPi18n.__('vessels.flag'), breakpoints: '' }
				{ name: 'type', title: TAPi18n.__('vessels.type'), breakpoints: '' }
				{ name: 'callsign', title: TAPi18n.__('vessels.callsign'), breakpoints: '' }
				{ name: 'eni', title: TAPi18n.__('vessels.eni'), breakpoints: '' }
				{ name: 'imo', title: TAPi18n.__('vessels.imo'), breakpoints: '' }
				{ name: 'mmsi', title: TAPi18n.__('vessels.mmsi'), breakpoints: '' }
				{ name: 'lastVisit', title: TAPi18n.__('vessels.lastVisit'), breakpoints: '' }
				{ name: 'contactPoint', title: TAPi18n.__('vessels.contactPoint'), breakpoints: '' }
				{ name: 'nextVisit', title: TAPi18n.__('vessels.nextVisit'), breakpoints: '' }
			]

			rows = []

			for vessel, index in vessels.fetch()
				rows.push
					id: index + 1
					localName: user.localName

			$('#vesselTable').html('').footable
				columns: columns
				rows: rows
				paging:
					enabled: true
					size: 15
				sorting:
					enabled: true
				filtering:
					enabled: true
					delay: 400
					placeholder: TAPi18n.__('vessels.search')
				state:
					enabled: true
					key: 'vesselTable'
				editing:
					enabled: true
					alwaysShow: true
					allowAdd: false
					editRow: (row) ->
						wrs -> FlowRouter.setQueryParams editVessels: row.value._id

	@autorun ->
		handle = Meteor.subscribe 'vessels', projectId
		if handle.ready()
			Vessels.find().observe
				added: drawVesselList
				changed: drawVesselList
				removed: drawVesselList

			initDone = true

			drawVesselList()
