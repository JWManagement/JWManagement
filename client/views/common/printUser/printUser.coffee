import i18next from 'i18next'

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
						i18next.t('privileges.' + s[field].split('/')[0]) + '/' + i18next.t('privileges.' + s[field].split('/')[1])
					else
						i18next.t('privileges.' + s[field])
				else
					s[field]

			day = i18next.t('period.d')
			week = i18next.t('period.w')
			fourWeeks = i18next.t('period.4w')

			result = ' (' + getField('congregation') + '/' + getField('privileges') + ')'
			result += ' ' + day + ':' + getField('countDayApproved') + '/' + getField('countDayOverall')
			result += ' ' + week + ':' + getField('countWeekApproved') + '/' + getField('countWeekOverall')
			result += ' ' + fourWeeks + ':' + getField('countWeeksApproved') + '/' + getField('countWeeksOverall')
