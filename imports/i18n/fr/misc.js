const misc = {
  input: {
    username: 'Nom d\'utilisateur',
    usernameOrEmail: 'Nom d\'utilisateur ou adresse e-mail',
    firstname: 'Prénom',
    lastname: 'Nom',
    email: 'Adresse e-mail',
    telefon: 'Téléphone',
    congregation: 'Assemblée',
    languages: 'Langue',
    gender: 'Sexe',
    privilegeOfService: 'Statut',
    privilegeOfMinistry: 'Nom de l\'assemblée',
    password: 'Mot de passe',
    passwordRepeat: 'Répéter le mot de passe',
    newPassword: 'Nouveau mot de passe',
    newPasswordRepeat: 'Répéter le nouveau mot de passe'
  },
  role: {
    role: 'Rôle',
    admin: 'Responsable de projet',
    shiftScheduler: 'Responsable des horaires',
    shiftAdmin: 'Planificateur des horaires',
    storeAdmin: 'Responsable du stock des publications',
    member: 'Membre',
    teamleader: 'Responsable d\'équipe',
    substituteTeamleader: 'Adjoint au responsable d\'équipe',
    participant: 'Participant',
    nothing: 'Aucun rôle',
    noPermission: 'Aucun droit'
  },
  permissions: {
    notAdmin: 'Cet utilisateur n\'est pas un responsable de projet.',
    notShiftScheduler: 'Cet utilisateur n\'est pas un responsable d\'horaires',
    notShiftAdmin: 'Cet utilisateur n\'est pas un planificateur d\'horaires',
    notStoreAdmin: 'Cet utilisateur n\'est pas un responsable du stock des publications',
    notProjectParticipant: 'Cet utilisateur ne participe pas à ce projet',
    notTeamleader: 'Cet utilisateur n\'est pas un responsable d\'équipe',
    notTagParticipant: 'Cet utilisateur ne fait pas partie de cette étiquette',
    notTeamParticipant: 'Cet utilisateur ne fait pas partie de cette équipe'
  },
  time: {
    start: 'Début',
    end: 'Fin',
    suffix: 'Heure',
    years: 'Année',
    to: 'Jusqu\'à'
  },
  scheduling: {
    name: 'Planification',
    direct: 'Confirmation automatique',
    manual: 'Confirmation manuelle'
  },
  password: {
    tooShort: 'Le mot de passe doit avoir au moins 8 caractères',
    notMatching: 'Le mot de passe ne correspond pas !'
  },
  weekdays: {
    mo: 'Lundi',
    tu: 'Mardi',
    we: 'Mercredi',
    th: 'Jeudi',
    fr: 'Vendredi',
    sa: 'Samedi',
    su: 'Dimanche'
  },
  intervals: {
    m: 'Manuellement',
    every: 'Chaque semaine',
    even: 'Chaque semaine paire',
    odd: 'Chaque semaine impaire'
  },
  privileges: {
    auxiliary: 'PA',
    regular: 'PP',
    special: 'SP',
    circuit: 'RC',
    bethelite: 'BETH',
    ldc: 'LDC',
    coordinator: 'CDA',
    secretary: 'SEC',
    serviceOverseer: 'R.P.',
    elder: 'ANC',
    servant: 'ASS',
    publisher: 'PROCL'
  },
  period: {
    d: 'J',
    w: 'S',
    '4w': '4S'
  }
}

export default misc
