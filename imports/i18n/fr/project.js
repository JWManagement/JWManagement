const project = {
  nameShort: 'Admin',
  entity: {
    _id: 'ID',
    name: 'Nom',
    email: 'Adresse E-mail du projet',
    language: 'Langue par défaut',
    languageValues: {
      de: 'Allemand',
      en: 'Anglais',
      fi: 'Finnois',
      fr: 'Français',
      hu: 'Hongrois',
      it: 'Italien (en partie)',
      pl: 'Polonais',
      pt: 'Portugais',
      ru: 'Russe'
    },
    news: {
      text: 'Communications'
    },
    shifts: 'Plage horaire',
    calendar: 'Calendrier',
    knowledgeBase: 'Premiers pas avec JW Management',
    settings: 'Paramètres',
    users: 'Utilisateurs',
    publishers: 'Proclamateurs',
    publisherActions: 'Action global proclamateur',
    reports: 'Rapports',
    store: 'Tableau de bord des publications',
    vessels: 'Plages horaires',
    notes: 'Notes',
    leave: 'Supprime toute participation à ce projet',
    leaveConfirmation: 'Voulez-vous vraiment quitter ce projet et ANNULER DE FAÇON PERMANENTE TOUTE PARTICIPATION? Retour en arrière impossible !',
    supportPage: 'Support',
    support: {
      phone: 'Téléphonez-nous',
      discord: 'Écrivez-nous au sujet d\'une confusion (De préférence)',
      github: 'Créez une mise au point GitHub',
      paypal: 'PayPal',
      iban: 'IBAN'
    },
    noElements: 'Aucun projet trouvé'
  },
  details: {
    sections: {
      project: 'Projet',
      modules: 'Modules',
      administration: 'Administration',
      participation: 'Participation'
    }
  },
  search: {
    placeholder: 'Recherche de projets'
  },
  support: {
    details: {
      sections: {
        support: 'Obtenez un support',
        donate: 'DON'
      }
    }
  }
}

export default project
