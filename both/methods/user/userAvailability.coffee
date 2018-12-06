import moment from 'moment'

Meteor.methods

	getAvailableUsers: (projectId, shiftId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftScheduler
			check shiftId, isExistingShift

		projectUsers = Roles.getUsersInRole Permissions.member, projectId, fields: profile: 1

		if projectUsers?
			shift = Shifts.findOne shiftId, fields: start: 1, end: 1, date: 1, tagId: 1

			if shift?
				localMoment = moment
				localMoment.locale('en')
				weekday = moment.weekdaysMin(localMoment(shift.date, 'YYYYDDDD').weekday()).toLowerCase()
				users = []

				for user in projectUsers.fetch()
					isAvailable = true

					start = 100 * parseInt shift.start / 100
					end = 100 * parseInt shift.end / 100

					if shift.end % 100 > 0
						end += 100

					for hour in [start...end] by 100
						if !user.profile.available? || !user.profile.available[weekday]? || hour not in user.profile.available[weekday]
							isAvailable = false

					if isAvailable
						for vacation in user.profile.vacations
							start = moment(vacation.start, 'YYYYDDDD')
							end = moment(vacation.end, 'YYYYDDDD')

							if moment(shift.date, 'YYYYDDDD').isBetween(start, end, null, '[]')
								isAvailable = false

						if isAvailable
							users.push
								_id: user._id
								name: user.profile.firstname + ' ' + user.profile.lastname
								teamleader: Roles.userIsInRole user._id, 'teamleader', shift.tagId
								substituteTeamleader: Roles.userIsInRole user._id, 'substituteTeamleader', shift.tagId
								thisTeamLeader: false
								phone: user.profile.telefon
								email: user.profile.email
				users
			else
				[]
		else
			[]
