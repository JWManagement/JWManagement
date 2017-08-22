Template.admin.helpers

	getProjectId: -> FlowRouter.getParam('projectId')

	name: (route) -> TAPi18n.__('navigation.' + route)

	dependenciesMatched: (dependency) ->
		if dependency
			projectId = FlowRouter.getParam('projectId')
			project = Projects.findOne(projectId)

			project? && project[dependency] == true
		else
			true

	buttons: -> [
		route: 'settings'
		icon: 'cogs'
		role: 'admin,shiftAdmin'
	,
		route: 'users'
		icon: 'users'
		role: 'admin'
	,
		route: 'reports'
		icon: 'comments'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	,
		route: 'store'
		icon: 'cubes'
		role: 'admin,storeAdmin'
	,
		route: 'vessels'
		icon: 'ship'
		role: 'support'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin,member'
		dependency: 'vesselModule'
	,
		route: 'notes'
		icon: 'pencil'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	,
		route: 'assemblies'
		icon: 'home'
		comingSoon: true
	,
		route: 'mails'
		icon: 'envelope'
		comingSoon: true
	,
		route: 'statistics'
		icon: 'area-chart'
		comingSoon: true
	,
		route: 'tools'
		icon: 'briefcase'
		comingSoon: true
	,
		route: 'donate'
		icon: 'heart'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	]

Template.admin.onCreated ->

	Meteor.subscribe 'admin', FlowRouter.getParam('projectId')
