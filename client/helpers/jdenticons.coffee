import { Delay } from '/imports/util/delay.coffee'

jdenticonDep = new Tracker.Dependency

Template.registerHelper 'jdenticon', (param = {hash:{}}) ->
	jdenticonDep.depend()

	unless jdenticon?
		Delay -> jdenticonDep.changed()
		null
	else
		param.hash.hash = Meteor.userId() unless param.hash.hash
		param.hash.size = 96 unless param.hash.size
		param.hash.radius = 0 unless param.hash.radius
		param.hash.color = '#fff' unless param.hash.color
		param.hash.type = 'raised' unless param.hash.type

		svg = jdenticon.toSvg CryptoJS.MD5(param.hash.hash).toString(), param.hash.size
		svg = '<root>' + svg + '</root>'

		svg = $(svg).find('svg').css('background-color', param.hash.color).closest('root')

		if param.hash.type == 'raised'
			border = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
		else
			border = ''

		svg = $(svg)
			.find('svg')
			.css('box-shadow', border)
			.css('border-radius', param.hash.radius)
			.closest('root')

		$(svg).html()
