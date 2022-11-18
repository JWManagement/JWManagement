const swal = {
  error: 'Fehler',
  publisherInOtherTeam: 'Ein Verkündiger ist bereits in einem anderen Team angenommen. Bitte lehne ihn/sie dort zuerst ab.',
  onlyTeam: 'Dieses Team kannst du nicht löschen. Es ist das einzige Team in dieser Schicht. Jede Schicht braucht mindestens ein Team.',
  noTeamleader: 'In jedem Team muss immer zwingend ein Teamleiter sein. Leider darf dieser Verkündiger nicht als Teamleiter eingeteilt werden.',
  ownPermission: 'Du kannst dir selbst keine Berechtigungen entziehen. Das muss ein anderer Projekt-Administrator machen.',
  approvalInformed: 'Dieser Teilnehmer wurde bereits über seine Zuteilung informiert.',
  declinementInformed: 'Dieser Teilnehmer wurde bereits über seine Bewerbungs-Absage informiert.',
  vacationEndInPast: 'Das Enddatum kann nicht in der Vergangenheit liegen.',
  missingTag: 'Kein Tag definiert. Bitte lege zuerst eines unter Verwaltung > Einstellungen an.',
  logout: {
    title: 'Tipp',
    text: 'Es ist nicht nötig sich abzumelden. Deine Verbindung ist verschlüsselt und wir speichern Sitzungsinformationen lediglich im lokalen Browserstorage. Dadurch kann niemand in deine Sitzung einbrechen.',
    confirm: 'Abmelden',
    cancel: 'Abbrechen'
  },
  invite: {
    user: {
      title: 'Verkündiger einladen?',
      text: 'Da dieser Verkündiger <b>bereits einen Account hat</b>, muss für ihn kein weiterer Account angelegt werden. Stattdessen bekommt er <b>einfach Zugriff auf dieses Projekt</b>.<br>Natürlich <b>informieren wir ihn</b> darüber. <br><p>Falls es mehrere Verkündiger mit dieser E-Mail-Adresse bei JW Management gibt, wähle bitte den richtigen aus:</p>'
    },
    users: {
      title: 'Bist du dir sicher?',
      text: 'An alle ausgewählten Verkündiger werden E-Mails gesendet.',
      confirm: 'Einladen',
      cancel: 'Abbrechen'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Bist du dir sicher?',
      text: 'Alle zugeteilten Verkündiger erhalten eine Bestätigung, und alle abgelehnten Verkündiger eine Absage per Mail.',
      confirm: 'Ja',
      cancel: 'Abbrechen'
    },
    confirmation: {
      title: 'Verkündiger informieren?',
      text: 'Der Verkündiger wird per E-Mail über seine Zuteilung informiert.',
      confirm: 'Ja',
      cancel: 'Abbrechen'
    },
    declined: {
      title: 'Verkündiger informieren?',
      text: 'Der Verkündiger wird per E-Mail darüber Informiert, dass seine Bewerbung abgelehnt wurde.',
      confirm: 'Ja',
      cancel: 'Abbrechen'
    },
    selectTag: {
      title: 'Welches Tag?',
      text: 'Bitte wähle das Tag aus, an welches gesendet werden soll:',
      confirm: 'OK',
      cancel: 'Abbrechen'
    },
    teamUpdate: {
      user: {
        title: 'Teamleiter bereits informiert',
        text: 'Der Teamleiter dieses Teams wurde bereits per E-Mail benachrichtigt. Soll dieser über die Änderung informiert werden?',
        confirm: 'Ja',
        cancel: 'Nein'
      },
      general: {
        title: 'Bist du dir sicher?',
        text: 'Alle bereits informierten Verkündiger erhalten eine Mail mit den aktualisierten Team-Daten.',
        confirm: 'Ja',
        cancel: 'Nein'
      }
    },
    understaffed: {
      title: 'Verkündiger informieren?',
      text: 'Sollen alle Verkündiger darüber informiert werden, dass dieses Team unterbesetzt ist?',
      confirm: 'Ja',
      cancel: 'Nein',
      teamleader: {
        title: 'Teamleiter informieren?',
        text: 'Sollen alle Teamleiter über dieses Team informiert werden?',
        confirm: 'Ja',
        cancel: 'Nein'
      }
    }
  },
  add: {
    meeting: {
      title: 'Neuen Treffpunkt anlegen',
      text: '',
      placeholder: 'Name',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    question: {
      title: 'Frage/Titel anlegen',
      text: '',
      placeholder: 'Frage/Titel',
      inputError: 'Du musst etwas eintippen!',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    tab: {
      title: 'Neuen Tab anlegen',
      text: '',
      placeholder: 'Titel',
      inputError: 'Ungültiger Name für einen Tab!',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    tag: {
      title: 'Neues Tag anlegen',
      text: '',
      placeholder: 'Name',
      inputError: 'Ungültiger Name für ein Tag!',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    team: {
      title: 'Neues Team anlegen',
      text: '',
      placeholder: 'Name',
      inputError: 'Ungültiger Name für ein Team!',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    template: {
      title: 'Vorlagewoche anlegen',
      text: '',
      placeholder: 'Name',
      inputError: 'Ungültiger Name für eine Vorlagewoche!',
      confirm: 'Anlegen',
      cancel: 'Abbrechen'
    },
    user: {
      title: 'Erstellt!',
      text: 'Der User wurde angelegt.'
    },
    users: {
      title: 'Bist du dir sicher?',
      text: 'Alle angezeigten Verkündiger werden dem Projekt hinzugefügt.',
      confirm: 'Hinzufügen',
      cancel: 'Abbrechen'
    }
  },
  update: {
    file: {
      title: 'Dateinamen ändern',
      text: '',
      placeholder: 'Dateiname',
      inputError: 'Ungültiger Dateiname!',
      confirm: 'Ändern',
      cancel: 'Abbrechen'
    },
    password: {
      title: 'Passwort ändern',
      passwordOld: 'Altes Passwort',
      passwordNew1: 'Neues Passwort',
      passwordNew2: 'Neues Passwort wiederholen',
      confirm: 'Ändern',
      cancel: 'Abbrechen',
      passwordChanged: 'Das Passwort wurde geändert'
    },
    question: {
      title: 'Frage/Titel ändern',
      text: '',
      placeholder: 'Frage/Titel',
      confirm: 'Ändern',
      cancel: 'Abbrechen'
    },
    template: {
      title: 'Name ändern',
      text: '',
      placeholder: 'Name',
      confirm: 'Ändern',
      cancel: 'Abbrechen'
    }
  },
  delete: {
    account: {
      title: 'Möchtest du deinen Account wirklich löschen?',
      text: 'Der Account wird unwiderruflich gelöscht und kann nicht wiederhergestellt werden!',
      confirm: 'Meinen Account löschen!',
      cancel: 'Abbrechen'
    },
    allShifts: {
      title: 'Bist du dir sicher?',
      text: 'Alle Schichten dieses Tages und alle Bewerbungen auf diese werden unwiderruflich gelöscht.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    file: {
      title: 'Datei wirklich löschen?',
      text: 'Die Datei wird unwiederruflich gelöscht',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    language: {
      title: 'Diese Sprache wirklich löschen?',
      text: 'Das wird die Sprache samt Lagerbestand löschen.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    meeting: {
      title: 'Treffpunkt wirklich löschen?',
      text: 'Die Treffpunkte werden auch aus bestehenden Schichten gelöscht.',
      checkInput: 'Löschen',
      placeholder: 'Zur Bestätigung "{{0}}" eingeben',
      inputError: 'Die Eingabe stimmte nicht mit "{{0}}" überein',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    note: {
      title: 'Möchtest du diese Notiz wirklich löschen?',
      text: 'Die Notiz wird unwiderruflich gelöscht.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    project: {
      title: 'Möchtest du das Projekt wirklich löschen?',
      text: 'Dadurch wird auch alles direkt und transitiv abhängige (wie z.B. Schichten, Berichte, Bewerbungen, Publikationen, etc.) gelöscht. Lediglich die Benutzeraccounts bleiben vorhanden.',
      checkInput: 'Dieses Projekt löschen',
      placeholder: 'Zur Bestätigung "{{0}}" eingeben',
      inputError: 'Die Eingabe stimmte nicht mit "{{0}}" überein',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    question: {
      title: 'Frage wirklich löschen?',
      text: 'Das wird die Frage samt Antwort unwiderruflich löschen',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    shift: {
      title: 'Schicht wirklich löschen?',
      text: 'Alle Bewerbungen auf diese Schicht gehen verloren.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    tab: {
      title: 'Tab wirklich löschen?',
      text: 'Der gesamte Tab mit allen seinen Fragen wird gelöscht.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    tag: {
      title: 'Tag wirklich löschen?',
      text: 'Es werden alle Schichten gelöscht, die zu diesem Tag gehören. Ebenso werden auch alle Bewerbungen auf diese Schichten gelöscht. <br><br> Bitte zur Bestätigung "Löschen" eingeben.',
      checkInput: 'Löschen',
      placeholder: 'Zur Bestätigung "{{0}}" eingeben',
      inputError: 'Die Eingabe stimmte nicht mit "{{0}}" überein',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    team: {
      title: 'Team wirklich löschen?',
      text: 'Die Teams werden auch aus bestehenden Schichten gelöscht. Angenommene Bewerbungen auf diese Teams werden auf die anderen Teams verteilt. <br><br> Bitte zur Bestätigung "Löschen" eingeben.',
      checkInput: 'Löschen',
      placeholder: 'Zur Bestätigung "{{0}}" eingeben',
      inputError: 'Die Eingabe stimmte nicht mit "{{0}}" überein',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    template: {
      title: 'Vorlage wirklich löschen?',
      text: '',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    user: {
      title: 'Benutzer wirklich löschen?',
      text: 'Dem Benutzer werden sämtliche Berechtigungen in diesem Projekt entzogen.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    },
    wholeWeek: {
      title: 'Die gesamte Woche wirklich löschen?',
      text: 'Auch alle Schichten in dieser Woche werden gelöscht.',
      confirm: 'Löschen',
      cancel: 'Abbrechen'
    }
  },
  request: {
    approve: {
      title: 'Verkündiger wirklich einteilen?',
      text: 'Dieser Verkündiger wurde bereits abgelehnt. Stelle deshalb bitte sicher, dass er immernoch teilnehmen möchte und auch dazu in der Lage ist.',
      confirm: 'Ja',
      cancel: 'Nein'
    },
    cancel: {
      title: 'Bewerbung wirklich zurückziehen?',
      text: 'Dadurch muss möglicherweise das ganze Team aufgelöst werden.',
      confirm: 'Bewerbung zurückziehen',
      cancel: 'Abbrechen'
    },
    decline: {
      title: 'Teilnehmer wirklich ablehnen?',
      text: 'Wenn der Teilnehmer bereits eine E-Mail erhalten hat, bekommt er eine Austragungsbestätigung.',
      confirm: 'Ja',
      cancel: 'Nein'
    },
    maxReached: {
      title: 'Zu viele Bewerber selektiert',
      text: 'Team Maximal-Grenze von {{0}} auf {{1}} setzen und alle annehmen?',
      confirm: 'Selektierte annehmen',
      cancel: 'Abbrechen'
    },
    minNotReached: {
      title: 'Nicht genug Bewerber selektiert',
      text: 'Team Mindest-Grenze von {{0}} auf {{1}} setzen und alle annehmen?',
      confirm: 'Selektierte annehmen',
      cancel: 'Abbrechen'
    },
    minReached: {
      title: 'Teilnehmer wirlich ablehnen?',
      text: 'Die Mindest-Grenze des Teams ist erreicht. Wenn du diesen Teilnehmer ablehnst, wird das System stattdessen das ganze Team absagen.',
      confirm: 'Komplettes Team absagen',
      cancel: 'Nein'
    },
    noNewTeamleader: {
      title: 'Teilnehmer wirlich ablehnen?',
      text: 'Leider ist keine anderer möglicher Teamleiter vorhanden. Wenn du diesen Teilnehmer ablehnst, wird das System stattdessen das ganze Team absagen.',
      confirm: 'Komplettes Team absagen',
      cancel: 'Nein'
    }
  }
}

export default swal
