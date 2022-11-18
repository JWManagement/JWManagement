const pages = {
  profile: {
    name: 'Mein Profil',
    personalData: 'Meine Daten',
    changePicture: 'Bild ändern...',
    options: {
      title: 'Optionen',
      helpText: {
        mergeAccounts: 'Bei JW Management brauchst du für alles nur einen einzigen Account und musst dir nur einen Benutzernamen und ein Passwort merken. Falls du mehrere Accounts hast, klicke auf "Berechtigungen übertragen" und gib die Anmeldedaten deines zweiten Accounts ein. Die Berechtigungen dieses Accounts werden dann in den angegebenen Account übertragen.'
      }
    },
    availability: {
      title: 'Verfügbarkeit',
      helpText: 'Markiere bitte die Stunden, in denen du verfügbar bist.',
      shortTermCalls: 'Ich darf kurzfristig kontaktiert werden',
      shortTermCallsAlways: 'Auch wenn keine Verfügbarkeit angegeben ist'
    },
    speaks: 'Spricht',
    telefon: 'Telefon',
    congregation: 'Versammlung',
    language: 'Account Sprache',
    languages: 'Fremdsprachen',
    gender: 'Geschlecht',
    _gender: {
      brother: 'Bruder',
      sister: 'Schwester'
    },
    publisher: 'Verkündiger',
    privilegeOfService: 'Dienstvorrecht',
    _privilegeOfService: {
      auxiliaryPioneer: 'Hilfspionier',
      pioneer: 'Pionier',
      specialPioneer: 'Sonderpionier',
      circuitOverseer: 'Kreisaufseher',
      bethelite: 'Bethelit',
      fulltimeConstructionServant: 'LDC Baudiener'
    },
    ministryPrivilege: 'Dienstamt',
    _ministryPrivilege: {
      ministerialServant: 'Dienstamtgehilfe',
      elder: 'Ältester',
      coordinator: 'Koordinator',
      secretary: 'Sekretär',
      serviceOverseer: 'Dienstaufseher'
    },
    placeholder: {
      telefon: '(z.B. +49 177 1234567)',
      congregation: 'Musterstadt-Englisch-West',
      languages: 'Deutsch, Französisch, Englisch'
    },
    changePassword: 'Passwort ändern',
    deleteAccount: 'Account löschen',
    mergeAccounts: 'Berechtigungen übertragen',
    vacation: {
      title: 'Urlaub',
      helpText: 'Gib bitte die Zeiträume an, in denen du nicht verfügbar bist.'
    },
    until: 'bis',
    addVacation: 'Urlaub hinzufügen',
    deleteVacation: 'Urlaub wieder stornieren',
    usernameTaken: 'Dieser Benutzername wird schon verwendet. Bitte wähle einen anderen'
  },
  wiki: {
    name: 'Informationen',
    nameShort: 'Infos',
    files: 'Dateien',
    addQuestion: 'Frage/Titel hinzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    noFiles: 'Keine Dateien verfügbar',
    addTab: 'Neuen Reiter hinzufügen',
    editQuestion: 'Titel bearbeiten',
    removeFaq: 'Titel löschen',
    editFaq: 'Antwort bearbeiten',
    changeFaq: 'Änderungen speichern',
    cancelFaq: 'Änderungen abbrechen'
  },
  shifts: {
    name: 'Schichten',
    route: 'Route',
    addShift: 'Neue Schicht erstellen',
    deleteWeek: 'Die gesamte Woche löschen',
    addWeek: 'Neue Woche anlegen',
    requests: 'Bewerbungen',
    openRequests: 'Offene Bewerbungen',
    automation: 'Automatismus',
    template: 'Vorlage',
    noVisibleShifts: 'Keine Schichten dieser Kategorie(n) in dieser Woche',
    start: 'Start',
    end: 'Ende',
    visibility: 'Sichtbarkeit:',
    helpText: {
      start: 'Dies ist die erste Woche, die das System erstellen wird.',
      end: 'Dies ist die letzte Woche, die das System erstellen wird.',
      visibility: 'Hiermit bestimmst du, wie viele Wochen im voraus die Brüder sich bewerben können. Das System erstellt unter Beachtung der Start- und End-Wochen die nötigen Schichten dafür.'
    },
    weeks: 'Wochen',
    sendWeek: 'Zuteilungen senden',
    hideNames: 'Schicht-Teilnehmer verbergen',
    showNames: 'Schicht-Teilnehmer zeigen',
    editShifts: 'Schichten bearbeiten',
    prevWeek: 'Zur vorherigen Woche gehen',
    nextWeek: 'Zur nächsten Woche gehen',
    shownTag: 'Schichten dieser Kategorie werden momentan angezeigt',
    hiddenTag: 'Schichten dieser Kategorie werden momentan verborgen',
    shift: {
      tag: 'Kategorie',
      schedule: 'Einteilung',
      teamleader: 'Teamleiter',
      teams: 'Teams',
      noTeams: 'Keine Teams',
      participants: 'Teilnehmer',
      start: 'Start',
      end: 'Ende',
      requests: 'Bewerbung',
      requests_plural: 'Bewerbungen',
      requestsOf: 'Bewerbung von',
      requestsOf_plural: 'Bewerbungen von',
      teamleaders: 'TL',
      noPermission: 'Nur ein Administrator oder Schichtplaner darf die Schichten bearbeiten.'
    }
  },
  day: {
    removeAll: 'Alle löschen'
  },
  settings: {
    main: {
      title: 'Allgemeine Einstellungen',
      id: 'ID',
      name: {
        text: 'Name',
        placeholder: 'Projektname',
        helpText: 'Der Projektname ist in den meisten Fällen der Name der Versammlung. Bei größeren Projekten beschreibt er den Namen der Stadt, in der das Projekt durchgeführt wird. Hat das Projekt nicht direkt mit dem Trolley-Dienst zu tun, kann die Art des Dienstes mit in den Namen aufgenommen werden.'
      },
      news: {
        text: 'Neuigkeiten',
        placeholder: 'Keine Neuigkeiten',
        helpText: 'Die Neuigkeiten werden allen Teilnehmern oben auf der Projekt Übersicht angezeigt.'
      },
      email: {
        text: 'E-Mail',
        placeholder: 'Projekt E-Mail Adresse',
        helpText: 'Bei E-Mails zu angenommenen Schichten, Teamleiter-Aktualisierungen etc. wird diese E-Mail Adresse als replyTo gesetzt. Antworten Verkündiger auf diese Mails, landen die Antworten im Postfach dieser E-Mail Adresse. Außerdem wird diese E-Mail Adresse z.B. bei kurzfristigen Absagen informiert.'
      },
      language: {
        text: 'Sprache',
        helpText: 'Wenn das System Benachrichtigungen an die oben angegebene Adresse verschickt, wird die Sprache verwendet, die du hier angibst.'
      },
      deleteProject: 'Projekt löschen'
    },
    tags: {
      title: 'Kategorien',
      helpText: '<p>Jede Schicht muss einer Kategorie zugeordnet werden. Außerdem kann jeder Teilnehmer für bestimmte Kategorien berechtigt werden oder nicht. Ein Teilnehmer sieht lediglich die Schichten, die einer Kategorie zugeordet wurden, für die er berechtigt ist.</p><p>Mit Kategorien können verschiedene Tätigkeiten abgebildet werden (z.B. Trolley, Infostand, Ordnungsdienst, Parkplatzdienst, etc.). Das Aufteilen von Schichten in verschiedene Kategorien mag besonders dann Sinn machen, wenn sich die Schichten sonst zeitlich überschneiden würden.</p><p>In jeder Kategorie kann eine Reihe von Vorlage-Wochen definiert werden.</p>',
      id: 'ID',
      name: 'Name',
      img: {
        name: 'Bild',
        helpText: 'Dieses Bild wird auf der Übersicht angezeigt, wenn man auf \'Schichten\' klickt. Es sollte repräsentieren, wofür die Schichten dieser Kategorie gedacht sind. Wenn du ein eigenes Bild einbinden möchtest, sende uns bitte eine Mail an support@jwmanagement.org mit deinem Vorschlag.'
      },
      templates: 'Vorlagewochen',
      showTemplate: 'Schichten bearbeiten',
      editTemplate: 'Name ändern',
      removeTemplate: 'Löschen',
      addTemplate: 'Neue Vorlage definieren',
      action: 'Aktion',
      none: 'Es wurden noch keine Kategorien angelegt',
      add: 'Neue Kategorie erstellen',
      remove: 'Kategorie löschen'
    },
    teams: {
      title: 'Teams',
      helpText: {
        main: 'Innerhalb einer Schicht kann es ein oder mehrere Teams geben. Zu jedem Team gehört eine Route. Ein Verkündiger gehört immer einem Team an. Falls in der jeweiligen Schicht erlaubt, kann er sich auch auf spezielle Teams bewerben, anstatt nur auf die gesamte Schicht.',
        picture: 'Dieses Bild können die Verkündiger sich anschauen. Es sollte weitere Informationen zu den Aufgaben innerhalb dieses Teams geben. Zum Beispiel könntest du auf Google MyMaps eine Trolley-Route für dieses Teams erstellen und ein Bild davon hier hochladen.',
        link: 'Dieser Link wird mit dem Bild verknüpft. Wenn der Benutzer auf das Bild klickt, wird er auf diese Seite geleitet. Beispielsweise könntest du ein Bild von der Route auf Google MyMaps hochladen und den Link zu deiner Karte hier angeben.',
        description: 'Hier kannst du optional noch eine Beschreibung zu diesem Team angeben. Zum Beispiel könntest du ein paar Besonderheiten für diese Route erklären.'
      },
      id: 'ID',
      name: 'Name',
      icon: 'Icon',
      picture: 'Bild',
      editPicture: 'Ein Bild für dieses Team hochladen',
      noPicture: 'Kein Bild hochgeladen',
      link: 'Link',
      description: 'Beschreibung',
      action: 'Aktion',
      none: 'Es wurden noch keine Teams angelegt',
      add: 'Neues Team erstellen',
      remove: 'Team löschen'
    },
    meetings: {
      title: 'Treffpunkte',
      helpText: {
        main: 'In jeder Schicht können die Teams Treffpunkte zugewiesen bekommen. Dadurch können sich die einzelnen Teams unabhängig voneinander treffen. Das kann sinnvoll sein, wenn die Routen der Teams so weit voneinander entfernt sind, dass ein gemeinsamer Treffpunkt für die ganze Schicht zu zeitintensiv wäre. Treffpunkte werden mit Koordinaten definiert.',
        picture: 'Dieses Bild können die Verkündiger sich anschauen. Es sollte weitere Informationen zu dem Treffpunkt enthalten. Zum Beispiel könntest du ein Bild der Umgebung von Google Maps hier hochladen.'
      },
      id: 'ID',
      name: 'Name',
      picture: 'Bild',
      editPicture: 'Ein Bild für diesen Treffpunkt hochladen',
      noPicture: 'Kein Bild hochgeladen',
      action: 'Aktion',
      none: 'Es wurden noch keine Treffpunkte angelegt',
      add: 'Neues Treffpunkt erstellen',
      remove: 'Treffpunkt löschen'
    }
  }
}

export default pages
