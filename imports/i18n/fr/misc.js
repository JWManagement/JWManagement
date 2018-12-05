const misc = {
  input: {
    username: 'Nom d\'utilisateur',
    usernameOrEmail: 'Nom d\'utilisateur ou adresse E-mail',
    firstname: 'Nom',
    lastname: 'Prénom',
    email: 'Adresse E-mail',
    telefon: 'Téléphone',
    congregation: 'Assemblée',
    languages: 'Langue',
    gender: 'Sexe',
    privilegeOfService: 'Privilège de service',
    privilegeOfMinistry: 'Nom de l\'assemblée',
    password: 'Mot de passe',
    passwordRepeat: 'Répéter le mot de passe',
    newPassword: 'Nouveau mot de passe',
    newPasswordRepeat: 'Répéter le nouveau mot de passe'
  },
  role: {
    role: 'Rôle',
    admin: 'Responsable de projet',
    shiftScheduler: 'Adjoint pour les horaires',
    shiftAdmin: 'Responsable des plages horaires',
    storeAdmin: 'Responsable du tableau de bord des publications',
    member: 'Membre',
    teamleader: 'Responsable d\'équipe',
    substituteTeamleader: 'Adjoint responsable d\'équipe',
    participant: 'Participant',
    nothing: 'Aucun',
    noPermission: 'Non autorisé'
  },
  permissions: {
    notAdmin: 'Cet utilisateur n\'est pas un responsable de projet.',
    notShiftScheduler: 'Cet utilisateur ne peut pas insérer des plages horaires',
    notShiftAdmin: 'Cet utilisateur n\'est pas un responsable des plages horaires',
    notStoreAdmin: 'Cet utilisateur n\'est pas un responsable du tableau de bord des publications',
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
    '4w': '4W'
  }
}

export default misc
