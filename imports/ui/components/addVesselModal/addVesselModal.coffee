import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './addVesselModal.tpl.jade'

Template.addVesselModal.onRendered ->

	$('#addVesselModal').modal('show')
	$('#addVesselModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams addVessel: undefined

Template.addVesselModal.events

	'submit form': (e, a) ->
		e.preventDefault()

		Vessels.methods.addVessel.call
			projectId: FlowRouter.getParam('projectId')
			localName: $(e.target).find('[name=localName]').val().trim()
			flag: $(e.target).find('[name=flag]').val().trim()
			type: $(e.target).find('[name=type]').val().trim()
			callsign: $(e.target).find('[name=callsign]').val().trim()
			eni: $(e.target).find('[name=eni]').val().trim()
			imo: $(e.target).find('[name=imo]').val().trim()
			mmsi: $(e.target).find('[name=mmsi]').val().trim()
			lastVisit: $(e.target).find('[name=lastVisit]').val().trim()
			nextVisit: $(e.target).find('[name=nextVisit]').val().trim()

		FlowRouter.setParams addVessel: undefined
