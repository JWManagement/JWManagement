const modal = {
  close: 'Fermer',
  addParticipant: {
    title: 'Ajouter un participant',
    description: 'Choisi le proclamateur à ajouter pour cet horaire.'
  },
  addVessel: {
    title: 'Ajoute un bateau',
    action: 'Bateau ajouté'
  },
  addWeek: {
    title: 'Créer une nouvelle semaine',
    noTemplate: 'Sélectionner d\'abord un modèle',
    defineTemplate: 'Modèle sélectionné',
    action: 'Créer une semaine',
    text: {
      top: 'Choisi une semaine, à laquelle sera appliquée le modèle :',
      bottom: 'Choisi un modèle de semaine :'
    }
  },
  cancelTeam: {
    title: 'Supprime l\'équipe',
    text: 'Explique pourquoi cette équipe a été supprimée. Tout les participants vont recevoir ce message de suppression par e-mail.',
    action: 'Équipe supprimée'
  },
  copyShift: {
    title: 'Copie l\'horaire',
    text: 'Sélectionne le jour où tu aimerais copier cet horaire.',
    action: 'Copie l\'horaire'
  },
  editPermissions: {
    title: 'Gère les droits {{0}}\'s',
    projectPermissions: 'Droit du projet',
    projectRole: 'Rôle du projet',
    tagPermissions: 'Droit des étiquettes',
    explanations: 'Explications',
    helpText: {
      admin: 'Le responsable de projet possède toutes les autorisations. Il est donc en mesure de tout contrôler. Pour chaque projet, il doit y avoir au moins un responsable de projet.',
      shiftScheduler: 'Le responsable d\'horaire a les mêmes droits qu’un participant, mais il peut aussi organiser les horaires.',
      shiftAdmin: 'Le planificateur des horaires a les mêmes droits qu\'un responsable d\'horaire, mais il peut aussi créer, modifier et supprimer les horaires.',
      storeAdmin: 'Le responsable du stock a les mêmes droits qu’un responsable d\'horaire, mais il peut aussi voir les rapports des horaires et modifier le stock.',
      member: 'Un membre a le droit de voir le centre d\'informations',
      teamleader: 'Une fois que le responsable d\'équipe est assigné à une étiquette, il est responsable des rapports d\'équipes pour cette étiquette.',
      substituteTeamleader: 'L\'adjoint d\'un responsable d\'équipe a les mêmes droits qu\'un responsable d\'équipe. Mais le système est configuré pour sélectionner d\'abord le responsable d\'équipe.',
      participant: 'Les participants peuvent voir et faire des demandes d\'horaires selon les étiquettes qui lui ont été assignées.',
      nothing: 'Avec “Aucun rôle” l\'utilisateur ne peut ni voir ni s\'inscrire à cette étiquette. Il ne peut pas non plus être ajouté à un horaire.'
    }
  },
  editShift: {
    title: 'Modifie les informations de l’horaire',
    mainData: 'Détails principaux',
    tag: 'Étiquette',
    team: 'Équipe',
    teams: 'Équipes assignées à cet horaire',
    helpText: {
      tag: 'Définis l\'étiquette pour cet horaire. Tous les utilisateurs assignés à cette étiquette pourront voir cet horaire.',
      scheduling: 'Les demandes avec “autoriser immédiatement” seront acceptées automatiquement lorsque le nombre minimum de participant est atteint.'
    },
    addTeam: 'Ajoute une nouvelle équipe',
    teamMin: 'Équipe au minimum:',
    teamMax: 'Équipe au maximum:',
    teamStart: 'Début:',
    teamEnd: 'Fin:',
    teamPlace: 'Lieu:',
    removeTeam: 'Supprimer cette équipe',
    noMeeting: 'Pas de lieu de rencontre',
    action: 'Action:',
    delete: 'Supprimer',
    switch: 'Planifier un horaire',
    copyShift: 'Copier l\'horaire'
  },
  editTeamPicture: {
    title: 'Modifier l\'image de l\'équipe',
    currentPicture: 'Image actuelle:',
    hints: 'Cette image sera probablement affichée en plus grand pour le proclamateur.',
    noPictureUploaded: 'Tu n’as pas encore charger d’image',
    upload: 'Charger',
    delete: 'Supprimer'
  },
  editMeetingPicture: {
    title: 'Modifier l’image du point de rencontre',
    currentPicture: 'Image actuelle:',
    hints: 'Cette image sera probablement affichée en plus grand pour le proclamateur.',
    noPictureUploaded: 'Tu n\'as pas encore charger d\'image',
    upload: 'Charger',
    delete: 'Supprimer'
  },
  editVessel: {
    title: 'Modifier le bateau',
    action: 'Modifications sauvées'
  },
  inviteUser: {
    title: 'Inviter des nouveaux proclamateurs',
    key: 'Les <span class="text-warning"> noms qui sont écris en orange </span> ont déjà été invité.',
    selectAll: 'Tout sélectionner',
    noUsers: 'Pas de nouveau proclamateur',
    invite: 'Inviter'
  },
  position: {
    title: 'Indique la position avec le clique gauche de la souris'
  },
  shift: {
    collapseTeam: 'Cache les informations des équipes et les points de rencontre',
    expandTeam: 'Affiche les informations des équipes et les points de rencontre',
    noParticipants: 'Aucun participant',
    requestTeam: 'Fais une demande de participation',
    requestTeamAgain: 'Fais une nouvelle demande de participation',
    requests: 'Demandes',
    cancelRequest: 'Supprimer la demande',
    cancelParticipation: 'Supprimer la participation',
    addParticipant: 'Ajouter un participant',
    closedTeam: 'Cette équipe est bloquée. Tu ne peux plus t\'inscrire.',
    maximumReached: 'Le nombre maximum de participants pour cette équipe est déjà atteint.',
    noPermission: 'Tu n\'as pas l\'autorisation de planifier les utilisateurs.',
    noTeamleader: 'Cet utilisateur n\'a pas le droit d\'être un responsable d\'équipe.',
    alreadyTeamleader: 'Cette utilisateur est déjà un responsable d’équipe.',
    openTeam: 'Ouvrir l\'équipe',
    closeTeam: 'Bloquer l\'équipe',
    switch: 'Modifier l\'horaire',
    existingTeamleaders: 'Le responsable d\'équipe est présent',
    noExistingTeamleader: 'Il manque le responsable d\'équipe'
  },
  shiftReport: {
    title: 'Rapport',
    teamleader: 'responsable d\'équipe',
    substituteTeamleader: 'adjoint au responsable d\'équipe',
    publications: 'Publications',
    occurrences: 'Occurrences',
    store: 'Stock',
    experiences: 'Expériences',
    present: 'Présent',
    sick: 'Malade',
    missing: 'Absent',
    name: 'Nom',
    language: 'Langue',
    count: 'Nombre',
    action: 'Action',
    noPublications: 'Aucune publication par ici',
    select_publication: 'Sélectionne une publication',
    selectPublicationFirst: 'Sélectionne d\'abord une publication',
    addItem: 'Ajoute cette publication',
    removeItem: 'Supprime cette publication',
    texts: 'Versets bibliques',
    speaks: 'Conversations',
    videos: 'Vidéos montrées',
    website: 'Site internet montré',
    returnVisits: 'Nouvelles visites',
    bibleStudies: 'Études bibliques',
    time: 'Heures de service',
    trolleysFilled: 'Les présentoirs ont été remplis',
    neatnessLast: 'État du présentoir après la dernière utilisation',
    bad: 'Mauvais état',
    normal: 'État Normal',
    good: 'Bon état',
    yes: 'Oui',
    no: 'Non',
    expRoute: 'Itinéraire',
    expGood: 'Bonne expérience',
    expProblems: 'Mauvaise expérience',
    date: 'Date',
    toShift: 'Jusqu\'à l\'horaire',
    pages: {
      publisher: 'Proclamateur',
      items: 'Placement du proclamateur',
      occurrences: 'Évènements passés',
      store: 'Au sujet du stock',
      experiences: 'Tes expériences',
      prevPage: 'Aller à la page précédentes',
      nextPage: 'Aller à la page suivante',
      finish: 'Terminer le rapport'
    }
  },
  route: {
    title: 'Créé/Modifie le parcours',
    routeMarkers: 'Parcours en surbrillance',
    addRouteMarkers: 'Clique sur la carte pour ajouter un parcours en surbrillance'
  },
  uploadUserFile: {
    title: 'Chargement du fichier-utilisateur ',
    helpEncoding: 'Le fichier doit être encoder en UTF-8 pour afficher toutes les lettres et symboles',
    uploadFile: 'Charger le fichier CSV',
    name: 'Nom',
    email: 'E-mail',
  },
  mergeAccounts: {
    title: 'Fusionner des comptes',
    description: 'Rentre les informations du compte avec lequel tu veux fusionner les droits. Tu seras connecté à ce compte immédiatement..',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    merge: 'Fusionne les comptes'
  }
}

export default modal
