export FR =

	getProjectId: -> FlowRouter.getParam 'projectId'

	getLanguage: -> FlowRouter.getParam 'language'

	getToken: -> FlowRouter.getParam 'token'

	getShowShift: -> FlowRouter.getQueryParam 'showShift'

	getShowWeek: -> FlowRouter.getQueryParam 'showWeek'

	getShowTags: -> FlowRouter.getQueryParam 'showTags'

	getWeekId: -> FlowRouter.getQueryParam 'weekId'
