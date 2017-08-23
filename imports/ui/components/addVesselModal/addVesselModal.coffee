import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './addVesselModal.tpl.jade'

Template.addVesselModal.onRendered ->

	$('#addVesselModal').modal('show')
	$('#addVesselModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams addVessel: null

Template.addVesselModal.events

	'submit form': (e, a) ->
		e.preventDefault()

		$('#addVesselAction').attr('disabled', 'disabled')

		name = $(e.target).find('[name=name]').val().trim()

		Vessels.methods.addVessel.call
			projectId: FlowRouter.getParam('projectId')
			name: name
			flag: $(e.target).find('[name=flag]').val().trim()
			type: $(e.target).find('[name=type]').val().trim()
			callsign: $(e.target).find('[name=callsign]').val().trim()
			eni: $(e.target).find('[name=eni]').val().trim()
			imo: $(e.target).find('[name=imo]').val().trim()
			mmsi: $(e.target).find('[name=mmsi]').val().trim()
			lastVisit: $(e.target).find('[name=lastVisit]').val().trim()
			nextVisit: $(e.target).find('[name=nextVisit]').val().trim()
			languages: $(e.target).find('[name=languages]').val()

		$('#addVesselModal').modal('hide')
		$('#vesselSearch').val(name).keyup()
