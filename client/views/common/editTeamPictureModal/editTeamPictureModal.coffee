Template.editTeamPictureModal.helpers

	picture: ->
		Pictures.findOne
			projectId: FlowRouter.getParam('projectId')
			teamId: FlowRouter.getQueryParam('editTeamPicture')

	pictureClass: ->
		picture = Pictures.findOne
			projectId: FlowRouter.getParam('projectId')
			teamId: FlowRouter.getQueryParam('editTeamPicture')
		, fields: _id: 1

		'disabled' unless picture

Template.editTeamPictureModal.onRendered ->

	$('#beamerSelector').addClass('hidden')

	$('#editTeamPictureModal').modal('show')
	$('#editTeamPictureModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams editTeamPicture: undefined

Template.editTeamPictureModal.events

	'change #edit': (e) ->
		if e.target.files.length > 0
			picture = new FS.File e.target.files[0]
			picture.projectId = FlowRouter.getParam('projectId')
			picture.teamId = FlowRouter.getQueryParam('editTeamPicture')

			Meteor.call 'removeTeamPicture', picture.projectId, picture.teamId, handleError

			Pictures.insert picture, handleError

	'click #delete': (e) ->
		projectId = FlowRouter.getParam('projectId')
		teamId = FlowRouter.getQueryParam('editTeamPicture')

		Meteor.call 'removeTeamPicture', projectId, teamId, handleError
