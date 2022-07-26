const misc = {
  input: {
    username: 'Username',
    usernameOrEmail: 'Username or Email address',
    firstname: 'First name',
    lastname: 'Surname',
    email: 'Email address',
    telefon: 'Phone',
    congregation: 'Congregation',
    languages: 'Languages',
    gender: 'Gender',
    privilegeOfService: 'Privilege of Service',
    privilegeOfMinistry: 'Congregation Assignment',
    password: 'Password',
    passwordRepeat: 'Repeat password',
    newPassword: 'New password',
    newPasswordRepeat: 'Repeat new password'
  },
  role: {
    role: 'Role',
    admin: 'Project manager',
    shiftScheduler: 'Shift scheduler',
    shiftAdmin: 'Shift manager',
    member: 'Member',
    teamleader: 'Team leader',
    substituteTeamleader: 'Substitute team leader',
    participant: 'Participant',
    nothing: 'None',
    noPermission: 'No permission'
  },
  permissions: {
    notAdmin: 'This user is not a project manager',
    notShiftScheduler: 'This user is not a shift scheduler',
    notShiftAdmin: 'This user is not a shift manager',
    notProjectParticipant: 'This user is not participating in the given project',
    notTeamleader: 'This user is not a team leader',
    notTagParticipant: 'This user can not participate in this shift because he/she is has no permissions for this shift\'s tag.',
    notTeamParticipant: 'This user is not participating in the given team'
  },
  time: {
    start: 'Start',
    end: 'End',
    suffix: 'hours',
    years: 'years',
    to: 'to'
  },
  scheduling: {
    name: 'Scheduling',
    direct: 'Approve immediately',
    manual: 'Approve manually'
  },
  password: {
    tooShort: 'Password must be at least 8 characters long',
    notMatching: 'The passwords do not match!'
  },
  weekdays: {
    mo: 'Monday',
    tu: 'Tuesday',
    we: 'Wednesday',
    th: 'Thursday',
    fr: 'Friday',
    sa: 'Saturday',
    su: 'Sunday'
  },
  intervals: {
    m: 'Manually',
    every: 'Every week',
    even: 'Every other week (even)',
    odd: 'Every other week (odd)'
  },
  privileges: {
    auxiliary: 'AP',
    regular: 'RP',
    special: 'SP',
    circuit: 'CO',
    bethelite: 'BT',
    ldc: 'LDC',
    coordinator: 'CBE',
    secretary: 'SEC',
    serviceOverseer: 'SO',
    elder: 'E',
    servant: 'S',
    publisher: 'P'
  },
  period: {
    d: 'D',
    w: 'W',
    '4w': '4W'
  }
}

export default misc
