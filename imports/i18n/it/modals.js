const modal = {
  close: 'Chiudi',
  addParticipant: {
    title: 'Aggiungi partecipante',
    description: 'Per favore seleziona il proclamatore da aggiungere a questo turno.'
  },
  addVessel: {
    title: 'Aggiungi una nave',
    action: 'Aggiungi nave'
  },
  addWeek: {
    title: 'Crea nuova settimana',
    noTemplate: 'Per favore definisci prima uno schema',
    defineTemplate: 'Definisci schema',
    action: 'Crea settimana',
    text: {
      top: 'Seleziona una settimana a cui applicare lo schema per la settimana:',
      bottom: 'Seleziona lo schema per la settimana:'
    }
  },
  cancelTeam: {
    title: 'Annulla team',
    text: 'Descrivi perché questo team deve essere annullato. Tutti i partecipanti saranno informati di questo messagio via email di annullamento.',
    action: 'Annulla team'
  },
  copyShift: {
    title: 'Copia turno',
    text: 'Seleziona solo i giorni a cui vuoi copiare questo turno.',
    action: 'Copia turno'
  },
  editShift: {
    title: 'Modifica informazioni turno',
    mainData: 'Dettagli generali',
    tag: 'Tag',
    team: 'Team',
    teams: 'Team assegnati a questo turno',
    helpText: {
      tag: 'Seleziona il tag per questo turno. Tutti gli utenti autorizzati per questo tag possono visualizzare questo turno.',
      scheduling: 'Con \'approva immediatamente\' le richieste verranno approcate automaticamente appena sarà raggiunto il numero minimo di partecipanti per il prossimo team.'
    },
    addTeam: 'Aggiungi un nuovo team',
    teamMin: 'Minimo partecipanti:',
    teamMax: 'Massimo partecipanti:',
    teamStart: 'Inizio:',
    teamEnd: 'Fine:',
    teamPlace: 'Luogo:',
    removeTeam: 'Rimuovi questo team',
    noMeeting: 'Nessun punto d\'incontro',
    action: 'Azione:',
    delete: 'Elimina',
    switch: 'Assegna turni',
    copyShift: 'Copia turni'
  },
  editTeamPicture: {
    title: 'Cambia immagine team',
    currentPicture: 'Immagine attuale:',
    hints: 'Questa immagine probabilmente sarà mostrata più grande per il proclamatore.',
    noPictureUploaded: 'Non hai ancora caricato alcuna immagine',
    upload: 'Upload',
    delete: 'Elimina'
  },
  editMeetingPicture: {
    title: 'Cambia immagine per punto d\'incontro',
    currentPicture: 'CImmagine attuale:',
    hints: 'Questa immagine probabilmente sarà mostrata più grande per il proclamatore.',
    noPictureUploaded: 'Non hai ancora caricato alcuna immagine',
    upload: 'Upload',
    delete: 'Elimina'
  },
  editVessel: {
    title: 'Modifica dati nave',
    action: 'Salva le modifiche'
  },
  inviteUser: {
    title: 'Invita nuovo proclamatore',
    key: 'Il <span class="text-warning">nome in arancione</span> significa che l\'utente è già stato invitato.',
    selectAll: 'Seleziona tutti',
    noUsers: 'Nessun nuovo proclamatore trovato',
    invite: 'Invita'
  },
  position: {
    title: 'Contrassegna la posizione con il pulsante sinistro del mouse'
  },
  shift: {
    clickToEnlarge: 'Clicca sull\'immagine per ingrandirla',
    openLink: 'Mostra informazioni collegate',
    meetingAt: 'Punto d\'incontro alle ',
    collapseTeam: 'Nascondi informazioni sul team e punti d\'incontro',
    expandTeam: 'Mostra informazioni sul team e punti d\'incontro',
    noParticipants: 'Nessun partecipante',
    requestTeam: 'Richiedi partecipazione',
    requestTeamAgain: 'Richiedi nuovamente partecipazione',
    requests: 'Richieste',
    cancelTeam: 'Annulla team',
    cancelRequest: 'Annulla richiesta',
    cancelParticipation: 'Annulla partecipazione',
    addParticipant: 'Aggiungi partecipante',
    closedTeam: 'Questo team è completo. Non puoi richiedere partecipazione.',
    maximumReached: 'È stato raggiunto il limite massimo di partecipanti per il team',
    noPermission: 'Non sei autorizzato per assegnare utenti',
    noTeamleader: 'Questo utente non è autorizzato come caposquadra',
    alreadyTeamleader: 'Questo utente è già caposquadra',
    openTeam: 'Apri team',
    closeTeam: 'Chiudi team',
    sendUnderstaffed: 'Invia email a corto di partecipanti',
    switch: 'Modifica turno',
    existingTeamleaders: 'Caposquadra esistente',
    noExistingTeamleader: 'Caposquadra mancante',
    notTeamleader: 'Nessun caposquadra',
    selected: 'Selezionato:',
    of: 'di',
    approveSelected: 'Approva selezionati',
    declineSelected: 'Respingi selezionati',
    report: 'Rapporto'
  },
  shiftReport: {
    title: 'Rapporto',
    teamleader: 'Caposquadra',
    substituteTeamleader: 'Sostituto caposquadra',
    publications: 'Pubblicazioni',
    occurrences: 'Occorrenze',
    store: 'Deposito',
    experiences: 'Esperienze',
    present: 'Presente',
    sick: 'Malato',
    missing: 'Mancante',
    name: 'Nome',
    language: 'Lingua',
    count: 'Conta',
    action: 'Azione',
    noPublications: 'Nessuna pubblicazione qui',
    select_publication: 'Seleziona pubblicazione',
    selectPublicationFirst: 'Per favore seleziona prima una pubblicazione',
    addItem: 'Aggiungi questa pubblicazione',
    removeItem: 'Rimuovi questa pubblicazione',
    texts: 'Brani biblici',
    speaks: 'Conversazioni',
    videos: 'Video mostrato',
    website: 'Sito mostrato',
    returnVisits: 'Visite ulteriori',
    bibleStudies: 'Studi biblici',
    time: 'Ore di servizio',
    trolleysFilled: 'Trolley bene assortiti',
    neatnessLast: 'Condizione Trolley dopo turno precedente',
    bad: 'Malandato',
    normal: 'Normale',
    good: 'Buono',
    yes: 'Si',
    no: 'No',
    expRoute: 'Percorso',
    expGood: 'Belle esperienze',
    expProblems: 'Problemi / Difficoltà',
    date: 'Data',
    toShift: 'Per il turno',
    pages: {
      publisher: 'Pagina proclamatore',
      items: 'Pubblicazioni lasciate',
      occurrences: 'Cosa è stato raggiunto',
      store: 'Info deposito',
      experiences: 'Esperienze',
      prevPage: 'Vai alla pagina precedente',
      nextPage: 'Vai alla pagina successiva',
      finish: 'Consegna rapporto'
    }
  },
  route: {
    title: 'Crea/modifica percorso',
    routeMarkers: 'Contrassegna percorso',
    addRouteMarkers: 'Clicca sulla mappa per contrassegnare un nuovo percorso'
  },
  uploadUserFile: {
    title: 'Upload file utenti',
    helpEncoding: 'Il file deve essere codificato in UTF-8 per supportare ogni carattere',
    uploadFile: 'Upload file CSV',
    new: 'Nuovi proclamatori',
    existing: 'Proclamatori con account JW Management',
    name: 'Nome',
    email: 'Email',
  },
  mergeAccounts: {
    title: 'Unisci account',
    description: 'Inserisci le credenziali dell\'account nel quale unire i diritti di questo account. Otterai subito accesso al tuo account.',
    username: 'Nome utente',
    password: 'Password',
    merge: 'Unisci account'
  }
}

export default modal
