multipleUsernames = new Tracker.Dependency
usernameList = []

Template.addUserModal.helpers

	multipleUsernames: ->
		multipleUsernames.depend()
		usernameList

Template.addUserModal.onRendered ->

	$('#addUserModal').modal('show')
	$('#addUserModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams addUser: undefined

Template.addUserModal.events

	'change [name=email]': (e) ->
		email = $('#email').val()

		Meteor.call 'getUsernamesForEmail', email, (err, res) ->
			if err
				handleError err
			else
				usernameList = res
				multipleUsernames.changed()

	'click #uploadUserFile': ->
		$('#addUserModal').modal('hide')
		wrs -> FlowRouter.setQueryParams addUser: undefined, uploadUserFile: true

	'click #addExistingUser': (e) ->
		projectId = FlowRouter.getParam('projectId')
		userId = $(e.target).attr('userId')
		username = $(e.target).attr('username')

		Meteor.call 'changeProjectRole', projectId, userId, 'member'

		project = Projects.findOne projectId
		if project? && project.tags
			for tag in project.tags
				Meteor.call 'changeTagRole', tag._id, userId, 'participant'

		$('#addUserModal').modal('hide')
		wrs -> FlowRouter.setQueryParams editUser: username


	'submit form': (e, a) ->
		e.preventDefault()

		email = e.target.email.value
		firstname = e.target.firstname.value
		lastname = e.target.lastname.value
		gender = e.target.gender.value

		Meteor.call 'createAccount',
			username: Random.id 5
			password: ''
			profile:
				firstname: firstname
				lastname: lastname
				email: email
				gender: gender
				language: TAPi18n.getLanguage()
		, FlowRouter.getParam('projectId')

		swal(TAPi18n.__('swal.add.user.title'), TAPi18n.__('swal.add.user.text'), 'success')
		e.target.reset()
