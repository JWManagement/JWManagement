import { Pictures } from '/imports/api/pictures/pictures.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './editProfilePicture.tpl.jade'

Template.editProfilePicture.events

	'change #edit': (e) -> if e.target.files.length > 0
		picture = new FS.File e.target.files[0]
		picture.userId = Meteor.userId()

		$('#editProfilePictureModal').modal('hide')

		Meteor.users.methods.picture.remove.call {}, (e) ->
			if e then handleError e
			else
				Pictures.insert picture, (e, file) ->
					if e then handleError e
					else
						Tracker.autorun (tracker) ->
							fileObj = Pictures.findOne file._id

							tracker.stop() if fileObj.hasStored('images')

	'click #delete': (e) ->
		Meteor.users.methods.picture.remove.call {}, (e) ->
			if e then handleError e
			else
				$('#editProfilePictureModal').modal('hide')
