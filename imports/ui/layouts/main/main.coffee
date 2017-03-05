import './mainLayout.tpl.jade'

import '/imports/util/platform.coffee'

import '/imports/ui/styles/ionic/import.scss'

if !Meteor.isCordova
	require '/imports/ui/components/footer/mobile/footer.coffee'
	require '/imports/ui/components/navigation/mobile/navigation.coffee'
else
	require '/imports/ui/components/footer/footer.coffee'
	require '/imports/ui/components/navigation/navigation.coffee'

Template.mainLayout.onRendered ->

	$('body').addClass('gray-bg')
	$('body').addClass('md-skin')
	$('body').addClass('top-navigation')

Template.mainLayout.onDestroyed ->

	$('body').removeClass('gray-bg')
	$('body').removeClass('md-skin')
	$('body').removeClass('top-navigation')

Template.mainLayout.helpers

	platformClasses: ->
		classes = []

		if Meteor.isCordova
			classes.push 'platform-cordova'

		if Meteor.isClient
			classes.push 'platform-web'

		if Meteor.isCordova && Platform.isIOS()
			classes.push 'platform-ios'

		if Meteor.isCordova && Platform.isAndroid()
			classes.push 'platform-android'

		classes.join ' '

Template.registerHelper 'isIOS', -> Platform.isIOS()

Template.registerHelper 'isAndroid', -> Platform.isAndroid()

Template.registerHelper 'getOS', -> Platform.getOS()
