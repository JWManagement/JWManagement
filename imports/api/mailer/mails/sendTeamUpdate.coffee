import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { send } from '../send.coffee'

export sendTeamUpdate = (shiftId, teamId, type) ->
	shift = Shifts.findOne shiftId
	project = Projects.findOne shift.projectId, fields: name: 1, email: 1

	if shift?
		time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
		shiftData = {}
		shiftData.teams = []

	for team in shift.teams when team._id == teamId
		shiftData.teams[0] = team

		for participant in team.participants when participant.informed
			if type != 'participant' || participant.thisTeamleader
				user = Meteor.users.findOne participant._id, fields: profile: 1

				thisMoment = moment(shift.date, 'YYYYDDDD')
				thisMoment.locale(user.profile.language)
				date = thisMoment.format('dddd, DD.MM.YYYY')

				name = user.profile.firstname + ' ' + user.profile.lastname

				send
					recipient: user.profile.email
					sender: project.name
					from: project.email
					subject: TAPi18n.__('mail.teamUpdate.subject', '', user.profile.language)
					template: 'teamUpdate'
					language: user.profile.language
					data:
						project: project.name
						name: name
						type: TAPi18n.__('mail.teamUpdate.changed.' + type, '', user.profile.language)
						datetime: TAPi18n.__('mail.teamUpdate.datetime', { date: date, time: time }, user.profile.language)
						shift: shiftData
						content: getMailTexts 'teamUpdate', user.profile.language
				, (err, res) -> if err
					console.log 'sendMail failed: ' + err
