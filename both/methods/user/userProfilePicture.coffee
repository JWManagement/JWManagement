Meteor.methods

	removeProfilePicture: -> Pictures.remove userId: Meteor.userId()
