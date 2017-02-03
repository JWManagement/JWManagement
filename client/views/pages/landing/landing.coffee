Template.landing.helpers

	latestReleases: -> Session.get 'latestReleases'

	selectedType: -> Session.get 'selectedType'

Template.landing.onRendered ->

	loadingDep = new Tracker.Dependency

	Session.set 'selectedType', ''

	Tracker.autorun (tracker) ->
		loadingDep.depend()

		unless WOW? && $('body').singlePageNav?
			Delay -> loadingDep.changed()
			null
		else
			new WOW().init()
			$('.navbar').singlePageNav offset: 70

			HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases', (e, a) ->
				Session.set 'latestReleases',
					a.data.map (data, index) -> if index < 3
						body: data.body.replace(/- /g, '').split('\n')
						tag: data.tag_name

			tracker.stop()

Template.landing.events

	'click .navbar-collapse a': -> $('.navbar-collapse').collapse('hide')

	'click #toLogin': -> FlowRouter.go 'login', language: FlowRouter.getParam('language')

	'click #toDashboard': -> FlowRouter.go 'home', language: FlowRouter.getParam('language')

	'change #type': (e) -> Session.set 'selectedType', $(e.target).find('option:selected').attr('type')

	'submit form': (e) ->

		name = $('#name').val()
		email = $('#email').val()
		type = $('#type :selected').attr('type')
		congregation = $('#congregation').val()
		message = $('#message').val()

		if name != '' && email != '' && type != '' && message != '' && (congregation != '' || type != 'enquiry')
				Meteor.call 'sendMessage', name, email, type, message, (e, r) ->
					if e
						handleError e
					else
						swal 'Nachricht wurde verschickt!', '', 'success'

						$('#contactForm')[0].reset()
		else
			swal 'Bitte fülle alle Pflichtfelder aus!', '', 'error'
