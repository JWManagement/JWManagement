import './mainLayout.tpl.jade'

import '/imports/util/platform.coffee'

import '/imports/ui/styles/ionic/import.scss'

import { Platform } from '/imports/util/platform.coffee'

if Platform.isCordova
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

	isCordova: -> Platform.isCordova

	platformClasses: ->
		classes = []

		classes.push 'platform-cordova' if Meteor.isCordova
		classes.push 'platform-web' if Meteor.isClient
		classes.push 'platform-ios' if Meteor.isCordova && Platform.isIOS
		classes.push 'platform-android' if Meteor.isCordova && Platform.isAndroid

		classes.join ' '

Template.registerHelper 'isIOS', -> Platform.isIOS

Template.registerHelper 'isAndroid', -> Platform.isAndroid

Template.registerHelper 'getOS', -> Platform.getOS()
