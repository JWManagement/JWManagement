import { Files } from '/imports/api/files/files.coffee'
import { Pictures } from '/imports/api/pictures/pictures.coffee'

validUserOrTeamOrMeeting = (userId, doc) ->
	if userId
		if doc.userId
			doc.userId == userId
		else if doc.projectId && doc.teamId
			if Roles.userIsInRole userId, Permissions.shiftAdmin, doc.projectId
				project = Projects.findOne doc.projectId, fields: 'teams._id': 1
				doc.teamId in project.teams.map (team) -> team._id
			else
				false
		else if doc.projectId && doc.meetingId
			if Roles.userIsInRole userId, Permissions.shiftAdmin, doc.projectId
				project = Projects.findOne doc.projectId, fields: 'meetings._id': 1
				doc.meetingId in project.meetings.map (meeting) -> meeting._id
			else
				false
		else
			false
	else
		false

Files.allow
	insert: (userId, doc) -> Roles.userIsInRole userId, 'admin', doc.projectId
	update: (userId, doc) -> Roles.userIsInRole userId, 'admin', doc.projectId
	remove: (userId, doc) -> Roles.userIsInRole userId, 'admin', doc.projectId
	download: (userId, doc) -> Roles.userIsInRole userId, Permissions.member, doc.projectId

Pictures.allow
	insert: validUserOrTeamOrMeeting
	update: validUserOrTeamOrMeeting
	remove: validUserOrTeamOrMeeting
	download: -> true
