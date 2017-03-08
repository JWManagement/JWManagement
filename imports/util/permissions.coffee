export Permissions =

	admin: ['admin']

	shiftAdmin: ['admin', 'shiftAdmin']

	storeAdmin: ['admin', 'storeAdmin']

	shiftAndStoreAdmin: ['admin', 'shiftAdmin', 'storeAdmin']

	member: ['admin', 'shiftAdmin', 'storeAdmin', 'member']

	teamleader: ['teamleader', 'substituteTeamleader']

	participant: ['teamleader', 'substituteTeamleader', 'participant']

	getGroupsForUser: (userId, roles) -> roles.reduce ((result, role) -> result = result.concat Roles.getGroupsForUser userId, role), []
