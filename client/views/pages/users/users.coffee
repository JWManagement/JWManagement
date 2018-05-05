initDone = false

Template.users.helpers

	getTags: ->
		projectId = FlowRouter.getParam 'projectId'
		project = Projects.findOne projectId
		project?.tags

	allMails: ->
		mails = []
		projectId = FlowRouter.getParam('projectId')
		users = Roles.getUsersInRole Permissions.member, projectId,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1

		for user in users.fetch().filter((u) -> u._id != 'adm').sort((u1, u2) -> u1.profile.lastname > u2.profile.lastname)
			mails.push user.profile.firstname + ' ' + user.profile.lastname + ' <' + user.profile.email + '>'

		mails.join ','

	allMailsWithSemicolon: ->
		mails = []
		projectId = FlowRouter.getParam('projectId')
		users = Roles.getUsersInRole Permissions.member, projectId,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1

		for user in users.fetch().filter((u) -> u._id != 'adm').sort((u1, u2) -> u1.profile.lastname > u2.profile.lastname)
			mails.push user.profile.firstname + ' ' + user.profile.lastname + ' <' + user.profile.email + '>'

		mails.join ';'

	allMailsThisTag: ->
		mails = []
		tagId = @_id
		projectId = FlowRouter.getParam('projectId')
		users = Roles.getUsersInRole Permissions.member, projectId,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1

		for user in users.fetch().filter((u) -> u._id != 'adm').sort((u1, u2) -> u1.profile.lastname > u2.profile.lastname)
			if Roles.userIsInRole user._id, Permissions.participant, tagId
				mails.push user.profile.firstname + ' ' + user.profile.lastname + ' <' + user.profile.email + '>'

		mails.join ','

	allMailsThisTagWithSemicolon: ->
		mails = []
		tagId = @_id
		projectId = FlowRouter.getParam('projectId')
		users = Roles.getUsersInRole Permissions.member, projectId,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1

		for user in users.fetch().filter((u) -> u._id != 'adm').sort((u1, u2) -> u1.profile.lastname > u2.profile.lastname)
			if Roles.userIsInRole user._id, Permissions.participant, tagId
				mails.push user.profile.firstname + ' ' + user.profile.lastname + ' <' + user.profile.email + '>'

		mails.join ';'

Template.users.onCreated ->

	self = this
	initDone = false
	projectId = FlowRouter.getParam('projectId')

	drawUserlist = -> if initDone
		Tracker.afterFlush ->
			users = Roles.getUsersInRole Permissions.member, projectId,
				fields: profile: 1, username: 1
				sort: 'profile.lastname': 1, 'profile.firstname': 1

			columns = [
				{ name: 'id', title: '', breakpoints: '', filterable: false }
				{ name: 'firstname', title: TAPi18n.__('input.firstname'), breakpoints: '' }
				{ name: 'lastname', title: TAPi18n.__('input.lastname'), breakpoints: '' }
				{ name: 'username', title: TAPi18n.__('input.username'), breakpoints: 'all' }
				{ name: 'email', title: TAPi18n.__('input.email'), breakpoints: 'xs' }
				{ name: 'telefon', title: TAPi18n.__('input.telefon'), breakpoints: 'xs sm' }
				{ name: 'congregation', title: TAPi18n.__('input.congregation'), breakpoints: 'xs sm' }
				{ name: 'languages', title: TAPi18n.__('input.languages'), breakpoints: 'all' }
				{ name: 'gender', title: TAPi18n.__('input.gender'), breakpoints: 'all' }
				{ name: 'pioneer', title: TAPi18n.__('profile.privilegeOfService'), breakpoints: 'all' }
				{ name: 'privilege', title: TAPi18n.__('profile.ministryPrivilege'), breakpoints: 'all' }
			]

			rows = []

			for user, index in users.fetch()
				rows.push
					id: index + 1
					firstname: user.profile.firstname
					lastname: user.profile.lastname
					username: user.username
					email: user.profile.email
					telefon: user.profile.telefon
					congregation: user.profile.congregation
					languages: user.profile.languages || '-'
					gender: {
						m: TAPi18n.__('profile._gender.brother')
						w: TAPi18n.__('profile._gender.sister')
					}[user.profile.gender] || TAPi18n.__('profile._gender.brother')
					pioneer: {
						auxiliary: TAPi18n.__('profile._privilegeOfService.auxiliaryPioneer')
						regular: TAPi18n.__('profile._privilegeOfService.pioneer')
						special: TAPi18n.__('profile._privilegeOfService.specialPioneer')
						circuit: TAPi18n.__('profile._privilegeOfService.circuitOverseer')
						bethelite: TAPi18n.__('profile._privilegeOfService.bethelite')
						ldc: TAPi18n.__('profile._privilegeOfService.fulltimeConstructionServant')
					}[user.profile.pioneer] || TAPi18n.__('profile.publisher')
					privilege: {
						servant: TAPi18n.__('profile._ministryPrivilege.ministerialServant')
						elder: TAPi18n.__('profile._ministryPrivilege.elder')
						coordinator: TAPi18n.__('profile._ministryPrivilege.coordinator')
						secretary: TAPi18n.__('profile._ministryPrivilege.secretary')
						serviceOverseer: TAPi18n.__('profile._ministryPrivilege.serviceOverseer')
					}[user.profile.privilege] || TAPi18n.__('profile.publisher')

			$('#userTable').html('').footable
				columns: columns
				rows: rows
				paging:
					enabled: true
					size: 15
				sorting:
					enabled: true
				filtering:
					enabled: true
					delay: 400
					placeholder: TAPi18n.__('users.search')
				state:
					enabled: true
					key: 'userTable'
				editing:
					enabled: true
					alwaysShow: true
					allowAdd: false
					editRow: (row) ->
						wrs -> FlowRouter.setQueryParams editUser: row.value.username
					deleteRow: (row) ->
						projectId = FlowRouter.getParam('projectId')
						username = row.value.username

						swalYesNo
							swal: 'delete.user'
							type: 'warning'
							close: false
							doConfirm: ->
								Meteor.call 'removeUserFromProject', projectId, username, (e) ->
									if e
										swal e.reason, '', 'error'
									else
										swal TAPi18n.__('users.deleted'), '', 'success'

	@autorun ->
		Meteor.subscribe 'tags', projectId
		handle = UserSubs.subscribe 'usersByProject', projectId
		if handle.ready()
			Meteor.users.find().observe
				added: drawUserlist
				changed: drawUserlist
				removed: drawUserlist

			initDone = true

			drawUserlist()

Template.users.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.users.onDestroyed ->

	$('#addUserModal').modal('hide')
	$('#editPermissionsModal').modal('hide')
	$('#inviteUserModal').modal('hide')
	$('#uploadUserFileModal').modal('hide')

Template.users.events

	'click #addNewUser': ->
		wrs -> FlowRouter.setQueryParams addUser: true

	'click #inviteUser': ->
		wrs -> FlowRouter.setQueryParams inviteUser: true

	'click .showAddresses': (e) ->
		window.prompt('Press ctrl/cmd + c to copy the mail addresses', $(e.target).closest('button').attr('addresses'));

	'click #exportUsers': ->
		users = Meteor.users.find({}, fields: services: 0, 'profile.available': 0, 'profile.vacations': 0)

		head = []
		head.push(
			TAPi18n.__('input.email')
			TAPi18n.__('input.firstname')
			TAPi18n.__('input.lastname')
			TAPi18n.__('input.gender')
			TAPi18n.__('profile.telefon')
			TAPi18n.__('profile.privilegeOfService')
			TAPi18n.__('profile.ministryPrivilege')
			TAPi18n.__('profile.congregation')
			TAPi18n.__('profile.languages')
			TAPi18n.__('input.username')
			TAPi18n.__('input.roles'))

		csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + head.join(';') + '\r\n'

		for user in users.fetch()
			row = []
			row.push(
				user.profile.email
				user.profile.firstname
				user.profile.lastname
				user.profile.gender
				user.profile.telefon
				user.profile.pioneer
				user.profile.privilege
				user.profile.congregation
				user.profile.languages
				user.username
				'"' + Object.keys(user.roles).filter((r) -> user.roles[r][0]?).map((r) -> r + '=' + user.roles[r][0]).join(';') + '"')

			csvContent += row.join(';') + '\r\n'

		encodedUri = encodeURI(csvContent)
		link = document.createElement('a')
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', 'users.csv')
		document.body.appendChild(link)

		link.click()
