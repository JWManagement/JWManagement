const misc = {
  input: {
    username: 'Benutzername',
    firstname: 'Vorname',
    lastname: 'Nachname',
    email: 'E-Mail Adresse',
    telefon: 'Telefon',
    congregation: 'Versammlung',
    languages: 'Fremdsprachen',
    gender: 'Geschlecht',
    privilegeOfService: 'Dienstvorrecht',
    privilegeOfMinistry: 'Dienstamt',
    password: 'Passwort',
    passwordRepeat: 'Passwort wiederholen',
    newPassword: 'Neues Passwort',
    newPasswordRepeat: 'Neues Passwort wiederholen'
  },
  role: {
    role: 'Rolle',
    admin: 'Administrator',
    shiftScheduler: 'Schichteinteiler',
    shiftAdmin: 'Schichtplaner',
    member: 'Teilnehmer',
    teamleader: 'Teamleiter',
    substituteTeamleader: 'Ersatz-Teamleiter',
    participant: 'Teilnehmer',
    nothing: 'Keine',
    noPermission: 'Keine Berechtigung'
  },
  permissions: {
    notAdmin: 'Dieser Benutzer ist kein Projekt Administrator',
    notShiftScheduler: 'Dieser Benutzer ist kein Schichteinteiler',
    notShiftAdmin: 'Dieser Benutzer ist kein Schichtplaner',
    notProjectParticipant: 'Dieser Benutzer nimmt nicht an diesem Projekt teil',
    notTeamleader: 'Dieser Benutzer ist kein Teamleiter',
    notTagParticipant: 'Dem Benutzer fehlen die Berechtigungen, um an Schichten dieser Kategorie teilnehmen zu dürfen',
    notTeamParticipant: 'Dieser Benutzer ist kein Teilnehmer des Teams'
  },
  time: {
    start: 'Start',
    end: 'Ende',
    suffix: 'Uhr',
    years: 'Jahre',
    to: 'bis'
  },
  scheduling: {
    name: 'Einteilung',
    direct: 'Sofort zusagen',
    manual: 'Manuell zusagen'
  },
  password: {
    tooShort: 'Das Passwort muss mindestens 8 Zeichen lang sein!',
    notMatching: 'Die Passwörter stimmen nicht überein!'
  },
  weekdays: {
    mo: 'Montag',
    tu: 'Dienstag',
    we: 'Mittwoch',
    th: 'Donnerstag',
    fr: 'Freitag',
    sa: 'Samstag',
    su: 'Sonntag'
  },
  intervals: {
    m: 'Manuell',
    every: 'Jede Woche',
    even: 'Jede gerade Woche',
    odd: 'Jede ungerade Woche'
  },
  privileges: {
    auxiliary: 'HPV',
    regular: 'APV',
    special: 'SPV',
    circuit: 'KA',
    bethelite: 'BTL',
    ldc: 'LDC',
    coordinator: 'Koordinator',
    secretary: 'Sekretär',
    serviceOverseer: 'Dienstaufseher',
    elder: 'Ä',
    servant: 'DAG',
    publisher: 'VK'
  },
  period: {
    d: 'T',
    w: 'W',
    '4w': '4W'
  }
}

export default misc
