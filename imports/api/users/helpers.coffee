export Helpers =

	areValidPasswords: (password1, password2) ->
		if password1 == password2
			if password1.length >= 8
				return true
			else if Meteor.isClient
				throw new Meteor.Error 'password.tooShort', ''
		else if Meteor.isClient
			throw new Meteor.Error 'password.notMatching', ''
