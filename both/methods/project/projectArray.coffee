Meteor.methods

	addProjectItem: (projectId, array, name) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		if array == 'tags'
			itemId = Random.id 6
		else if array == 'teams'
			itemId = Random.id 7
		else if array == 'meetings'
			itemId = Random.id 8

		addToSet = {}

		if array == 'tags'
			addToSet[array] = _id: itemId, name: name, templates: []
		else
			addToSet[array] = _id: itemId, name: name

		Projects.update projectId, $addToSet: addToSet

		if array == 'tags'
			Roles.addUsersToRoles Meteor.userId(), 'teamleader', itemId

	updateProjectItem: (projectId, array, arrayId, field, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		if field != 'name' or value.trim() != ''
			find = _id: projectId
			find[array + '._id'] = arrayId

			set = {}
			set[array + '.$.' + field] = value

			Projects.update find, $set: set
		else
			throw new Meteor.Error 500, 'Name cannot be empty'

	removeProjectItem: (projectId, array, arrayId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		pull = {}
		pull[array] = _id: arrayId

		Projects.update projectId, $pull: pull

		if array == 'tags'
			permittedUsers = Roles.getUsersInRole Permissions.participant, arrayId, fields: _id: 1
			userArray = permittedUsers.fetch().map (user) -> user._id

			Roles.removeUsersFromRoles userArray, Permissions.participant, arrayId

	removeTeamPicture: (projectId, teamId) ->
		if Meteor.isServer
			check { projectId: projectId, teamId: teamId }, isExistingProjectAndTeam
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Pictures.remove projectId: projectId, teamId: teamId

	removeMeetingPicture: (projectId, meetingId) ->
		if Meteor.isServer
			check { projectId: projectId, meetingId: meetingId }, isExistingProjectAndMeeting
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Pictures.remove projectId: projectId, meetingId: meetingId
