Template.navbarProfile.helpers

	picture: -> Pictures.findOne userId: Meteor.userId()

	toLower: (str) -> str?.toLowerCase()

	latestRelease: -> Session.get 'latestRelease'

	langIsDe: -> TAPi18n.getLanguage() == 'de'

Template.navbarProfile.onCreated ->

	PictureSubs.subscribe 'profilePicture', Meteor.userId()

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases/latest', (e, a) -> if a?.data?
		Session.set 'latestRelease',
			tag: a.data.tag_name
			new: moment(new Date).diff(a.data.published_at, 'days') < 3

Template.navbarProfile.events

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
