import { handleValidationError } from '/imports/api/util/errorHandling.coffee'
import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './addVesselModal.tpl.jade'

isValidating = new ReactiveVar

Template.addVesselModal.onRendered ->

	$('#addVesselModal').modal('show')
	$('#addVesselModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams addVessel: null

	$('#datepicker').datepicker
		calendarWeeks: true
		maxViewMode: 0
		weekStart: 1
		language: TAPi18n.getLanguage()

Template.addVesselModal.events

	'submit form': (e, a) ->
		e.preventDefault()

		isValidating.set true

		name = $(e.target).find('[name=name]').val().trim()
		callsign = $(e.target).find('[name=callsign]').val().trim()
		eni = $(e.target).find('[name=eni]').val().trim()
		imo = $(e.target).find('[name=imo]').val().trim()
		mmsi = $(e.target).find('[name=mmsi]').val().trim()

		Meteor.call 'validateVesselInput',
			name: name
			callsign: callsign
			eni: eni
			imo: imo
			mmsi: mmsi
		, (e1) ->
			if e1
				handleValidationError e1
			else
				Vessels.methods.addVessel.call
					projectId: FlowRouter.getParam('projectId')
					name: name
					flag: $(e.target).find('[name=flag]').val().trim()
					type: $(e.target).find('[name=type]').val().trim()
					callsign: callsign
					eni: eni
					imo: imo
					mmsi: mmsi
					lastVisit: $(e.target).find('[name=lastVisit]').val().trim()
					nextVisit: $(e.target).find('[name=nextVisit]').val().trim()
					languages: $(e.target).find('[name=languages]').val()
				, (e2) ->
					isValidating.set true

					if e2
						handleError e2
					else
						$('#addVesselModal').modal('hide')
						$('#vesselSearch').val(name).keyup()
