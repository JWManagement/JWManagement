export Permissions =

	admin: ['admin']

	shiftAdmin: ['admin', 'shiftAdmin']

	shiftScheduler: ['admin', 'shiftAdmin', 'shiftScheduler']

	storeAdmin: ['admin', 'storeAdmin']

	shiftAndStoreAdmin: ['admin', 'shiftAdmin', 'shiftScheduler', 'storeAdmin']

	member: ['admin', 'shiftScheduler', 'shiftAdmin', 'storeAdmin', 'member']

	teamleader: ['teamleader', 'substituteTeamleader']

	participant: ['teamleader', 'substituteTeamleader', 'participant']

	getGroupsForUser: (userId, roles) -> roles.reduce ((result, role) -> result = result.concat Roles.getGroupsForUser userId, role), []
