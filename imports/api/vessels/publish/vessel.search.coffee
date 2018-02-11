import { Vessels } from '/imports/api/vessels/vessels.js'

# TODO: see 3cc1487 (use methods instead of publishes for DetailsForm)

Meteor.publish 'vessel.search', (searchString, projectId, limit) ->

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
				{ _id: regEx },
				{ name: regEx },
				{ callsign: regEx },
				{ eni: regEx },
				{ imo: regEx },
				{ mmsi: regEx }
			]}, {
				fields: {
					'name': 1,
					'flag': 1,
					'type': 1,
					'callsign': 1,
					'eni': 1,
					'imo': 1,
					'mmsi': 1
				},
				sort: { name: 1 },
				limit: limit
			})

		@added('counts', 'vessel.search', { count: cursor.count() })

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
