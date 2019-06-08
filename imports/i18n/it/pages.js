const pages = {
  profile: {
    name: 'Profilo personale',
    personalData: 'Dati personali',
    changePicture: 'Modifica immagine...',
    options: {
      title: 'Impostazioni',
      helpText: {
        mergeAccounts: 'In JW Management you can do everything with just one single account. You just have to remember one username and password. If you have multiple accounts click on "Merge accounts" and enter the credentials for your other account. This will merge this account\'s permissions into the ones of the specified account.'
      }
    },
    availability: {
      title: 'Disponibilità',
      helpText: 'Per favore seleziona le ore in cui sei disponibile.',
      shortTermCalls: 'Posso essere contattato a breve',
      shortTermCallsAlways: 'Anche se non ho impostato la mia disponibilità'
    },
    speaks: 'Conversazioni',
    telefon: 'Telefono',
    congregation: 'Congregazione',
    language: 'Lingua account',
    languages: 'Lingue parlate',
    gender: 'Genere',
    _gender: {
      brother: 'Fratello',
      sister: 'Sorella'
    },
    publisher: 'Proclamatore',
    privilegeOfService: 'Privilegio di servizio',
    _privilegeOfService: {
      auxiliaryPioneer: 'Pioniere ausiliare',
      pioneer: 'Pioniere regolare',
      specialPioneer: 'Pioniere speciale',
      circuitOverseer: 'Sorvegliante di circoscrizione',
      bethelite: 'Betelita',
      fulltimeConstructionServant: 'LDC'
    },
    ministryPrivilege: 'Privilegio di congregazione',
    _ministryPrivilege: {
      ministerialServant: 'Servitore di ministero',
      elder: 'Anziano',
      coordinator: 'Coordinatore del corpo degli anziani',
      secretary: 'Segretario',
      serviceOverseer: 'Sorvegliante del servizio'
    },
    placeholder: {
      telefon: '(e.g. +447712345678)',
      congregation: 'Congregazione',
      languages: 'Lingue'
    },
    changePassword: 'Cambia password',
    deleteAccount: 'Elimina account',
    mergeAccounts: 'Unisci accounts',
    vacation: {
      title: 'Vacanze',
      helpText: 'Per favore aggiungi i periodi in cui non sei disponibile.'
    },
    until: 'al',
    addVacation: 'Aggiungi vacanze',
    deleteVacation: 'Elimina questa vacanza',
    usernameTaken: 'Questo nome utente è già in uso da qualcun\'altro. Per favore scegli un\'altro nome utente.'
  },
  wiki: {
    name: 'Centro informazioni',
    nameShort: 'Info',
    files: 'File',
    addQuestion: 'Aggiungi domanda/titolo',
    edit: 'Modifica',
    delete: 'Elimina',
    noFiles: 'Nessun file disponibile',
    addTab: 'Aggiungi un registro',
    editQuestion: 'Modifica questa domanda',
    removeFaq: 'Elimina questa domanda',
    editFaq: 'Modifica questa risposta',
    changeFaq: 'Salva questa risposta',
    cancelFaq: 'Annulla le modifiche'
  },
  shifts: {
    name: 'Turni',
    route: 'Percorsi',
    addShift: 'Aggiungi un nuovo turno',
    addWeek: 'Aggiungi una nuova settimana',
    requests: 'Richieste',
    openRequests: 'Richieste in attesa',
    automation: 'Automatico',
    template: 'Schema',
    noVisibleShifts: 'Nessun turno con questa tag questa settimana',
    start: 'Inizio',
    end: 'Fine',
    visibility: 'Visibilità:',
    helpText: {
      start: 'Questa è la prima settimana ad essere creata dal sistema.',
      end: 'Questa è l\'ultima settimana ad essere creata dal sistema.',
      visibility: 'Definisce con quante settimane in anticipo i proclamatori possono vedere e fare richiesta. Considerando la settimana di inizio e fine, il sistema creerà in automatico i turni neccessari.'
    },
    weeks: 'settimane',
    hideNames: 'Nascondi tutti i nomi del turno',
    showNames: 'Mostra tutti i nomi del turno',
    editShifts: 'Modifica i turni',
    prevWeek: 'Vai alla settimana precedente',
    nextWeek: 'Vai alla prossima settimana',
    sendWeek: 'Invia per email le conferme per tutti i turni di questa settimana',
    shownTag: 'Turni con questo tag venogono mostrati',
    hiddenTag: 'Turni con questo tag venogono nascosti',
    shift: {
      tag: 'Tag',
      schedule: 'Pianificia turni',
      teamleader: 'Caposquadra',
      teams: 'Team',
      noTeams: 'Nessun Team',
      participants: 'Pertecipanti',
      start: 'Inizio',
      end: 'Fine',
      requests: 'Richiesta',
      requests_plural: 'Richieste',
      requestsOf: 'Richiesta di',
      requestsOf_plural: 'Richieste di',
      teamleaders: 'CS',
      noPermission: 'Solo l\'amministratore del progetto o chi assegna i turni ha il permesso di modificare o pianificare un turno.'
    }
  },
  day: {
    removeAll: 'Rimuovi tutti'
  },
  reports: {
    export: 'Esporta come CSV'
  },
  settings: {
    main: {
      title: 'Impostazioni',
      id: 'ID',
      name: {
        text: 'Nome',
        placeholder: 'Nome progetto',
        helpText: 'In many cases the project name is the name of the congregation. For bigger projects including multiple congregations it can be the name of the city where the project will be carried out. If the project does not organize cart witnessing, the name can also reflect what will be organized with this project.'
      },
      news: {
        text: 'Ultime notizie',
        placeholder: 'Nessune ultime notizie',
        helpText: 'The news will show up on the top of Project to communicate with your participants.'
      },
      email: {
        text: 'Email',
        placeholder: 'Indirizzo email progetto',
        helpText: 'In emails like shift confirmations and team leader updates, this address will be set as the Reply-To address, so that if the recipients answer these emails, the reply will normally be sent to the inbox of this address if the recipient\'s email program is behaving correctly. Furthermore, this address will be notified e.g. on short-term participation cancellations.'
      },
      language: {
        text: 'Lingua',
        helpText: 'If the system notifies the above listed address about changes, it will send the mails in the language you specify here.'
      },
      deleteProject: 'Delete project'
    },
    tags: {
      title: 'Tags',
      helpText: '<p>Every shift has to be assigned a tag. Furthermore every user can be permitted or denied permission to be able to see shifts depending on the tags.</p><p>Tags can reflect different activities (e.g. Cart witnessing, Information stand, Street work, etc.). The dividing of shifts into different tags can be useful, for example if there are multiple shifts at the same time or if only certain publishers are trained in a specific type of public witnessing.</p><p>With every tag there can be a set of template weeks which have been defined previously. By using the automatic option when scheduling, the program can use these template weeks. This saves the project manager or shift manager time when scheduling.</p>',
      id: 'ID',
      name: 'Nome',
      img: {
        name: 'Immagine',
        helpText: 'This image will be shown on the dashboard when clicking on \'Shifts\'. It should explain the kind of tasks done in shifts of this tag. If you want to add a custom image, please send us an email to support@jwmanagement.org describing your idea.'
      },
      templates: 'Schemi',
      showTemplate: 'Modifica turni',
      editTemplate: 'Modifica nome',
      removeTemplate: 'Elimina',
      addTemplate: 'Elimina nuovo schema',
      action: 'Azione',
      none: 'Nessun tag è stato ancora aggiunto',
      add: 'Aggiungi un nuovo tag',
      remove: 'Elimina questo tag'
    },
    teams: {
      title: 'Team',
      helpText: {
        main: 'For every shift there has to be at least one team. Every team is assigned to a route or location. One participant of the shift is always member of one of these teams.',
        picture: 'Publishers will be able to see this picture. Therefore, it should give further information for the tasks in this team. For example you could create a route for this team on Google Maps or OpenStreetMap (depending on which has better coverage of your area) and upload a picture of that here.',
        link: 'This link will be connected with the picture. If the user clicks on the picture he will be forwarded to the address of this link. For example you could provide the link of the Google Maps or OpenStreetMap map here.',
        description: 'Here you can optionally set up a description for this team. For example you could explain some particularities of this team or route.'
      },
      id: 'ID',
      name: 'Nome',
      icon: 'Icona',
      picture: 'Immagine',
      editPicture: 'Upload a picture for this team',
      noPicture: 'No picture uploaded',
      link: 'Link',
      description: 'Descrizione',
      action: 'Azione',
      none: 'Nessun team è stato ancora aggiunto',
      add: 'Aggiungi un nuovo team',
      remove: 'Elimina questi team'
    },
    meetings: {
      title: 'Punto d\'incontro',
      helpText: {
        main: 'For all the shift teams there can be a meeting point assigned to them. With that, teams can meet independently from each other. This can be useful, as when the route or location of the teams are so far apart that a common meeting would be too time consuming. Meeting points are defined with coordinates.',
        picture: 'Publishers will be able to see this picture. Therefore, it should give further information for the meeting point. For example you could upload a picture with the environment from Google Maps or OpenStreetMap (whichever one has better coverage of your area) here.'
      },
      id: 'ID',
      name: 'Nome',
      picture: 'Immagine',
      editPicture: 'Upload a picture for this meeting point',
      noPicture: 'No picture uploaded',
      action: 'Azione',
      none: 'Nessun punto d\'incontro è stato ancora aggiunto',
      add: 'Aggiungi un nuovo punto d\'incontro',
      remove: 'Elimina punto d\'incontro'
    }
  }
}

export default pages
