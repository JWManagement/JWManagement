@Permissions =

	admin: ['admin']

	shiftAdmin: ['admin', 'shiftAdmin']

	shiftScheduler: ['admin', 'shiftAdmin', 'shiftScheduler']

	member: ['admin', 'shiftScheduler', 'shiftAdmin', 'storeAdmin', 'member']

	teamleader: ['teamleader', 'substituteTeamleader']

	participant: ['teamleader', 'substituteTeamleader', 'participant']
