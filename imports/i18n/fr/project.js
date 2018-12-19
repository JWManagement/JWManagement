const project = {
  nameShort: 'Admin',
  entity: {
    _id: 'ID',
    name: 'Nom',
    email: 'Adresse e-mail du projet',
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
    publisherActions: 'Importer ou exporter des proclamateurs, mais aussi nvoyer des e-mails aux proclamateurs',
    reports: 'Rapports',
    store: 'Stock des publications',
    vessels: 'Plages horaires',
    notes: 'Notes',
    leave: 'Supprime toutes les participations à ce projet',
    leaveConfirmation: 'Veux-tu vraiment quitter ce projet et annuler de façon permanente toute participation ? Action définitive !',
    supportPage: 'Support',
    support: {
      phone: 'Téléphone-nous',
      discord: 'Écris-nous au sujet d\'une question (De préférence)',
      github: 'Créé une mise au point GitHub',
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
