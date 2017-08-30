Template.printUser.helpers

	getUser: ->
		if Roles.userIsInRole Meteor.userId(), Permissions.shiftScheduler, FlowRouter.getParam('projectId')
			Template.currentData().user
		else
			user = Template.currentData().user
			user.teamleader = false
			user.substituteTeamleader = false
			user

	getUserStatistics: -> if @showStats
		projectId = FlowRouter.getParam 'projectId'

		if Roles.userIsInRole Meteor.userId(), Permissions.shiftScheduler, projectId
			s = UserStatistics.findOne @user._id

			return '<i class="fa fa-spinner fa-pulse"></i>' if !s?

			getField = (field) ->
				if field == 'privileges'
					if s[field].split('/').length > 1
						TAPi18n.__('privileges.' + s[field].split('/')[0]) + '/' + TAPi18n.__('privileges.' + s[field].split('/')[1])
					else
						TAPi18n.__('privileges.' + s[field])
				else
					s[field]

			day = TAPi18n.__('period.d')
			week = TAPi18n.__('period.w')
			fourWeeks = TAPi18n.__('period.4w')

			result = ' (' + getField('congregation') + '/' + getField('privileges') + ')'
			result += ' ' + day + ':' + getField('countDayApproved') + '/' + getField('countDayOverall')
			result += ' ' + week + ':' + getField('countWeekApproved') + '/' + getField('countWeekOverall')
			result += ' ' + fourWeeks + ':' + getField('countWeeksApproved') + '/' + getField('countWeeksOverall')
