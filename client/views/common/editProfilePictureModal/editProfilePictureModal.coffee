Template.editProfilePictureModal.onRendered ->

	$('#editProfilePictureModal').modal('show')
	$('#editProfilePictureModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams editProfilePicture: undefined

Template.editProfilePictureModal.events

	'change #edit': (e) ->
		if e.target.files.length > 0
			picture = new FS.File e.target.files[0]
			picture.userId = Meteor.userId()

			$('#editProfilePictureModal').modal('hide')

			Meteor.call 'removeProfilePicture', (e) ->
				if e
					handleError e
				else
					Pictures.insert picture, (e, file) ->
						if e
							handleError e
						else
							Tracker.autorun (tracker) ->
								fileObj = Pictures.findOne file._id

								if fileObj.hasStored('thumbs') &&
									fileObj.hasStored('pictures') &&
									fileObj.hasStored('images')

										tracker.stop()

	'click #delete': (e) ->
		Meteor.call 'removeProfilePicture', (e) ->
			if e
				handleError e
			else
				$('#editProfilePictureModal').modal('hide')
