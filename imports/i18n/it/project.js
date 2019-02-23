const project = {
  nameShort: 'Amministratore',
  entity: {
    _id: 'ID',
    name: 'Nome',
    email: 'Indirizzo Email del progetto',
    language: 'Lingua prestabilita',
    languageValues: {
      de: 'Tedesco',
      en: 'Inglese',
      fi: 'Finlandese',
      fr: 'Francese',
      hu: 'Ungherese',
      it: 'Italiano',
      pl: 'Polacco',
      pt: 'Portoghese',
      ru: 'Russo',
      'zh-TW': 'Cinese (Tradizionale) (in parte)',
      'zh-CN': 'Cinese (Semplificato) (in parte)'
    },
    news: {
      text: 'Novità'
    },
    shifts: 'Turni',
    calendar: 'Calendario',
    knowledgeBase: 'Knowledge Base',
    settings: 'Impostazioni',
    users: 'Utenti',
    publishers: 'Proclamatori',
    publisherActions: 'Azioni Proclamatori',
    reports: 'Rapporti',
    store: 'Deposito',
    vessels: 'Navi',
    notes: 'Note',
    leave: 'Cancella ogni partecipazione a questo progetto',
    leaveConfirmation: 'Sei sicuro di volere abbandonare questo progetto e CANCELLARE PERMANENTEMENTE OGNI PARTECIPAZIONE ad esso? Questo è irreversibile!',
    supportPage: 'Support',
    support: {
      phone: 'Chiamaci',
      discord: 'Scrivici su Discord (preferito)',
      github: 'Crea un issue su GitHub',
      paypal: 'PayPal',
      iban: 'IBAN'
    },
    noElements: 'Nessun progetto trovato'
  },
  details: {
    sections: {
      project: 'Progetto',
      modules: 'Moduli',
      administration: 'Amministrazione',
      participation: 'Partecipazione'
    }
  },
  search: {
    placeholder: 'Cerca progetti'
  },
  support: {
    details: {
      sections: {
        support: 'Ricevi support',
        donate: 'Fai una donazione'
      }
    }
  }
}

export default project
