initDone = false

Template.publisherActions.helpers

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

Template.publisherActions.onCreated ->

	self = this
	initDone = false
	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		Meteor.subscribe 'tags', projectId
		Meteor.subscribe 'usersByProject', projectId

Template.publisherActions.onDestroyed ->

	$('#editPermissionsModal').modal('hide')
	$('#inviteUserModal').modal('hide')
	$('#uploadUserFileModal').modal('hide')

Template.publisherActions.events

	'click #uploadUserFile': ->
		wrs -> FlowRouter.setQueryParams uploadUserFile: true

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
			TAPi18n.__('profile.birthday')
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
				user.profile.bdate
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
