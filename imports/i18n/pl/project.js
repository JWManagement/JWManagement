const project = {
  nameShort: 'Admin',
  entity: {
    _id: 'ID',
    name: 'Nazwa',
    email: 'Adres mailowy projektu',
    language: 'Domyślny język',
    languageValues: {
      de: 'Niemiecki',
      en: 'Angielski',
      fi: 'Fiński',
      fr: 'Francuski',
      hu: 'Węgierski',
      it: 'Włoski (częściowo)',
      pl: 'Polski',
      pt: 'Portugalski',
      ru: 'Rosyjski'
    },
    news: {
      text: 'Aktualności'
    },
    shifts: 'Zmiany',
    calendar: 'Kalendarz',
    knowledgeBase: 'Baza wiedzy',
    settings: 'Ustawienia',
    users: 'Użytkownicy',
    publishers: 'Głosiciele',
    publisherActions: 'Akcje grupowe na kontach głosicieli',
    reports: 'Sprawozdania',
    store: 'Magazyn',
    vessels: 'Vessels',
    notes: 'Notatki',
    leave: 'Opuść projekt',
    leaveConfirmation: 'Czy na pewno chcesz opuścić ten projekt? Tej operacji nie można cofnąć.',
    supportPage: 'Wsparcie',
    support: {
      phone: 'Zadzwoń do nas',
      email: 'Wyślij do nas maila',
      github: 'Stwórz zgłoszenie na GitHub',
      paypal: 'PayPal (paypal.me/marvinzeising)'
    },
    noElements: 'Nie znaleziono żadnego projektu'
  },
  details: {
    sections: {
      project: 'Projekt',
      modules: 'Moduły',
      administration: 'Administracja',
      participation: 'Współpraca'
    }
  },
  search: {
    placeholder: 'Szukaj projektów'
  },
  support: {
    details: {
      sections: {
        title: 'Jeżeli doświadczysz jakichkolwiek problemów, masz pytania lub pomysły skontaktuj się z nami!',
        donate: 'Z radością współfinansujemy ten projekt. Jeżeli chciałbyś nas jakoś wesprzeć, cóż, będziemy bardzo zadowoleni'
      }
    }
  }
}

export default project
