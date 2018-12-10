const publisher = {
  entity: {
    username: 'Benutzername',
    profile: {
      firstname: 'Vorname',
      lastname: 'Nachname',
      email: 'E-Mail',
      telefon: 'Telefon',
      gender: 'Geschlecht',
      genderValues: [Object],
      congregation: 'Versammlung',
      pioneer: 'Dienstvorrecht',
      pioneerValues: [Object],
      privilege: 'Dienstamt',
      privilegeValues: [Object],
      language: 'Account Sprache',
      languageValues: [Object],
      languages: 'Fremdsprachen',
      shortTermCalls: 'Unterbesetzt-Mails erhalten',
      shortTermCallsAlways: 'Kurzfristig anfragbar',
      availability: [Object],
      vacation: [Object]
    },
    password: {
      change: 'Passwort ändern',
      reset: 'Passwort-Zurücksetz-Mail senden',
      resetConfirmation: 'Möchtest du diesem Verkündiger wirklich eine Passwort-Zurücksetz-Mail senden?',
      password: 'Neues Passwort eingeben',
      passwordRepeat: 'Neues Passwort wiederholen'
    },
    permissions: {
      permissions: 'Berechtigungen',
      project: 'Projekt Berechtigungen',
      projectValues: [Object],
      tag: [Object]
    },
    invite: 'Einladungsmail senden',
    inviteConfirmation: 'Möchtest du diesem Verkündiger wirklich eine Einladungsmail senden?',
    delete: 'Verkündiger aus diesem Projekt entfernen',
    deleteConfirmation: 'Möchtest du diesen Verkündiger wirklich aus diesem Projekt entfernen?'
  },
  search: { placeholder: 'Vorname, Nachname, E-Mail, Telefon oder Benutzername' },
  details: {
    sections: {
      identification: 'Identifikationsdaten',
      availability: 'Verfügbarkeit',
      vacations: 'Urlaub',
      password: 'Passwort',
      permissions: 'Berechtigungen',
      options: 'Optionen'
    }
  },
  profile: { availability: { details: [Object] } },
  permissions: { details: { sections: [Object] }, tag: { details: [Object] } }
}

export default publisher
