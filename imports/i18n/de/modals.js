const modal = {
  close: 'Schließen',
  addParticipant: {
    title: 'Teilnehmer hinzufügen',
    description: 'Wähle die Verkündiger aus, die zu der Schicht hinzugefügt werden sollen.',
    search: 'Suche nach Verkündigern',
    addAsRequests: 'Als Bewerber hinzufügen',
    addAsParticipants: 'Als Teilnehmer hinzufügen'
  },
  addVessel: {
    title: 'Neues Schiff hinzufügen',
    action: 'Schiff hinzufügen'
  },
  addWeek: {
    title: 'Neue Woche anlegen',
    noTemplate: 'Bitte leg zuerst eine Vorlage an',
    defineTemplate: 'Vorlage anlegen',
    action: 'Woche anlegen',
    text: {
      top: 'Wähle die Woche aus, auf die die Vorlagewoche angewendet werden soll:',
      bottom: 'Wähle die Vorlagewoche aus:'
    }
  },
  cancelTeam: {
    title: 'Team absagen',
    text: 'Beschreibe, warum dieses Team abgesagt werden muss. Die einzelnen Verkündiger bekommen diesen Text in der Absage-Mail angezeigt.',
    action: 'Team absagen'
  },
  copyShift: {
    title: 'Schicht kopieren',
    text: 'Selektiere die Tage, zu denen du Schicht kopieren möchtest.',
    action: 'Schicht kopieren'
  },
  editShift: {
    title: 'Schichtdaten bearbeiten',
    mainData: 'Allgemeine Daten',
    tag: 'Kategorie',
    team: 'Team',
    teams: 'Teams dieser Schicht',
    helpText: {
      tag: 'Wähle die Kategorie aus, der die Schicht zugeordnet werden soll. Alle Verkündiger mit Berechtigung für diese Kategorie können die Schicht sehen.',
      scheduling: 'Bei \'Sofort zusagen\' werden die Bewerbungen der Verkündiger sofort zugesagt, wenn die Mindest-Teilnehmer Grenze des nächsten Teams erreicht ist.'
    },
    addTeam: 'Neues Team erstellen',
    teamMin: 'Min. Teilnehmer:',
    teamMax: 'Max. Teilnehmer:',
    teamStart: 'Start:',
    teamEnd: 'Ende:',
    teamPlace: 'Ort:',
    removeTeam: 'Dieses Team löschen',
    noMeeting: 'Kein Treffpunkt',
    action: 'Aktion:',
    delete: 'Löschen',
    switch: 'Schicht einteilen',
    copyShift: 'Schicht kopieren'
  },
  editTeamPicture: {
    title: 'Team Bild ändern',
    currentPicture: 'Aktuelles Bild:',
    hints: 'Dieses Bild wird dem Verkündiger eventuell größer angezeigt.',
    noPictureUploaded: 'Du hast noch kein Bild hochgeladen',
    upload: 'Hochladen',
    delete: 'Löschen'
  },
  editMeetingPicture: {
    title: 'Treffpunkt Bild ändern',
    currentPicture: 'Aktuelles Bild:',
    hints: 'Dieses Bild wird dem Verkündiger eventuell größer angezeigt.',
    noPictureUploaded: 'Du hast noch kein Bild hochgeladen',
    upload: 'Hochladen',
    delete: 'Löschen'
  },
  editVessel: {
    title: 'Schiff-Daten ändern',
    action: 'Änderungen speichern'
  },
  inviteUser: {
    title: 'Neue Verkündiger einladen',
    key: '<span class="text-warning">Oranger Name</span> bedeutet, dass der User bereits eingeladen wurde.',
    selectAll: 'Alle auswählen',
    noUsers: 'Keine neuen Verkündiger gefunden',
    invite: 'Einladen'
  },
  position: {
    title: 'Position mit linker Maustaste markieren'
  },
  shift: {
    clickToEnlarge: 'Klicke auf das Bild um es zu vergrößern',
    openLink: 'Verlinkte Informationen öffnen',
    meetingAt: 'Treffpunkt um',
    collapseTeam: 'Route und Treffpunkte verbergen',
    expandTeam: 'Route und Treffpunkte anzeigen',
    noParticipants: 'Keine Teilnehmer',
    requestTeam: 'Bewerben',
    requestTeamAgain: 'Nochmal bewerben',
    requests: 'Bewerbungen',
    cancelRequest: 'Bewerbung zurückziehen',
    cancelParticipation: 'Teilnahme absagen',
    addParticipant: 'Verkündiger hinzufügen',
    closedTeam: 'Dieses Team ist geschlossen. Du kannst dich nicht bewerben',
    maximumReached: 'Die Maximal Grenze für das Team wurde bereits erreicht',
    noPermission: 'Du hast nicht die Berechtigung, andere Benutzer einzuteilen',
    noTeamleader: 'Dieser Verkündiger hat keine Teamleiter-Berechtigung',
    alreadyTeamleader: 'Dieser Verkündiger ist bereits Teamleiter',
    openTeam: 'Team öffnen',
    closeTeam: 'Team schließen',
    switch: 'Schicht bearbeiten',
    existingTeamleaders: 'Teamleiter vorhanden',
    noExistingTeamleader: 'Teamleiter fehlt',
    notTeamleader: 'Kein Teamleiter',
    selected: 'Selektiert:',
    of: 'von',
    approveSelected: 'Selektierte annehmen',
    declineSelected: 'Selektierte ablehnen',
    removeSelected: 'Selektierte entfernen',
  },
  route: {
    title: 'Route erstellen/bearbeiten',
    routeMarkers: 'Routen-Marker',
    addRouteMarkers: 'Klicke auf die Karte, um neue Routen-Marker hinzuzufügen'
  },
  uploadUserFile: {
    title: 'User-Datei hochladen',
    helpText: 'Reihenfolge der Daten (* Felder sind erforderlich): <br> E-Mail*, Vorname*, Nachname*, Geschlecht(m oder w)*, Telefon Nr., Dienstvorrecht(\'publisher\', \'auxiliary\', \'regular\', \'special\', \'circuit\', \'bethelite\' oder \'ldc\'), Versammlungsvorrecht(\'publisher\', \'servant\', \'elder\', \'coordinator\', \'secretary\' oder \'serviceOverseer\'), Versammlung, Account Sprache (\'de\', \'en-US\', \'en-GB\', ...), Gesprochene Fremdsprachen (z.B. \'Englisch, Französisch\'), Berechtigungen (siehe VK Export für Beispiele), ID',
    helpID: 'Die Spalte "ID" wird benötigt, um bestehende Verkündiger nach einem Export zu aktualisieren. Ohne eine ID wird ein neuer Verkündiger angelegt.',
    helpEncoding: 'Die Datei muss im UTF-8 Format gespeichert sein damit alle Zeichen korrekt angezeigt werden!',
    uploadFile: 'CSV-Datei hochladen',
    new: 'Auzulegende Verkündiger',
    existing: 'Zu aktualisierende Verkündiger',
    name: 'Name',
    email: 'E-Mail',
    add: 'Verkündiger hinzufügen / aktualisieren'
  },
  mergeAccounts: {
    title: 'Accounts zusammenführen',
    description: 'Gib hier die Anmeldedaten des Accounts ein, auf den du die Berechtigungen des aktuellen Accounts übertragen möchtest. Du wirst direkt mit dem angegebenen Account angemeldet.',
    username: 'Benutzername',
    password: 'Passwort',
    merge: 'Berechtigungen übertragen'
  }
}

export default modal
