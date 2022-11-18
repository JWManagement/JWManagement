const publisher = {
  entity: {
    username: 'Benutzername',
    profile: {
      firstname: 'Vorname',
      lastname: 'Nachname',
      email: 'E-Mail',
      telefon: 'Telefon',
      gender: 'Geschlecht',
      genderValues: {
        m: 'Bruder',
        w: 'Schwester'
      },
      congregation: 'Versammlung',
      pioneer: 'Dienstvorrecht',
      pioneerValues: {
        publisher: 'Verkündiger',
        auxiliary: 'Hilfspionier',
        regular: 'Pionier',
        special: 'Sonderpionier',
        circuit: 'Kreisaufseher',
        bethelite: 'Bethelit',
        ldc: 'LDC Baudiener'
      },
      privilege: 'Dienstamt',
      privilegeValues: {
        publisher: 'Verkündiger',
        servant: 'Dienstamtgehilfe',
        elder: 'Ältester',
        coordinator: 'Koordinator',
        secretary: 'Sekretär',
        serviceOverseer: 'Dienstaufseher'
      },
      language: 'Account Sprache',
      languageValues: {
        de: 'Deutsch',
        en: 'Englisch',
        fi: 'Finnisch',
        fr: 'Französisch (teilweise)',
        hu: 'Ungarisch',
        it: 'Italienisch',
        pl: 'Polnisch',
        pt: 'Portugiesisch',
        ru: 'Russisch',
        'zh-TW': 'Chinesisch (Traditionell) (teilweise)',
        'zh-CN': 'Chinesisch (Vereinfacht) (teilweise)'
      },
      languages: 'Fremdsprachen',
      shortTermCalls: 'Unterbesetzt-Mails erhalten',
      shortTermCallsAlways: 'Kurzfristig anfragbar',
      availability: {
        'new': 'Neue Verfügbarkeit eintragen',
        noElements: 'Keine Verfügbarkeiten angegeben',
        methodConfirmation: 'Möchtest du diese Verfügbarkeit wirklich löschen?',
        mondays: 'Montags',
        tuesdays: 'Dienstags',
        wednesdays: 'Mittwochs',
        thursdays: 'Donnerstags',
        fridays: 'Freitags',
        saturdays: 'Samstags',
        sundays: 'Sonntags',
        start: 'Beginn',
        startDateFormat: 'H -',
        startValues: {
          '0': '0:00 Uhr',
          '1': '1:00 Uhr',
          '2': '2:00 Uhr',
          '3': '3:00 Uhr',
          '4': '4:00 Uhr',
          '5': '5:00 Uhr',
          '6': '6:00 Uhr',
          '7': '7:00 Uhr',
          '8': '8:00 Uhr',
          '9': '9:00 Uhr',
          '10': '10:00 Uhr',
          '11': '11:00 Uhr',
          '12': '12:00 Uhr',
          '13': '13:00 Uhr',
          '14': '14:00 Uhr',
          '15': '15:00 Uhr',
          '16': '16:00 Uhr',
          '17': '17:00 Uhr',
          '18': '18:00 Uhr',
          '19': '19:00 Uhr',
          '20': '20:00 Uhr',
          '21': '21:00 Uhr',
          '22': '22:00 Uhr',
          '23': '23:00 Uhr'
        },
        end: 'Ende',
        endDateFormat: 'H [Uhr]',
        endValues: {
          '0': '1:00 Uhr',
          '1': '2:00 Uhr',
          '2': '3:00 Uhr',
          '3': '4:00 Uhr',
          '4': '5:00 Uhr',
          '5': '6:00 Uhr',
          '6': '7:00 Uhr',
          '7': '8:00 Uhr',
          '8': '9:00 Uhr',
          '9': '10:00 Uhr',
          '10': '11:00 Uhr',
          '11': '12:00 Uhr',
          '12': '13:00 Uhr',
          '13': '14:00 Uhr',
          '14': '15:00 Uhr',
          '15': '16:00 Uhr',
          '16': '17:00 Uhr',
          '17': '18:00 Uhr',
          '18': '19:00 Uhr',
          '19': '20:00 Uhr',
          '20': '21:00 Uhr',
          '21': '22:00 Uhr',
          '22': '23:00 Uhr',
          '23': '0:00 Uhr'
        },
        wholeDay: 'Ganzer Tag'
      },
      vacation: {
        start: 'Beginn',
        end: 'Ende',
        'new': 'Neuen Urlaub eintragen',
        noElements: 'Kein Urlaub eingetragen',
        methodConfirmation: 'Möchtest du diesen Urlaub wirklich löschen?',
        startDateFormat: 'DD.MM.YYYY [bis]',
        endDateFormat: 'DD.MM.YYYY'
      }
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
      project: 'Projekt-Berechtigung',
      projectValues: {
        admin: 'Administrator',
        shiftScheduler: 'Schichteinteiler',
        shiftAdmin: 'Schichtplaner',
        member: 'Teilnehmer'
      },
      tag: {
        tag: 'Kategorie',
        role: 'Rolle',
        roleValues: {
          teamleader: 'Teamleiter',
          substituteTeamleader: 'Ersatzteamleiter',
          participant: 'Teilnehmer',
          none: 'Nichts'
        }
      }
    },
    status: {
      lastLogin: {
        date: 'Letzte Anmeldung'
      }
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
  profile: {
    availability: {
      details: {
        sections: {
          mondays: 'Verfügbarkeit Montags',
          tuesdays: 'Verfügbarkeit Dienstags',
          wednesdays: 'Verfügbarkeit Mittwochs',
          thursdays: 'Verfügbarkeit Donnerstags',
          fridays: 'Verfügbarkeit Freitags',
          saturdays: 'Verfügbarkeit Samstags',
          sundays: 'Verfügbarkeit Sonntags'
        }
      }
    }
  },
  permissions: {
    details: {
      sections: {
        permissions: {
          project: 'Projekt-Berechtigungen',
          tags: 'Kategorie-Berechtigungen'
        }
      }
    },
    tag: {
      details: {
        sections: {
          permissions: {
            tag: 'Kategorie-Berechtigung'
          }
        }
      }
    }
  }
}

export default publisher
