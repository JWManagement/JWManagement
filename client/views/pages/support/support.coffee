initDone = false

Template.support.helpers

Template.support.onCreated ->

	self = this

	drawProjectlist = -> if initDone
		Tracker.afterFlush ->
			projects = Projects.find {},
				fields: name: 1
			,
				sort: name: 1

			rows = []
			columns = [
				{ name: 'id', title: '#', breakpoints: '', filterable: false }
				{ name: '_id', title: 'ID', breakpoints: '' }
				{ name: 'name', title: 'Name' , breakpoints: '' }
				{ name: 'showAdmins', title: 'Action' , breakpoints: '' }
			]

			for project, index in projects.fetch()
				rows.push
					id: index + 1
					_id: project._id
					name: project.name
					showAdmins: '<a class="showAdmins" data-id="' + project._id + '" href>Show admins...</a>'

			$('#projectTable').html('').footable
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

	drawUserlist = -> if initDone
		Tracker.afterFlush ->
			users = Meteor.users.find {},
				fields:
					roles: 1
					username: 1
					'profile.firstname': 1
					'profile.lastname': 1
					'profile.language': 1
			,
				sort:
					'profile.lastname': 1
					'profile.firstname': 1

			rows = []
			columns = [
				{ name: 'id', title: '#', breakpoints: '', filterable: false }
				{ name: 'firstname', title: 'First name', breakpoints: '' }
				{ name: 'lastname', title: 'Surname' , breakpoints: '' }
				{ name: 'username', title: 'Username' , breakpoints: '' }
				{ name: 'action', title: 'Action' , breakpoints: '' }
				{ name: 'projects', title: 'Projects' , visible: false }
			]

			for user, index in users.fetch()
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

	@autorun ->
		handle = ProjectSubs.subscribe 'support'
		if handle.ready()
			Projects.find().observe
				added: drawProjectlist
				changed: drawProjectlist
				removed: drawProjectlist

			Meteor.users.find().observe
				added: drawUserlist
				changed: drawUserlist
				removed: drawUserlist

			initDone = true

			drawProjectlist()
			drawUserlist()

Template.support.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.support.onDestroyed ->

Template.support.events

	'click .impersonate': (e) ->
		userId = $(e.target).attr('data-id')
		userLang = $(e.target).attr('data-lang')

		Meteor.call 'getImpersonateToken', userId, (e, token) ->
			Accounts.callLoginMethod methodArguments: [ impToken: token ]

			FlowRouter.go 'home', language: userLang

	'click .showAdmins': (e) ->
		projectId = $(e.target).attr('data-id')

		$('#userTable .footable-filtering button').click()
		$('#userTable .footable-filtering input[type="text"]').val projectId + '=admin'
		$('#userTable .footable-filtering button').click()
