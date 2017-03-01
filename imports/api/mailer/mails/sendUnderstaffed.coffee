import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/util/permissions.coffee'
import { send } from '../send.coffee'

export sendUnderstaffed = (shiftId, teamId) ->
	shift = Shifts.findOne shiftId
	project = Projects.findOne shift.projectId, fields: name: 1, email: 1
	shiftData = teams: []
	tlNeeded = true

	for team in shift.teams when team._id = teamId
		shiftData.teams[0] = team

		tlNeeded = false if team.participants.filter((p) -> p.teamleader).length > 1

	if tlNeeded
		users = Roles.getUsersInRole Permissions.teamleader, shift.tagId, fields: profile: 1
		users = users.fetch().filter (u) -> Roles.userIsInRole u._id, Permissions.participant, shift.tagId
		type = 'teamleader'
	else
		users = Roles.getUsersInRole Permissions.member, shift.projectId, fields: profile: 1
		users = user.fetch()
		type = 'participant'

	for user in users
		thisMoment = moment(shift.date, 'YYYYDDDD')
		thisMoment.locale(user.profile.language)
		date = thisMoment.format('dddd, DD.MM.YYYY')
		time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
		name = user.profile.firstname + ' ' + user.profile.lastname

		send
			recipient: user.profile.email
			sender: project.name
			from: project.email
			subject: TAPi18n.__('mail.understaffed.subject', '', user.profile.language)
			template: 'understaffed'
			language: user.profile.language
			data:
				project: project.name
				name: name
				type: TAPi18n.__('role.' + type, '', user.profile.language)
				datetime: TAPi18n.__('mail.understaffed.datetime', {date: date, time: time}, user.profile.language)
				shift: shiftData
				content: getMailTexts 'understaffed', user.profile.language
		, (err, res) -> if err
			console.log 'sendMail failed: ' + err
