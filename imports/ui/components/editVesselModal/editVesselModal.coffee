import { handleValidationError } from '/imports/api/util/errorHandling.coffee'
import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './editVesselModal.tpl.jade'

isValidating = new ReactiveVar

Template.editVesselModal.helpers

	getVessel: -> Vessels.findOne(FlowRouter.getQueryParam('editVessel'))

	isValidating: -> isValidating.get()

Template.editVesselModal.onCreated ->

	Meteor.subscribe 'vessel', FlowRouter.getQueryParam('editVessel')

Template.editVesselModal.onRendered ->

	$('#editVesselModal').modal('show')
	$('#editVesselModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams editVessel: null

	$('#datepicker').datepicker
		calendarWeeks: true
		maxViewMode: 0
		weekStart: 1
		format: 'dd.mm.yyyy'
		language: TAPi18n.getLanguage()

Template.editVesselModal.events

	'submit form': (e, a) ->
		e.preventDefault()

		isValidating.set true

		input =
			_id: FlowRouter.getQueryParam('editVessel')
			projectId: FlowRouter.getParam('projectId')
			name: $(e.target).find('[name=name]').val().trim()
			flag: $(e.target).find('[name=flag]').val().trim()
			type: $(e.target).find('[name=type]').val().trim()
			callsign: $(e.target).find('[name=callsign]').val().trim()
			eni: $(e.target).find('[name=eni]').val().trim()
			imo: $(e.target).find('[name=imo]').val().trim()
			mmsi: $(e.target).find('[name=mmsi]').val().trim()
			lastVisit: $(e.target).find('[name=lastVisit]').val().trim()
			nextVisit: $(e.target).find('[name=nextVisit]').val().trim()
			languages: $(e.target).find('[name=languages]').val()

		console.log input._id

		Meteor.call 'validateVesselInput',
			_id: input._id
			name: input.name
			callsign: input.callsign
			eni: input.eni
			imo: input.imo
			mmsi: input.mmsi
		, (e1) ->
			if e1
				isValidating.set false

				handleValidationError e1
			else
				Vessels.methods.editVessel.call input, (e2) ->
					isValidating.set false

					if e2
						handleError e2
					else
						$('#addVesselModal').modal('hide')
						$('#vesselSearch').val(name).keyup()
