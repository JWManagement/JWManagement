export Platform =

	getOS: ->
		if @isAndroid()
			'md'
		else
			'ios'

	# Override isCordova for testing purposes
	isCordova: Meteor.isCordova || true

	isIOS: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)

	isAndroid: navigator.userAgent.indexOf('Android') > 0
