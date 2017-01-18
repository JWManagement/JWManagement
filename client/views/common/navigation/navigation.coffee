Template.navigation.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		if Session.get('parent')
			if Session.get('target')
				Session.get('target')
			else if Session.get('parent') == 'settings' && FlowRouter.getParam('projectId')
				FlowRouter.path 'settings',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'admin' && FlowRouter.getParam('projectId')
				FlowRouter.path 'admin',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'home'
				FlowRouter.path 'home', language: TAPi18n.getLanguage()

	picture: -> Pictures.findOne userId: Meteor.userId()

	toLower: (str) -> str?.toLowerCase()

	latestRelease: -> Session.get 'latestRelease'

Template.navigation.onCreated ->

	PictureSubs.subscribe 'profilePicture', Meteor.userId()

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases/latest', (e, a) ->
		Session.set 'latestRelease',
			tag: a.data.tag_name
			at: moment(a.data.published_at).from()

Template.navigation.onDestroyed ->

	Session.set 'target', undefined

Template.navigation.events

	'click .setLanguage': (e) ->
		language = $(e.target).closest('a').attr('lang')
		TAPi18n.setLanguage language
		wrs -> FlowRouter.setParams language: language

	'click #logout': (e) ->
		e.preventDefault()

		swalYesNo
			swal: 'logout'
			type: 'info'
			close: false
			doConfirm: ->
				swal title: TAPi18n.__('navigation.loggingOut'), showConfirmButton: false
				Meteor.logout -> swalClose()
