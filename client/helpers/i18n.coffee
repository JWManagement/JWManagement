Template.registerHelper 'langTag', ->
	TAPi18n.getLanguage()

Template.registerHelper 'getLanguages', ->
	Object.keys(TAPi18n.getLanguages())
