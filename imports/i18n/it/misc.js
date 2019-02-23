const misc = {
  input: {
    username: 'Nome utente',
    usernameOrEmail: 'Nome utente o indirizzo Email',
    firstname: 'Nome',
    lastname: 'Cognome',
    email: 'Indirizzo Email',
    telefon: 'Telefono',
    congregation: 'Congregazione',
    languages: 'Lingue',
    gender: 'Genere',
    privilegeOfService: 'Privilegio di servizio',
    privilegeOfMinistry: 'Privilegio di congregazione',
    password: 'Password',
    passwordRepeat: 'Ripeti password',
    newPassword: 'Nuova password',
    newPasswordRepeat: 'Ripeti nuova password'
  },
  role: {
    role: 'Ruolo',
    admin: 'Responsabile progetto',
    shiftScheduler: 'Pianificia turni',
    shiftAdmin: 'Responsabile turni',
    storeAdmin: 'Responsabile deposito',
    member: 'Membro',
    teamleader: 'Caposquadra',
    substituteTeamleader: 'Sostituto caposquadra',
    participant: 'Partecipante',
    nothing: 'Niente',
    noPermission: 'Nessun permesso'
  },
  permissions: {
    notAdmin: 'Questo utente non è un responsabile progetto',
    notShiftScheduler: 'Questo utente non pianifica turni',
    notShiftAdmin: 'Questo utente non è un responsabile turni',
    notStoreAdmin: 'Questo utente non è un responsabile per deposito',
    notProjectParticipant: 'Questo utente non fa parte del progetto in questione',
    notTeamleader: 'Questo utente non è caposquadra',
    notTagParticipant: 'Questo utente non fa parte del tag in questione',
    notTeamParticipant: 'Questo utente non fa parte della squadra in questione'
  },
  time: {
    start: 'Inizio',
    end: 'Fine',
    suffix: 'ore',
    years: 'anni',
    to: 'a'
  },
  scheduling: {
    name: 'Pianifica',
    direct: 'Approva immediatamente',
    manual: 'Approva manualmente'
  },
  password: {
    tooShort: 'La password deve essere composta da almeno 8 caratteri',
    notMatching: 'Le password non corrispondono!'
  },
  weekdays: {
    mo: 'Lunedì',
    tu: 'Martedì',
    we: 'Mercoledì',
    th: 'Giovedì',
    fr: 'Venerdì',
    sa: 'Sabato',
    su: 'Domenica'
  },
  intervals: {
    m: 'Manualmente',
    every: 'Ogni settimana',
    even: 'Ogni seconda settimana (pari)',
    odd: 'Ogni seconda settimana (dispari)'
  },
  privileges: {
    auxiliary: 'PA',
    regular: 'PR',
    special: 'PS',
    circuit: 'SC',
    bethelite: 'BT',
    ldc: 'LDC',
    coordinator: 'CCA',
    secretary: 'SEG',
    serviceOverseer: 'SDS',
    elder: 'A',
    servant: 'SM',
    publisher: 'P'
  },
  period: {
    d: 'G',
    w: 'S',
    '4s': '4S'
  }
}

export default misc
