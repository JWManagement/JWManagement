Template.editPermissionsModal.helpers

	getData: ->
		project = Projects.findOne FlowRouter.getParam('projectId'), fields: 'tags._id': 1, 'tags.name': 1
		user = Meteor.users.findOne username: FlowRouter.getQueryParam('editUser'),
			fields: 'profile.firstname': 1, 'profile.lastname': 1

		if project? && user?
			project['userId'] = user._id
			project['userName'] = user.profile.firstname + ' ' + user.profile.lastname
			project

	getPermission: (userId, groupId) ->
		role = Roles.getRolesForUser(userId, groupId)[0]

		{
			admin: TAPi18n.__('role.admin')
			shiftAdmin: TAPi18n.__('role.shiftAdmin')
			storeAdmin: TAPi18n.__('role.storeAdmin')
			member: TAPi18n.__('role.member')
			teamleader: TAPi18n.__('role.teamleader')
			substituteTeamleader: TAPi18n.__('role.substituteTeamleader')
			participant: TAPi18n.__('role.participant')
		}[role] || TAPi18n.__('role.nothing')

Template.editPermissionsModal.onCreated ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		handle = ProjectSubs.subscribe 'tags', projectId
		handle.ready Tracker.afterFlush ->
			$('#editPermissionsModal').modal('show')
			$('#editPermissionsModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams editUser: undefined

Template.editPermissionsModal.events

	'click #close': (e) ->
		if FlowRouter.getQueryParam('next') == 'addUser'
			$('#editPermissionsModal').modal('hide')
			wrs -> FlowRouter.setQueryParams addUser: true, next: undefined

	'click .changePermission': (e) ->
		role = $(e.target).attr('permission')
		projectId = FlowRouter.getParam('projectId')
		username = FlowRouter.getQueryParam('editUser')
		user = Meteor.users.findOne username: username,
			fields: _id: 1

		if user._id == Meteor.userId()
			swal TAPi18n.__('swal.ownPermission'), '', 'error'
		else
			Meteor.call 'changeProjectRole', projectId, user._id, role

	'click .changeTagPermission': (e) ->
		role = $(e.target).attr('permission')
		tagId = $(e.target).closest('.dropdown').attr('tagId')
		user = Meteor.users.findOne username: FlowRouter.getQueryParam('editUser'),
			fields: _id: 1

		if user?
			Meteor.call 'changeTagRole', tagId, user._id, role
