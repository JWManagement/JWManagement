Meteor.methods

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
