const vessel = {
  nameShort: 'Schiffe',
  entity:
  {
    name: 'Schiffsname',
    flag: 'Flagge',
    type: 'Typ',
    typeValues:
    {
      c: 'Containerschiff',
      cr: 'Kreuzfahrtschiff',
      mf: 'Frachter',
      mt: 'Tanker',
      p: 'Passagierschiff',
      pt: 'Schubboot',
      rc: 'Flusskreuzfahrtschiff',
      f: 'Fähre',
      ro: 'Ro-Ro',
      t: 'Schlepper',
      unknown: 'Unbekannt'
    },
    callsign: 'Rufzeichen',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Dieses Schiff löschen',
    deleteConfirmation: 'Möchtest du dieses Schiff wirklich löschen?',
    visit:
    {
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
      harborIdValues: [Object],
      country: 'Land',
      language: [Object],
      languages: 'Sprachen an Board'
    }
  },
  search: { placeholder: 'Schiffsname, Rufzeichen, ENI, IMO oder MMSI' },
  details:
  {
    sections:
    {
      identification: 'Identifikationsdaten',
      visit: 'Besuchsdaten'
    },
    dateFormat: 'DD.MM.YYYY'
  },
  visit: { details: { sections: [Object], dateFormat: 'DD.MM.YYYY' } }
}

export default vessel
