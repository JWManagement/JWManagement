const project = {
  nameShort: 'Verwaltung',
  entity: {
    _id: 'ID',
    name: 'Name',
    email: 'Projekt E-Mail Adresse',
    language: 'Standard Sprache',
    languageValues: {
      de: 'Deutsch',
      en: 'Englisch',
      fi: 'Finnisch',
      fr: 'Französisch',
      hu: 'Ungarisch',
      it: 'Italienisch (teilweise)',
      pl: 'Polnisch',
      pt: 'Portugiesisch',
      ru: 'Russisch'
    },
    news: {
      text: 'Neuigkeiten'
    },
    shifts: 'Schichten',
    calendar: 'Kalender',
    knowledgeBase: 'Informationen',
    settings: 'Einstellungen',
    users: 'Benutzer',
    publishers: 'Verkündiger',
    publisherActions: 'Verkündiger Massenfunktionen',
    reports: 'Berichte',
    store: 'Depot',
    vessels: 'Schiffe',
    notes: 'Notizen',
    leave: 'Teilnahme an diesem Projekt aufkündigen',
    leaveConfirmation: 'Möchtest du dieses Projekt wirklich verlassen und JEGLICHE TEILNAHME DARAN AUFKÜNDIGEN? Das kann nicht rückgängig gemacht werden!',
    supportPage: 'Hilfe',
    support: {
      phone: 'Ruf an',
      discord: 'Schreib uns auf Discord (empfohlen)',
      github: 'Lege ein GitHub Issue an',
      paypal: 'PayPal',
      iban: 'IBAN'
    },
    noElements: 'Keine Projekte gefunden'
  },
  details: {
    sections: {
      project: 'Projekt',
      modules: 'Module',
      administration: 'Verwaltung',
      participation: 'Teilnahme'
    }
  },
  search: {
    placeholder: 'Suche nach Projekten'
  },
  support: {
    details: {
      sections: {
        support: 'Hilfe bekommen',
        donate: 'Unterstützen'
      }
    }
  }
}

export default project
