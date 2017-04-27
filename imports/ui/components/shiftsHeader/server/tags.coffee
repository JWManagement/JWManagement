import SimpleSchema from 'simpl-schema'
import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { Validators } from '/imports/api/util/validators.coffee'

Meteor.publish 'shiftsHeader.tags', (projectId) ->
	new SimpleSchema
		projectId:
			type: String
			custom: ->
				Validators.project.validId
				Validators.project.isMember
	.validate { projectId }

	filter = projectId: projectId

	Projects.find(filter).observeChanges
		added: (id, doc) =>
			if Roles.userIsInRole @userId, Permissions.participant, doc._id
				@added 'shiftsHeader.tags', id,
					doc: _id
					tags: doc.tags
		changed: (id, doc) =>
			if Roles.userIsInRole @userId, Permissions.participant, doc._id
				@changed 'shiftsHeader.tags', id,
					_id: doc._id
					tags: doc.tags
		removed: (id) =>
			@removed 'shiftsHeader.tags', id
