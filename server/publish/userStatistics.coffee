Meteor.publish 'userStatistics', (userId, shiftId) ->
	self = this

	shift = Shifts.findOne shiftId,
		fields: projectId: 1, groupId: 1, date: 1

	if shift?
		projectId = shift.projectId
		tagId = shift.tagId
		date = shift.date

		u = Meteor.users.findOne userId,
			fields: _id: 1, profile: 1

		if u? && Roles.userIsInRole @userId, ['shiftAdmin', 'admin'], projectId
			extendUser = (user) ->
				isTeamleader = Roles.userIsInRole userId, 'teamleader', tagId
				isSubTeamleader = Roles.userIsInRole userId, 'substituteTeamleader', tagId
				isThisTeamleader = false

				shiftUserOverallDay = Shifts.find
					projectId: projectId
					date: parseInt moment(date, 'YYYYDDDD').format 'YYYYDDDD'
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]
				, fields: teams: 1

				shiftUserApprovedDay = Shifts.find
					projectId: projectId
					date: parseInt moment(date, 'YYYYDDDD').format 'YYYYDDDD'
					'teams.participants._id': userId
				, fields: teams: 1

				shiftUserOverallWeek = Shifts.find
					projectId: projectId
					$and: [
						date: $gte: parseInt moment(date, 'YYYYDDDD').startOf('week').format 'YYYYDDDD'
					,
						date: $lte: parseInt moment(date, 'YYYYDDDD').endOf('week').format 'YYYYDDDD'
					]
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]
				,
					fields: teams: 1
					sort: _id: 1

				shiftUserApprovedWeek = Shifts.find
					projectId: projectId
					$and: [
						date: $gte: parseInt moment(date, 'YYYYDDDD').startOf('week').format 'YYYYDDDD'
					,
						date: $lte: parseInt moment(date, 'YYYYDDDD').endOf('week').format 'YYYYDDDD'
					]
					'teams.participants._id': userId
				, fields: teams: 1

				shiftUserOverallLastWeeks = Shifts.find
					projectId: projectId
					$and: [
						date: $gte: parseInt moment(date, 'YYYYDDDD').startOf('week').subtract(3, 'w').format 'YYYYDDDD'
					,
						date: $lte: parseInt moment(date, 'YYYYDDDD').endOf('week').format 'YYYYDDDD'
					]
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]
				, fields: teams: 1

				shiftUserApprovedLastWeeks = Shifts.find
					projectId: projectId
					$and: [
						date: $gte: parseInt moment(date, 'YYYYDDDD').startOf('week').subtract(3, 'w').format 'YYYYDDDD'
					,
						date: $lte: parseInt moment(date, 'YYYYDDDD').endOf('week').format 'YYYYDDDD'
					]
					'teams.participants._id': userId
				, fields: teams: 1

				countTeamsAll = (shift) ->
					shift.teams.filter (t) ->
						(userId in t.participants.map (u) -> u._id) ||
						(userId in t.pending.map (u) -> u._id) ||
						(userId in t.declined.map (u) -> u._id)
					.length

				countTeamsApproved = (shift) ->
					shift.teams.filter (t) ->
						userId in t.participants.map (u) -> u._id
					.length

				user.countDayOverall = shiftUserOverallDay.fetch().reduce ((acc, shift) -> countTeamsAll(shift) + acc), 0
				user.countDayApproved = shiftUserApprovedDay.fetch().reduce ((acc, shift) -> countTeamsApproved(shift) + acc), 0
				user.countWeekOverall = shiftUserOverallWeek.fetch().reduce ((acc, shift) -> countTeamsAll(shift) + acc), 0
				user.countWeekApproved = shiftUserApprovedWeek.fetch().reduce ((acc, shift) -> countTeamsApproved(shift) + acc), 0
				user.countWeeksOverall = shiftUserOverallLastWeeks.fetch().reduce ((acc, shift) -> countTeamsAll(shift) + acc), 0
				user.countWeeksApproved = shiftUserApprovedLastWeeks.fetch().reduce ((acc, shift) -> countTeamsApproved(shift) + acc), 0
				user.teamleader = isTeamleader
				user.substituteTeamleader = isSubTeamleader
				user.thisTeamleader = isThisTeamleader

				pioneer = user.profile.pioneer
				pioneer = '' if user.profile.pioneer == 'publisher'

				privilege = user.profile.privilege
				privilege = '' if user.profile.privilege == 'publisher'

				if pioneer or privilege
					if pioneer
						user.privileges = pioneer
						if privilege
							user.privileges += '/' + privilege
					else if privilege
						user.privileges = privilege
				else
					user.privileges = 'publisher'

				user

			handle = Meteor.users.find userId,
				fields: _id: 1, profile: 1
			.observe
				added: (user) ->
					user = extendUser user
					self.added 'userStatistics', user._id, user
				changed: (newUser, oldUser) ->
					newUser = extendUser newUser
					self.changed 'userStatistics', oldUser._id, newUser
				removed: (user) ->
					self.removed 'userStatistics', user._id

			@onStop -> handle.stop()

	@ready()
