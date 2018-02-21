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
		route: 'vessel.search'
		icon: 'ship'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin,member'
		dependency: 'vesselModule'
	,
		route: 'notes'
		icon: 'pencil'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	,
		route: 'user.search'
		icon: 'users'
		role: 'support'
	]

Template.admin.onCreated ->

	Meteor.subscribe 'admin', FlowRouter.getParam('projectId')
