const pages = {
  profile: {
    name: 'Mon profile',
    personalData: 'Mes données personnelles',
    changePicture: 'Modifier l’image…',
    options: {
      title: 'Paramètres',
      helpText: {
        mergeAccounts: 'Sur JW Management tu peux tout faire avec un seul compte. Tu dois juste te souvenir de ton nom d\'utilisateur et de ton mot de passe. Si tu as plusieurs compte, clique sur « Fusionner les comptes » et rentre les informations de ton deuxième comtpe. Cela fusionnera les droits de ce compte avec ceux du second compte.'
      }
    },
    availability: {
      title: 'Mes disponibilités',
      helpText: 'Coche tes horaires de disponibilité.',
      shortTermCalls: 'Je peux rapidement être contacté.',
      shortTermCallsAlways: 'Même durant les heures de non-disponibilité.'
    },
    speaks: 'Parle',
    telefon: 'Téléphone',
    congregation: 'Assemblée',
    language: 'Langue du compte',
    languages: 'Langues étrangères',
    gender: 'Sexe',
    _gender: {
      brother: 'Frère',
      sister: 'Sœur'
    },
    publisher: 'Proclamateur/trice',
    privilegeOfService: 'Statut',
    _privilegeOfService: {
      auxiliaryPioneer: 'Pionnier auxiliaire',
      pioneer: 'Pionnier permanent',
      specialPioneer: 'Pionnier spécial',
      circuitOverseer: 'Responsable de circonsceription',
      bethelite: 'Béthélite',
      fulltimeConstructionServant: 'Serviteur à la construction'
    },
    ministryPrivilege: 'Responsabilité dans l’assemblée',
    _ministryPrivilege: {
      ministerialServant: 'Assistant',
      elder: 'Ancien',
      coordinator: 'Coordinateur du collège des anciens',
      secretary: 'Secrétaire',
      serviceOverseer: 'Responsable de prédication'
    },
    placeholder: {
      telefon: '(p. ex. +41771234567)',
      congregation: 'Assemblée',
      languages: 'Langues'
    },
    changePassword: 'Modifier le mot de passe',
    deleteAccount: 'Supprimer le compte',
    mergeAccounts: 'Fusionner les deux comptes',
    vacation: {
      title: 'Vacances',
      helpText: 'Ajoute tes absences durant lesquelles tu ne seras pas disponible.'
    },
    until: 'Jusqu’à',
    addVacation: 'Ajoute des absences',
    deleteVacation: 'Supprimer ces absences',
    usernameTaken: 'Cet nom d\'utilisateur est déjà utilisé par quelqu’un d’autre. Choisis en un autre.'
  },
  wiki: {
    name: 'Centre d’information',
    nameShort: 'Info',
    files: 'Fichiers',
    addQuestion: 'Ajouter une question/un titre',
    edit: 'Modifier',
    delete: 'Supprimer',
    noFiles: 'Pas de fichiers disponibles',
    addTab: 'Ajouter un nouvel onglet',
    editQuestion: 'Modifier cette question',
    removeFaq: 'Supprimer cette question',
    editFaq: 'Modifier cette réponse',
    changeFaq: 'Enregistrer cette réponse.',
    cancelFaq: 'Annuler les modifications'
  },
  shifts: {
    name: 'Plages horaires',
    route: 'Itinéraire',
    addShift: 'Ajouter un nouvel horaire',
    addWeek: 'Ajouter une nouvelle semaine',
    requests: 'Demandes',
    openRequests: 'Ouvrir les demandes',
    automation: 'Automatique',
    template: 'Modèle',
    noVisibleShifts: 'Pas d’horaire pour cette étiquette cette semaine-là',
    start: 'Début',
    end: 'Fin',
    visibility: 'Visibilité:',
    helpText: {
      start: 'Ceci est la première semaine créée par le système.',
      end: 'Ceci est la dernière semaine créée par le système.',
      visibility: 'Définit le nombre de semaine d’avance qu’un proclamateur aura pour voir et faire des inscriptions. Entre la première semaine et la dernière semaine, le système va automatiquement créer les horaires nécessaires.'
    },
    weeks: 'Semaines',
    sendWeek: 'Envoyer les attributions.',
    hideNames: 'Cacher les participants des plages horaires',
    showNames: 'Montrer les participants des plages horaires',
    editShifts: 'Modifier les horaires',
    prevWeek: 'Aller à la semaine précédente',
    nextWeek: 'Aller à la semaine prochaine',
    shownTag: 'Les horaires pour cette étiquette sont affichés',
    hiddenTag: 'Les horaires pour cette étiquette sont cachés',
    shift: {
      tag: 'Étiquette',
      schedule: 'Planification',
      teamleader: 'Responsable d\'équipe',
      teams: 'Équipes',
      noTeams: 'Pas d\'équipes',
      participants: 'Participants',
      start: 'Début',
      end: 'Fin',
      requests: 'Demande',
      requests_plural: 'Demandes',
      requestsOf: 'Demande de',
      requestsOf_plural: 'Demandes de',
      teamleaders: 'RÉ',
      noPermission: 'Un responsable de projet ou un planificateur d\'horaire sont les seuls à pouvoir modifier ou ajouter des horaires.'
    }
  },
  day: {
    removeAll: 'Tout supprimer'
  },
  reports: {
    export: 'Exporter en tant que CSV'
  },
  settings: {
    main: {
      title: 'Paramètres principaux',
      id: 'ID',
      name: {
        text: 'Nom',
        placeholder: 'Nom du projet',
        helpText: 'Dans la plupart des cas le nom du projet est le nom de l’assemblée. Pour de plus gros projets qui incluent plusieurs assemblées, on pourra choisir le nom de la ville ou de la région. Si ce projet n’est pas lié aux présentoirs mobiles, le nom du projet peut aussi correspondre à une autre forme de témoignage public.'
      },
      email: {
        text: 'E-mail',
        placeholder: 'Adresse e-mail du projet',
        helpText: 'Cette adresse e-mail sera choisie comme expéditeur des attributions/confirmations d\'horaires. Les annulations d\'attributions/confirmations passeront aussi par cette adresse. C\'est à cette adresse que tu peux poser des questions. Elle sera aussi utilisée pour les modifications des responsables de projet.'
      },
      language: {
        text: 'Langue',
        helpText: 'Lorsque le système envoie des notifications aux adresses ci-dessus, les e-mails partiront dans la langue choisie'
      },
      deleteProject: 'Supprimer le projet'
    },
    tags: {
      title: 'Étiquette',
      helpText: '<p>Chaque horaire doit porter une étiquette. De plus chaque proclamateur peut être autorisé ou pas à voir les horaires en fonction des étiquette.</p><p>Les étiquette peuvent refléter plusieurs activités (ex. Présentoirs mobiles, stand d’exposition, satique, etc.). Il peut être utile de diviser les horaires avec des étiquettes différentes, par exemple s’il y a plusieurs horaires au même moment ou s’il n’y a que certains proclamateurs qui sont formés dans un domaine précis.</p><p>Pour chaque étiquette, il peut y avoir des modèles de semaine qui ont déjà été définis. En utilisant l’option de créer les horaires automatiquement, le programme peut utiliser ces modèles de semaine. Cela fait gagner du temps au responsable de projet ou au planificateur d\'horaires. </p>',
      id: 'ID',
      name: 'Nom',
      img: {
        name: 'Image',
        helpText: 'Cette image sera montrée sur le tableau de bord sous “Horaires”. Cela expliquera le type de tâche exécutée dans les horaires portant cette étiquette. Si vous désirez ajouter une image personnalisée, veuillez nous envoyer un e-mail à support@jwmanagement.org décrivant votre idée.'
      },
      templates: 'Modèles',
      showTemplate: 'Modifier les horaires',
      editTemplate: 'Modifier le nom',
      removeTemplate: 'Supprimer',
      addTemplate: 'Choisir un nouveau modèle.',
      action: 'Action',
      none: 'Aucune étiquette n’a encore été ajouté',
      add: 'Ajouter une nouvelle étiquette',
      remove: 'Supprimer cette étiquette'
    },
    teams: {
      title: 'Équipes',
      helpText: {
        main: 'Pour chaque horaire, il doit y avoir au moins une équipe. Chaque équipe est attribuée à un itinéraire ou parcours. Celui qui participe à un horaire est toujours membre d’une équipe.',
        picture: 'Les proclamateurs peuvent voir cette image. Elle donnera d\'autre détails pour cette équipe. Par exemple, tu pourrais créer un itinéraire sur Google Maps ou sur OpenStreetMap (celle qui possède le plus de détails dans ta zone d’habitation) et ensuite la charger ici.',
        link: 'Ce lien est associé avec cette image. Tu n\'as qu\'à cliquer sur ce lien. Tu peux aussi ajouter ici le lien de GoogleMaps ou d’OpenStreetMap.',
        description: 'Il est parfois nécessaire d\'ajouter une description supplémentaire pour l’équipe, comme la particularité d\'une équipe ou d\'un parcours.'
      },
      id: 'ID',
      name: 'Nom',
      icon: 'Icône',
      picture: 'Image',
      editPicture: 'Charger une image pour cette équipe',
      noPicture: 'Aucune image chargée',
      link: 'Lien',
      description: 'Description',
      action: 'Action',
      none: 'Aucune équipe n’a encore été ajoutée.',
      add: 'Ajouter une nouvelle équipe',
      remove: 'Ajouter une nouvelle équipe'
    },
    meetings: {
      title: 'Point de rencontre',
      helpText: {
        main: 'Chaque équipe peut avoir un point de rencontre. Elles peuvent se rencontrer indépendamment les unes des autres. Cela peut être utile, par exemple lorsque l’itinéraire ou le lieu des équipes est tellement éloignés qu’un point de rencontre commun prendrait trop de temps. Les points de rencontre sont définis par des coordonnées.',
        picture: 'Les proclamateurs peuvent voir cette image. Elle devrait donner davantage de détails sur le point de rencontre. Par exemple, tu peux charger une image de la zone depuis Google Maps ou sur OpenStreetMap (Celle qui possède le plus de détails dans ta zone d’habitation).'
      },
      id: 'ID',
      name: 'Nom',
      picture: 'Image',
      editPicture: 'Charger une image pour ce point de rencontre',
      noPicture: 'Aucune image chargée',
      action: 'Action',
      none: 'Aucun point de rencontre n\'a encore été ajouté',
      add: 'Ajouter un nouveau point de rencontre',
      remove: 'Supprimer ce point de rencontre'
    }
  }
}

export default pages
