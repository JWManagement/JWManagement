import './invertedLayout.tpl.jade'

Template.invertedLayout.onRendered ->

	$('body').addClass('inverted-bg')
	$('body').addClass('md-skin')
	$('body').addClass('top-navigation')

Template.invertedLayout.onDestroyed ->

	$('body').removeClass('inverted-bg')
	$('body').removeClass('md-skin')
	$('body').removeClass('top-navigation')
