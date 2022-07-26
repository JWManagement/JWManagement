const Permissions = {
  all: [
    'support',
    'admin',
    'shiftScheduler',
    'shiftAdmin',
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
  member: [
    'admin',
    'shiftScheduler',
    'shiftAdmin',
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
  participantWithNone: [
    'teamleader',
    'substituteTeamleader',
    'participant',
    'none'
  ],
  support: [
    'support'
  ]
}

export default Permissions
