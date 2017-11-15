Meteor.methods

	initReport: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId

		if Meteor.isServer
			check shiftId, isExistingShift
			# this most likely caused some problems for users with less permissions
			# check { shiftId: shiftId, teamId: teamId, userId: Meteor.userId() }, isShiftSchedulerOrThisTeamleader

		if shift?
			if shift.teams?
				for team in shift.teams when team._id == teamId && team.report?
					init = team.report.init

			unless init?
				Meteor.call 'updateReport', shiftId, teamId, 'init', true
				Meteor.call 'updateReport', shiftId, teamId, 'texts', 0
				Meteor.call 'updateReport', shiftId, teamId, 'website', 0
				Meteor.call 'updateReport', shiftId, teamId, 'speaks', 0
				Meteor.call 'updateReport', shiftId, teamId, 'videos', 0
				Meteor.call 'updateReport', shiftId, teamId, 'returnVisits', 0
				Meteor.call 'updateReport', shiftId, teamId, 'bibleStudies', 0
				Meteor.call 'updateReport', shiftId, teamId, 'hours', moment(shift.end - shift.start, 'Hmm').format('HH:mm')
				Meteor.call 'updateReport', shiftId, teamId, 'filled', true
				Meteor.call 'updateReport', shiftId, teamId, 'neatness', 'good'
				Meteor.call 'updateReport', shiftId, teamId, 'items', []
				Meteor.call 'updateReport', shiftId, teamId, 'experiences.route', ''
				Meteor.call 'updateReport', shiftId, teamId, 'experiences.good', ''
				Meteor.call 'updateReport', shiftId, teamId, 'experiences.problems', ''

				for team in shift.teams when team._id == teamId
					for user in team.participants
						Meteor.call 'updateShiftItem', shift._id, 'accepted', user._id, 'state', 'present'

	updateReport: (shiftId, teamId, field, value) ->
		shift = Shifts.findOne shiftId

		if Meteor.isServer
			check shiftId, isExistingShift
			# this most likely caused some problems for users with less permissions
			# check { shiftId: shiftId, teamId: teamId, userId: Meteor.userId() }, isShiftSchedulerOrThisTeamleader

		set = {}
		set['teams.$.report.' + field] = value

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set: set

	updateReportAddItem: (shiftId, teamId, short, language, count) ->
		shift = Shifts.findOne shiftId, fields: projectId: 1, teams: 1
		existing = false

		if Meteor.isServer
			check parseInt(count), Match.Integer
			check shiftId, isExistingShift
			check shift.projectId, isExistingProject
			# this most likely caused some problems for users with less permissions
			# check { shiftId: shiftId, teamId: teamId, userId: Meteor.userId() }, isShiftSchedulerOrThisTeamleader

		for team in shift.teams when team._id == teamId
			newItems = if team.report.items then team.report.items else []

			for item in newItems when item.short == short && item.language.short == language
				item.count = parseInt(item.count) + parseInt(count)
				existing = true

				Shifts.update _id: shiftId, 'teams._id': teamId,
					$set: 'teams.$.report.items': newItems
				break
			break

		if !existing
			item =
				short: short
				language: language
				count: parseInt count

			Shifts.update _id: shiftId, 'teams._id': teamId,
				$addToSet: 'teams.$.report.items': item

		if Meteor.isServer
			project = Projects.findOne shift.projectId
			languages = []

			for item in project.store.items when item.short == short
				languages = item.languages
				break

			for language, index in languages when language == language
				language.stock -= parseInt count
				languages[index..index] = [language]
				break

			Projects.update _id: shift.projectId, 'store.items.short': short,
				$set: 'store.items.$.languages': languages

	updateReportDeleteItem: (shiftId, teamId, short, language, count) ->
		shift = Shifts.findOne shiftId, fields: projectId: 1, teams: 1

		if Meteor.isServer
			check parseInt(count), Match.Integer
			check shiftId, isExistingShift
			# this most likely caused some problems for users with less permissions
			# check { shiftId: shiftId, teamId: teamId, userId: Meteor.userId() }, isShiftSchedulerOrThisTeamleader

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$pull: 'teams.$.report.items':
				short: short
				language: language

		if Meteor.isServer
			project = Projects.findOne shift.projectId
			languages = []

			for item in project.store.items when item.short == short
				languages = item.languages
				break

			for language, index in languages when language == language
				language.stock += parseInt count
				languages[index..index] = [language]
				break

			Projects.update _id: shift.projectId, 'store.items.short': short,
				$set: 'store.items.$.languages': languages
