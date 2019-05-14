const vessel = {
  nameShort: 'Schiffe',
  entity: {
    name: 'Schiffsname',
    flag: 'Flagge',
    type: 'Typ',
    typeValues: {
      c: 'Containerschiff',
      ca: 'Katamaran',
      cr: 'Kreuzfahrtschiff',
      ex: 'Kursschiff',
      mf: 'Frachter',
      mt: 'Tanker',
      p: 'Passagierschiff',
      pt: 'Schubboot',
      r: 'Kühlschiff',
      rc: 'Flusskreuzfahrtschiff',
      f: 'Fähre',
      fi: 'Fischerboot',
      ro: 'Ro-Ro',
      t: 'Schlepper',
      unknown: 'Sonstiges'
    },
    callsign: 'Rufzeichen',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Dieses Schiff löschen',
    deleteConfirmation: 'Möchtest du dieses Schiff wirklich löschen?',
    visit: {
      new: 'Neuen Besuch erfassen',
      noElements: 'Dieses Schiff wurde noch nicht besucht',
      delete: 'Diesen Besuch löschen',
      deleteConfirmation: 'Möchtest du wirklich diesen Besuch löschen?',
      person: 'Verkündiger',
      email: 'Verkündiger E-Mail',
      phone: 'Verkündiger Telefon',
      isUserVisible: 'Deine Kontaktdaten für andere Verkündiger sichtbar machen?',
      date: 'Datum',
      dateNext: 'Nächster Besuch frühestens',
      harbor: 'Hafen',
      harborId: 'Hafen',
      harborIdValues: {
        placeholder: 'Wähle einen Hafen'
      },
      country: 'Land',
      language: {
        new: 'Neue Sprache hinzufügen',
        noElements: 'Noch keine Sprache eingetragen',
        methodConfirmation: 'Möchtest du diese Sprache wirklich löschen?',
        languageIds: 'Sprache',
        languageIdsValues: {
          placeholder: 'Wähle eine Sprache'
        }
      },
      languages: 'Sprachen an Board'
    }
  },
  search: {
    placeholder: 'Schiffsname, Rufzeichen, ENI, IMO oder MMSI'
  },
  details: {
    sections: {
      identification: 'Identifikationsdaten',
      visit: 'Besuchsdaten'
    },
    dateFormat: 'DD.MM.YYYY'
  },
  visit: {
    details: {
      sections: {
        main: 'Besuchsdaten',
        language: 'Sprachen',
        option: 'Optionen'
      },
      dateFormat: 'DD.MM.YYYY'
    }
  }
}

export default vessel
