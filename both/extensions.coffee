@GetGroupsForUser = (userId, roles) ->
	array = []

	for role in roles
		newGroups = Roles.getGroupsForUser userId, role
		array = array.concat newGroups

	array

@getMailTexts = (mail, language) ->
	values = {}
	values.headline = TAPi18n.__('mail.' + mail + '.headline', '', language)
	values.hello = TAPi18n.__('mail.' + mail + '.hello', '', language)
	values.text1 = TAPi18n.__('mail.' + mail + '.text1', '', language)
	values.text2 = TAPi18n.__('mail.' + mail + '.text2', '', language)
	values.changed = TAPi18n.__('mail.' + mail + '._changed', '', language)
	values.button = TAPi18n.__('mail.' + mail + '.button', '', language)
	values
