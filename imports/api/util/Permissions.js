const Permissions = {
    all: [
        'support',
        'admin',
        'shiftScheduler',
        'shiftAdmin',
        'storeAdmin',
        'member',
        'teamleader',
        'substituteTeamleader',
        'participant'
    ],
    admin: [
        'admin'
    ],
    shiftAdmin: [
        'admin',
        'shiftAdmin'
    ],
    shiftScheduler: [
        'admin',
        'shiftAdmin',
        'shiftScheduler'
    ],
    storeAdmin: [
        'admin',
        'storeAdmin'
    ],
    shiftAndStoreAdmin: [
        'admin',
        'shiftAdmin',
        'shiftScheduler',
        'storeAdmin'
    ],
    member: [
        'admin',
        'shiftScheduler',
        'shiftAdmin',
        'storeAdmin',
        'member'
    ],
    teamleader: [
        'teamleader',
        'substituteTeamleader'
    ],
    participant: [
        'teamleader',
        'substituteTeamleader',
        'participant'
    ],
    support: [
        'support'
    ]
}

export default Permissions
