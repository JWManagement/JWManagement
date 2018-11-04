Template.editMeetingPictureModal.helpers

	picture: ->
		Pictures.findOne
			projectId: FlowRouter.getParam('projectId')
			meetingId: FlowRouter.getQueryParam('editMeetingPicture')

	pictureClass: ->
		picture = Pictures.findOne
			projectId: FlowRouter.getParam('projectId')
			meetingId: FlowRouter.getQueryParam('editMeetingPicture')
		, fields: _id: 1

		'disabled' unless picture

Template.editMeetingPictureModal.onRendered ->

	$('#beamerSelector').addClass('hidden')

	$('#editMeetingPictureModal').modal('show')
	$('#editMeetingPictureModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams editMeetingPicture: undefined

Template.editMeetingPictureModal.onDestroyed ->

	$('#beamerSelector').removeClass('hidden')

Template.editMeetingPictureModal.events

	'change #edit': (e) ->
		if e.target.files.length > 0
			picture = new FS.File e.target.files[0]
			picture.projectId = FlowRouter.getParam('projectId')
			picture.meetingId = FlowRouter.getQueryParam('editMeetingPicture')

			Meteor.call 'removeMeetingPicture', picture.projectId, picture.meetingId, handleError

			Pictures.insert picture, handleError

	'click #delete': (e) ->
		projectId = FlowRouter.getParam('projectId')
		meetingId = FlowRouter.getQueryParam('editMeetingPicture')

		Meteor.call 'removeMeetingPicture', projectId, meetingId, handleError
