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
				{ name: 'localName', title: TAPi18n.__('input.firstname'), breakpoints: '' }
				{ name: 'lastname', title: TAPi18n.__('input.lastname'), breakpoints: '' }
				{ name: 'username', title: TAPi18n.__('input.username'), breakpoints: 'all' }
				{ name: 'email', title: TAPi18n.__('input.email'), breakpoints: 'xs' }
				{ name: 'telefon', title: TAPi18n.__('input.telefon'), breakpoints: 'xs sm' }
				{ name: 'congregation', title: TAPi18n.__('input.congregation'), breakpoints: 'xs sm' }
				{ name: 'languages', title: TAPi18n.__('input.languages'), breakpoints: 'all' }
				{ name: 'gender', title: TAPi18n.__('input.gender'), breakpoints: 'all' }
				{ name: 'pioneer', title: TAPi18n.__('profile.privilegeOfService'), breakpoints: 'all' }
				{ name: 'privilege', title: TAPi18n.__('profile.ministryPrivilege'), breakpoints: 'all' }
			]

			rows = []

			for user, index in users.fetch()
				rows.push
					id: index + 1
					firstname: user.profile.firstname
					lastname: user.profile.lastname
					username: user.username
					email: user.profile.email
					telefon: user.profile.telefon
					congregation: user.profile.congregation
					languages: user.profile.languages || '-'
					gender: {
						m: TAPi18n.__('profile._gender.brother')
						w: TAPi18n.__('profile._gender.sister')
					}[user.profile.gender] || TAPi18n.__('profile._gender.brother')
					pioneer: {
						auxiliary: TAPi18n.__('profile._privilegeOfService.auxiliaryPioneer')
						regular: TAPi18n.__('profile._privilegeOfService.pioneer')
						special: TAPi18n.__('profile._privilegeOfService.specialPioneer')
						circuit: TAPi18n.__('profile._privilegeOfService.circuitOverseer')
						bethelite: TAPi18n.__('profile._privilegeOfService.bethelite')
						ldc: TAPi18n.__('profile._privilegeOfService.fulltimeConstructionServant')
					}[user.profile.pioneer] || TAPi18n.__('profile.publisher')
					privilege: {
						servant: TAPi18n.__('profile._ministryPrivilege.ministerialServant')
						elder: TAPi18n.__('profile._ministryPrivilege.elder')
						coordinator: TAPi18n.__('profile._ministryPrivilege.coordinator')
						secretary: TAPi18n.__('profile._ministryPrivilege.secretary')
						serviceOverseer: TAPi18n.__('profile._ministryPrivilege.serviceOverseer')
					}[user.profile.privilege] || TAPi18n.__('profile.publisher')

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
