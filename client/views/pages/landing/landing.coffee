Messages = require '/imports/api/messages/messages.coffee'

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

			HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases', (e, a) -> if a?.data?
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
		e.preventDefault()

		name = $('#name').val()
		email = $('#email').val()
		type = $('#type :selected').attr('type')
		projectName = $('#projectName').val()
		message = $('#message').val()

		if name != '' && email != '' && type != '' && message != '' && (projectName != '' || type != 'enquiry')
			if type == 'enquiry'
				Messages.methods.addProjectEnquiry.call
					name: name
					email: email
					projectName: projectName
					message: message
					language: TAPi18n.getLanguage()
				, (e, r) ->
					if e
						console.log e
						handleError e
					else
						swal TAPi18n.__('welcome.contact.enquirySuccessful'), '', 'success'

						$('#contactForm')[0].reset()

						Meteor.call 'sendMessage', name, email, type, name + ' <' + email + '> requested a project'
			else
				Meteor.call 'sendMessage', name, email, type, message, (e, r) ->
					if e
						handleError e
					else
						swal 'Nachricht wurde verschickt!', '', 'success'

						$('#contactForm')[0].reset()
		else
			swal TAPi18n.__('welcome.contact.fillOutCompletely'), '', 'error'
