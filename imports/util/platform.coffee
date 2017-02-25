export Platform =

	getOS: ->
		if @isAndroid()
			'md'
		else
			'ios'

	isIOS: -> navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) || Session.get('platformOverride') == 'iOS'

	isAndroid: -> navigator.userAgent.indexOf('Android') > 0 || Session.get('platformOverride') == 'Android'
