import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessels', (searchString, projectId, limit) ->

	if typeof searchString != 'string' || searchString == ''
		return @ready()

	if !Roles.userIsInRole @userId, Permissions.member, projectId
		return @ready()

	project = Projects.findOne projectId,
		fields: _id: 0, vesselModule: 1

	if !project? || !project.vesselModule
		return @ready()

	try
		regEx = new RegExp(searchString, 'i')

		self = this
		initialLoadDone = false
		publishedItemsCount = 0

		cursor = Vessels.find({
			$or: [
				{ name: regEx },
				{ callsign: regEx },
				{ eni: regEx },
				{ imo: regEx },
				{ mmsi: regEx }
			]}, {
				sort: { name: 1 },
				limit: limit
			})

		@added('counts', 'vessels', { count: cursor.count() })

		cursorCount = cursor.count()

		handle = cursor.observeChanges({
			added: (id, fields) ->
				self.added('vessels', id, fields)
				publishedItemsCount++

				if !initialLoadDone && (publishedItemsCount == limit || publishedItemsCount == cursorCount)
					initialLoadDone = true
					self.ready()

			changed: (id, fields) -> self.changed('vessels', id, fields)
			removed: (id) -> self.removed('vessels', id)
		})

		@onStop () -> handle.stop()
	catch error
		console.log error
		@ready()
