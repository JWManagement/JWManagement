import i18next from 'i18next'

@isExistingProject = Match.Where (projectId) ->
	check projectId, String

	if !Projects.findOne(projectId, fields: _id: 1)?
		throw new Meteor.Error 404, 'Project ' + projectId + ' not found'
	true

@isExistingProjectAndTeam = Match.Where (obj) ->
	check obj.projectId, String
	check obj.teamId, String

	project = Projects.findOne obj.projectId, fields: teams: 1

	if project?
		isInTeams = false

		for team in project.teams
			if team._id == obj.teamId
				isInTeams = true

		if !isInTeams
			throw new Meteor.Error 404, 'Team ' + obj.teamId + ' not found in project ' + obj.projectId
	else
		throw new Meteor.Error 404, 'Project ' + obj.projectId + ' not found'
	true

@isExistingProjectAndMeeting = Match.Where (obj) ->
	check obj.projectId, String
	check obj.meetingId, String

	project = Projects.findOne obj.projectId, fields: meetings: 1

	if project?
		isInMeetings = false

		for meeting in project.meetings
			if meeting._id == obj.meetingId
				isInMeetings = true

		if !isInMeetings
			throw new Meteor.Error 404, 'Meeting point ' + obj.meetingId + ' not found in project ' + obj.projectId
	else
		throw new Meteor.Error 404, 'Project ' + obj.projectId + ' not found'
	true

@isExistingShiftAndTeam = Match.Where (obj) ->
	check obj.shiftId, String
	check obj.teamId, String

	shift = Shifts.findOne obj.shiftId, fields: teams: 1

	if shift?
		isInTeams = false

		for team in shift.teams
			if team._id == obj.teamId
				isInTeams = true

		if !isInTeams
			throw new Meteor.Error 404, 'Team ' + obj.teamId + ' not found in shift ' + obj.shiftId
	else
		throw new Meteor.Error 404, 'Project ' + obj.projectId + ' not found'
	true

@isExistingUser = Match.Where (userId) ->
	check userId, String

	if !Meteor.users.findOne(userId, fields: _id: 1)?
		throw new Meteor.Error 404, 'User ' + userId + ' not found'
	true

@isExistingShift = Match.Where (shiftId) ->
	check shiftId, String

	if !Shifts.findOne(shiftId, fields: _id: 1)?
		throw new Meteor.Error 404, 'Shift ' + shiftId + ' not found'
	true

@isAdmin = Match.Where (obj) ->
	check obj.userId, String
	check obj.projectId, String

	if !Roles.userIsInRole obj.userId, Permissions.admin, obj.projectId
		throw new Meteor.Error 550, i18next.t('permissions.notAdmin')
	true

@isShiftScheduler = Match.Where (obj) ->
	check obj.userId, String
	check obj.projectId, String

	if !Roles.userIsInRole obj.userId, Permissions.shiftScheduler, obj.projectId
		throw new Meteor.Error 550, i18next.t('permissions.notShiftScheduler')
	true

@isShiftAdmin = Match.Where (obj) ->
	check obj.userId, String
	check obj.projectId, String

	if !Roles.userIsInRole obj.userId, Permissions.shiftAdmin, obj.projectId
		throw new Meteor.Error 550, i18next.t('permissions.notShiftAdmin')
	true

@isMember = Match.Where (obj) ->
	check obj.userId, String
	check obj.projectId, String

	if !Roles.userIsInRole obj.userId, Permissions.member, obj.projectId
		throw new Meteor.Error 550, i18next.t('permissions.notProjectParticipant')
	true

@isTeamleader = Match.Where (obj) ->
	check obj.userId, String
	check obj.tagId, String

	if !Roles.userIsInRole obj.userId, Permissions.teamleader, obj.tagId
		throw new Meteor.Error 550, i18next.t('permissions.notTeamleader')
	true

@isTagParticipant = Match.Where (obj) ->
	check obj.userId, String
	check obj.tagId, String

	if !Roles.userIsInRole obj.userId, Permissions.participant, obj.tagId
		throw new Meteor.Error 550, i18next.t('permissions.notTagParticipant')
	true

@isShiftSchedulerOrThisTeamleader = Match.Where (obj) ->
	check obj.shiftId, String
	check obj.teamId, String
	check obj.userId, String

	shift = Shifts.findOne obj.shiftId, fields: projectId: 1, teams: 1

	if Roles.userIsInRole obj.userId, Permissions.shiftScheduler, shift.projectId
		return true

	for team in shift.teams when team._id == obj.teamId
		for user in team.participants when user._id == obj.userId && user.thisTeamleader
			return true

	throw new Meteor.Error 550, i18next.t('permissions.notShiftAdmin')

@isShiftAdminOrThisTeamleader = Match.Where (obj) ->
	check obj.shiftId, String
	check obj.teamId, String
	check obj.userId, String

	shift = Shifts.findOne obj.shiftId, fields: projectId: 1, teams: 1

	if Roles.userIsInRole obj.userId, Permissions.shiftAdmin, shift.projectId
		return true

	for team in shift.teams when team._id == obj.teamId
		for user in team.participants when user._id == Meteor.userId() && user.thisTeamleader
			return true

	throw new Meteor.Error 550, i18next.t('permissions.notShiftAdmin')
