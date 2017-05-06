import SimpleSchema from 'simpl-schema'
import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { Validators } from '/imports/api/util/validators.coffee'

Meteor.publish 'users.tags', (projectId) ->
	new SimpleSchema
		projectId:
			type: String
			custom: ->
				Validators.project.validId
				Validators.project.isMember
	.validate { projectId }

	handle = Projects.find(_id: projectId).observeChanges
		added: (id, doc) =>
			if Roles.userIsInRole @userId, Permissions.participant, id
				@added 'projects', id,
					_id: id
					tags: doc.tags
		changed: (id, doc) =>
			if Roles.userIsInRole @userId, Permissions.participant, id
				@changed 'projects', id,
					_id: id
					tags: doc.tags
		removed: (id) =>
			@removed 'projects', id

	@ready()

	@onStop -> handle.stop()
