Template.landing.onRendered ->

	loadingDep = new Tracker.Dependency

	Tracker.autorun (tracker) ->
		loadingDep.depend()

		unless WOW? && $('body').singlePageNav?
			Delay -> loadingDep.changed()
			null
		else
			new WOW().init()
			$('.navbar').singlePageNav offset: 70
			tracker.stop()

Template.landing.events

	'click .navbar-collapse a': ->
		$('.navbar-collapse').collapse('hide')

	'click #toLogin': ->
		FlowRouter.go 'login', language: FlowRouter.getParam('language')

	'click #toDashboard': ->
		FlowRouter.go 'home', language: FlowRouter.getParam('language')

	'submit form': (e) ->
		name = e.target['0'].value
		email = e.target['1'].value
		subject = e.target['2'].value
		message = e.target['3'].value

		if name? && name != '' && email? && email != '' && subject? && subject != '' && message? && message != ''
			Meteor.call 'sendMessage', name, email, subject, message, (e, r) ->
				if e
					handleError e
				else
					swal 'Nachricht wurde verschickt!', '', 'success'

					$('#contactForm')[0].reset()
			false
		else
			swal 'Bitte fülle alle Pflichtfelder aus!', '', 'error'
			false
