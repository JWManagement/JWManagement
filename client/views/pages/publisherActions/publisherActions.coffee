import i18next from 'i18next'

initDone = new ReactiveVar(false)

Template.publisherActions.helpers

	isLoading: -> !initDone.get()

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
	initDone.set(false)
	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		Meteor.subscribe 'tags', projectId
		userHandle = Meteor.subscribe 'usersByProject', projectId

		if userHandle.ready()
			initDone.set(true)

Template.publisherActions.onDestroyed ->

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
			i18next.t('input.email')
			i18next.t('input.firstname')
			i18next.t('input.lastname')
			i18next.t('input.gender')
			i18next.t('profile.telefon')
			i18next.t('profile.privilegeOfService')
			i18next.t('profile.ministryPrivilege')
			i18next.t('profile.congregation')
			i18next.t('profile.language')
			i18next.t('profile.languages')
			i18next.t('role.role')
			'id'
		)

		csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + head.join(';') + '\r\n'

		for user in users.fetch() when user._id != 'adm'
			if user.profile.language == 'en'
				user.profile.language = 'en-US'

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
				user.profile.language
				user.profile.languages
				'"' + Object.keys(user.roles).filter((r) -> user.roles[r][0]?).map((r) -> r + '=' + user.roles[r][0]).join(';') + '"'
				user._id
			)

			csvContent += row.join(';') + '\r\n'

		encodedUri = encodeURI(csvContent)
		link = document.createElement('a')
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', 'users.csv')
		document.body.appendChild(link)

		link.click()
