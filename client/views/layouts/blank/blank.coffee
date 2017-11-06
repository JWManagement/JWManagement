Template.blankLayout.onRendered ->

	$('body').addClass('gray-bg')

Template.blankLayout.onDestroyed ->

	$('body').removeClass('gray-bg')
