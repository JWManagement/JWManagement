import Users from '/imports/api/users/users.js'

# TODO: see 3cc1487 (use methods instead of publishes for DetailsForm)

Meteor.publish 'user.search', (searchString, projectId, limit) ->

	if typeof searchString != 'string' || searchString == ''
		return @ready()

	if !Roles.userIsInRole @userId, Permissions.member, projectId
		return @ready()

	project = Projects.findOne projectId,
		fields: _id: 0

	if !project?
		return @ready()

	try
		search = new RegExp(searchString, 'i')

		self = this
		initialLoadDone = false
		publishedItemsCount = 0
		rolesObject = {}

		rolesObject['roles.' + projectId] = {
			$in: Permissions.member
		}

		cursor = Users.find({
			$and: [
				{
					$or: [
						{ _id: search },
						{ 'profile.lastname': search },
						{ 'profile.firstname': search },
						{ 'profile.email': search },
						{ 'profile.telefon': search },
						{ username: search }
					]
				},
				rolesObject,
				{
					username: {
						$ne: 'adm'
					}
				}
			]
		}, {
			fields: {
				'profile.lastname': 1,
				'profile.firstname': 1,
				'profile.email': 1,
				'profile.telefon': 1,
				username: 1,
				roles: 1
			},
			sort: {
				'profile.lastname': 1,
				'profile.firstname': 1,
				username: 1
			},
			limit: limit
		});

		@added('counts', 'user.search', { count: cursor.count() })

		cursorCount = cursor.count()

		handle = cursor.observeChanges({
			added: (id, fields) ->
				self.added('users', id, fields)
				publishedItemsCount++

				if !initialLoadDone && (publishedItemsCount == limit || publishedItemsCount == cursorCount)
					initialLoadDone = true
					self.ready()

			changed: (id, fields) -> self.changed('users', id, fields)
			removed: (id) -> self.removed('users', id)
		})

		@onStop () -> handle.stop()
	catch error
		console.log error
		@ready()
