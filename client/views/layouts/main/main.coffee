Template.mainLayout.onRendered ->

	$('body').addClass('gray-bg')
	$('body').addClass('md-skin')
	$('body').addClass('top-navigation')

Template.mainLayout.onDestroyed ->

	$('body').removeClass('gray-bg')
	$('body').removeClass('md-skin')
	$('body').removeClass('top-navigation')
