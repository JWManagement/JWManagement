Template.registerHelper 'isSupport', ->
	Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP

Template.registerHelper 'isProjectAdmin', ->
	Roles.userIsInRole Meteor.userId(), 'admin', FlowRouter.getParam('projectId')

Template.registerHelper 'isProjectShiftAdmin', ->
	Roles.userIsInRole Meteor.userId(), Permissions.shiftAdmin, FlowRouter.getParam('projectId')

Template.registerHelper 'isProjectShiftScheduler', ->
	Roles.userIsInRole Meteor.userId(), Permissions.shiftScheduler, FlowRouter.getParam('projectId')

Template.registerHelper 'isMember', ->
	Roles.userIsInRole Meteor.userId(), Permissions.member, FlowRouter.getParam('projectId')

Template.registerHelper 'isThisTeamleader', (shiftId, teamId) ->
	shift = Shifts.findOne shiftId, fields: teams: 1

	if shift.teams
		for team in shift.teams when team._id == teamId
			for user in team.participants when user._id == Meteor.userId() && user.thisTeamleader
				return true

	return Roles.userIsInRole Meteor.userId(), Permissions.shiftScheduler, FlowRouter.getParam('projectId')

Template.registerHelper 'isTagTeamleader', (tagId) ->
	a = Roles.userIsInRole Meteor.userId(), Permissions.shiftAdmin, FlowRouter.getParam('projectId')
	b = Roles.userIsInRole Meteor.userId(), Permissions.teamleader, tagId
	a || b

Template.registerHelper 'isTagParticipant', (tagId, projectId) ->
	projectId = FlowRouter.getParam('projectId') if typeof projectId != 'string'
	a = Roles.userIsInRole Meteor.userId(), Permissions.participant, tagId
	if a then a
	else Roles.userIsInRole Meteor.userId(), Permissions.shiftAdmin, projectId
