import { Shifts } from './shifts.coffee'
import { Scheduler } from './scheduler.coffee'
import { Validators } from '/imports/util/validators.coffee'
import { SendMail } from '/imports/api/mailer/import.coffee'

export Methods =

	request: new ValidatedMethod
		name: 'Shifts.methods.request'
		validate: (args) ->
			Validators.isTagParticipant args.shiftId
			new SimpleSchema
				shiftId: type: String
				teamId: type: String
			.validator() args
		run: (args) ->
			shiftId = args.shiftId
			teamId = args.teamId
			userId = Meteor.userId()
			shift = Shifts.findOne shiftId, fields: teams: 1, scheduling: 1, tagId: 1

			if shift.scheduling == 'manual'
				# Wenn gewähltes Team offen ist, Bewerbung registrieren
				for team in shift.teams when team._id == teamId
					if team.status == 'open'
						Shifts.helpers.addRequest shiftId, teamId, userId, false
					else
						throw new Meteor.Error 500, TAPi18n.__('modal.shift.closedTeam')
			else if shift.scheduling == 'direct'
				# Wenn noch nicht auf gewähltes Team beworben
				for team in shift.teams when team._id == teamId && team.pending.filter((u) -> u._id == userId).length == 0
					# Wenn schon jemand eingeteilt wurde
					if team.participants.length > 0
						# Und Team noch nicht voll
						if team.participants.length < team.max
							# Einteilen
							Shifts.helpers.addParticipant shiftId, teamId, userId, false

							# Team schließen, wenn dies der letzte Bewerber ist
							if team.participants.length == team.max - 1
								Shifts.helpers.closeTeam shiftId, teamId

							# Andere Teilnehmer benachrichtigen
							if Meteor.isServer
								SendMail.sendTeamUpdate shiftId, teamId, 'participant'
						else throw new Meteor.Error 500, TAPi18n.__('modal.shift.maximumReached')
					# Niemand wurde eingeteilt, aber die Mindestanzahl wird mit mir erreicht oder überschritten
					else if team.pending.length >= team.min - 1 && team.pending.length < team.max
						teamleaderId = Scheduler.getBestTeamleader shiftId, teamId, userId

						# Wenn einer der Bewerber Teamleiter sein darf
						if teamleaderId
							team.pending.push Shifts.helpers.getRequester userId, false

							# Alle Bewerber annehmen
							for user in team.pending
								Shifts.helpers.addParticipant shiftId, teamId, user._id, false

							# Teamleiter setzen
							Shifts.helpers.setTeamleader shiftId, teamId, teamleaderId

							# Akzeptierte User heraussuchen
							acceptedUserIds = team.pending.map (user) -> user._id

							# Alle angenommenen User in anderen Teams ablehnen
							for otherTeam in shift.teams when otherTeam._id != teamId
								for user in otherTeam.pending when user._id in acceptedUserIds
									Shifts.helpers.addDeclined shiftId, otherTeam._id, user._id

							# Alle angenommenen User informieren
							for acceptedUserId in acceptedUserIds
								SendMail.sendConfirmation shiftId, teamId, acceptedUserId

							# Team schließen, wenn das die letzte Bewerbung war
							if team.pending.length == team.max
								Shifts.helpers.closeTeam shiftId, teamId
						# Fehler, wenn das die letzte Bewerbung, aber kein Teamleiter, war
						else if team.pending.length == team.max - 1
							throw new Meteor.Error 'no teamleader', ''
						# Ansonsten Bewerbung einfach entgegennehmen
						else
							Shifts.helpers.addRequest shiftId, teamId, userId
					# Wenn Maximum noch nicht erreicht, Bewerbung entgegennehmen
					else if team.pending.length < team.max
						Shifts.helpers.addRequest shiftId, teamId, userId
					else
						throw new Meteor.Error 'no request allowed', ''

	cancelRequest: new ValidatedMethod
		name: 'Shifts.methods.cancelRequest'
		validate: (args) ->
			Validators.isTagParticipant args.shiftId
			new SimpleSchema
				shiftId: type: String
				teamId: type: String
			.validator() args
		run: (args) ->
			Shifts.helpers.removeUser args.shiftId, args.teamId, Meteor.userId()
