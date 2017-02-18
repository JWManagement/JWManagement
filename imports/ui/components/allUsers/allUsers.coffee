import './allUsers.tpl.jade'

Template.allUsers.helpers

	userCount: -> Meteor.users.find({}, fields: _id: 1).count()

Template.allUsers.onCreated -> Tracker.afterFlush => @autorun =>

	users = Template.currentData().users
	rows = []
	columns = [
		{ name: 'id', title: '#', breakpoints: '', filterable: false }
		{ name: 'firstname', title: 'First name', breakpoints: '' }
		{ name: 'lastname', title: 'Surname' , breakpoints: '' }
		{ name: 'username', title: 'Username' , breakpoints: '' }
		{ name: 'action', title: 'Action' , breakpoints: '' }
		{ name: 'projects', title: 'Projects' , visible: false }
	]

	for user, index in users
		projects = []

		for group in Object.keys user.roles
			projects.push group + '=' + user.roles[group]

		rows.push
			id: index + 1
			username: user.username
			firstname: user.profile.firstname
			lastname: user.profile.lastname
			action: '<a class="impersonate" data-id="' + user._id + '" data-lang="' + user.profile.language + '" href>Impersonate...</a>'
			projects: projects.join ';'

	$('#userTable').html('').footable
		columns: columns
		rows: rows
		paging: enabled: false
		sorting: enabled: true
		paging:
			enabled: true
			size: 15
		filtering:
			enabled: true
			delay: 400
			placeholder: 'Search...'

Template.allUsers.events

	'click .impersonate': (e) ->
		userId = $(e.target).attr('data-id')
		userLang = $(e.target).attr('data-lang')

		Meteor.call 'getImpersonateToken', userId, (e, token) ->
			Accounts.callLoginMethod methodArguments: [ impToken: token ]

			FlowRouter.go 'home', language: userLang
