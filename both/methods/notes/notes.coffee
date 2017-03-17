Meteor.methods

	addNote: (projectId, title, text) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftOrStoreAdmin
			check title, String
			check text, String

		if title.trim() != '' || text.trim() != ''
			user = Meteor.user().profile

			Projects.update projectId, $addToSet: notes:
				_id: Random.id 4
				date: parseInt moment().format('YYYYDDDD')
				time: parseInt moment().format('Hmm')
				author: user.firstname + ' ' + user.lastname
				title: title
				text: text
		else
			throw new Meteor.Error 500, 'Title and text cannot be empty'

	deleteNote: (projectId, noteId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftOrStoreAdmin

		Projects.update projectId, $pull: notes: _id: noteId
