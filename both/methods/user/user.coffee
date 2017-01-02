Meteor.methods

	updateProfile: (field, value) ->
		check field, String
		check value, Match.Any

		steps = switch field
			when 'username' then ['trim', 'toLower', 'removeSpecials']
			when 'firstname', 'lastname' then ['trim', 'capitalize']
			when 'email' then ['trim', 'toLower']
			when 'telefon' then ['trim', 'removeLetters']
			when 'congregation' then ['trim', 'toSpace', 'capitalize', 'spaceToMinus']
			when 'languages' then ['trim']
			else []

		set = {}

		if field == 'username'
			if (Meteor.users.findOne username: value)?
				throw new Meteor.Error 406, 'Username unavailable'
		else
			field = 'profile.' + field

		Meteor.call 'validateString', value, steps, (e, r) -> value = r unless e

		set[field] = value + ' '
		Meteor.users.update @userId, $set: set

		if Meteor.isServer
			set[field] = value
			Meteor.users.update @userId, $set: set

			if field == 'profile.firstname'
				user = Meteor.users.findOne @userId, fields: 'profile.lastname': 1

				if user?
					field = 'name'
					value = value + ' ' + user.profile.lastname
			else if field == 'profile.lastname'
				user = Meteor.users.findOne @userId, fields: 'profile.firstname': 1

				if user?
					field = 'name'
					value = user.profile.firstname + ' ' + value
			else if field == 'profile.telefon'
				field = field.substr field.indexOf('.') + 1

			setLeader = {}
			setLeader['leader.' + field] = value

			setAccepted = {}
			setAccepted['accepted.$.' + field] = value

			Shifts.update 'leader._id': @userId,
				$set: setLeader
			,
				multi: true

			Shifts.update 'accepted._id': @userId,
				$set: setAccepted
			,
				multi: true

	validateString: (str, steps) ->
		check str, String
		check steps, Array

		if typeof str != 'string' or str == ''
			throw new Meteor.Error 500, 'str needs to be a non-empty String'
		else if !Array.isArray steps
			throw new Meteor.Error 500, 'steps needs to be an Array'
		else
			for step in steps
				switch step
					when 'trim'
						str = str.trim()
						str = str.replace /\s+/g, ' '
					when 'toLower'
						str = str.toLowerCase()
					when 'removeSpecials'
						str = str.replace /\W$/g, ''
					when 'removeLetters'
						str = str.replace /[a-z]/gi, ''
					when 'toSpace'
						str = str.replace /[^a-zßöäü/\s]/gi, ' '
						str = str.replace /\//g, ' / '
						str = str.replace /\s+/g, ' '
						str = str.replace /( \/ )/g, '/'
					when 'spaceToMinus'
						str = str.replace /\s/g, '-'
					when 'capitalize'
						str = str.toLowerCase()
						str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split(' ')).join ' '
						str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split('-')).join '-'
						str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split('/')).join '/'
			str

	toggleAvailability: (day, hour) ->
		check day, String
		check hour, Number

		user = Meteor.users.findOne Meteor.userId(), fields: 'profile.available': 1

		if !user.profile.available? || Object.keys(user.profile.available).length == 0
			user.profile.available = mo: [], tu: [], we: [], th: [], fr: [], sa: [], su: []
			Meteor.users.update Meteor.userId(), $set: 'profile.available': user.profile.available

		if hour in user.profile.available[day]
			pull = {}
			pull['profile.available.'+ day] = hour

			Meteor.users.update Meteor.userId(), $pull: pull
		else
			add = {}
			add['profile.available.'+ day] = hour

			Meteor.users.update Meteor.userId(), $addToSet: add

	setState: (projectId, userId, state) ->
		if Roles.userIsInRole Meteor.userId(), 'admin', projectId
			validStates = ['created', 'invited', 'active']

			if state in validStates
				Meteor.users.update userId, $set: state: state
			else
				throw new Meteor.Error 500, 'State ' + state + ' invalid'
		else
			throw new Meteor.Error 500, 'Insufficient permissions'
