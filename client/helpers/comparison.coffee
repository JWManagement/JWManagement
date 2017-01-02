Template.registerHelper 'equals', (a, b) -> a == b

Template.registerHelper 'isGreater', (a, b) -> a > b

Template.registerHelper 'inArray', (array, field, value) ->
	if array
		for row in array when row[field] == value
			return true
	false
