import './adminLayout.tpl.jade'

import '/imports/api/util/platform.coffee'

import { Platform } from '/imports/api/util/platform.coffee'

if Platform.isCordova
	require '/imports/ui/styles/ionic/import.scss'
	require '/imports/ui/components/footer/mobile/footer.coffee'
	require '/imports/ui/components/navigation/mobile/navigation.coffee'
else
	require '/imports/ui/components/footer/footer.coffee'
	require '/imports/ui/components/navigation/navigation.coffee'
	require '/imports/ui/components/adminNavigation/adminNavigation.coffee'

Template.adminLayout.onRendered ->

	$('body').addClass('gray-bg')
	$('body').addClass('md-skin')
	$('body').addClass('top-navigation')

Template.adminLayout.onDestroyed ->

	$('body').removeClass('gray-bg')
	$('body').removeClass('md-skin')
	$('body').removeClass('top-navigation')
