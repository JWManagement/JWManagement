Template.addUserModal.onRendered ->

	$('#addUserModal').modal('show')
	$('#addUserModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams addUser: undefined

Template.addUserModal.events

	'change [name=email]': (e) ->
		email = $('#email').val().toLowerCase()

	'click #uploadUserFile': ->
		$('#addUserModal').modal('hide')
		wrs -> FlowRouter.setQueryParams addUser: undefined, uploadUserFile: true

	'submit form': (e, a) ->
		e.preventDefault()

		email = e.target.email.value.toLowerCase()
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
