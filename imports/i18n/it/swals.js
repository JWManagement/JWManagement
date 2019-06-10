const swal = {
  error: 'Errore',
  publisherInOtherTeam: 'One of the selected publishers is already part of another team. Please remove them from there first.',
  onlyTeam: 'You can\'t delete this team. It is the only team in this shift. Every shift needs to have at least one team.',
  noTeamleader: 'Every team requires a team leader. Unfortunately this publisher does not have permission to serve as a team leader.',
  ownPermission: 'You are not allowed to revoke your own permissions. Another administrator has to do that.',
  approvalInformed: 'This participant has been informed that their request has been approved.',
  declinementInformed: 'This participant has been informed that their request was declined.',
  vacationEndInPast: 'The end date cannot be in the past.',
  missingTag: 'No tag defined. Please first define a tag under Admin > Settings',
  logout: {
    title: 'Hint',
    text: 'It is not necessary to log out unless you are on a shared computer. Your connection is encrypted and we save session information only in your local browser. Nobody else can see or hijack your session.',
    confirm: 'Logout',
    cancel: 'Annulla'
  },
  invite: {
    user: {
      title: 'Invite Publisher?',
      text: 'This publisher <b>already has an account</b>, so no further account has to be created. Instead the publisher will <b>simply be given permission to access this project</b>.<br>Of course <b>we will inform him</b> about this change. <br><p>In case of more than one publisher registered with the same email address, please choose the right one:</p>'
    },
    users: {
      title: 'Sei sicuro?',
      text: 'We will send an email to all selected publishers.',
      confirm: 'Invite',
      cancel: 'Annulla'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Sei sicuro?',
      text: 'All approved publishers will receive a confirmation email and all declined publishers will receive a rejection email.',
      confirm: 'Si',
      cancel: 'Annulla'
    },
    confirmation: {
      title: 'Informa proclamatore?',
      text: 'Il proclamatore sarà informato via email che questo turno è stato approvato.',
      confirm: 'Si',
      cancel: 'Annulla'
    },
    declined: {
      title: 'Informa proclamatore?',
      text: 'Il proclamatore sarà informato via email che la richiesta è stata rifiutata.',
      confirm: 'Si',
      cancel: 'Annulla'
    },
    selectTag: {
      title: 'Which Tag?',
      text: 'Please select the tag you want to send confirmation emails for:',
      confirm: 'OK',
      cancel: 'Annulla'
    },
    teamUpdate: {
      user: {
        title: 'Caposquadra è stato già informato',
        text: 'TIl caposquadra è stato già informato. Vuoi mandargli un aggiornamento via email?',
        confirm: 'Si',
        cancel: 'No'
      },
      general: {
        title: 'Sei sicuro?',
        text: 'Proclamatori già notificati riceveranno un email con le informazioni del team aggiornate.',
        confirm: 'Si',
        cancel: 'No'
      }
    },
    understaffed: {
      title: 'Informa proclamatori?',
      text: 'Informa tutti i proclamatori di questo team a corto di partecipanti?',
      confirm: 'Si',
      cancel: 'No',
      teamleader: {
        title: 'Informs capisquadra?',
        text: 'Informa tutti i capisquadra di questo team?',
        confirm: 'Si',
        cancel: 'No'
      }
    }
  },
  add: {
    meeting: {
      title: 'Aggiungi un nuovo punto d\'incontro',
      text: '',
      placeholder: 'Nome',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    },
    question: {
      title: 'Aggiungi domanda/titolo',
      text: '',
      placeholder: 'Domanda/Titolo',
      inputError: 'Devi inserire un testo!',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    },
    tab: {
      title: 'Aggiungi un nuovo registro',
      text: '',
      placeholder: 'Titolo',
      inputError: 'Nome registro non valido!',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    },
    tag: {
      title: 'Aggiungi tag',
      text: '',
      placeholder: 'Nome',
      inputError: 'Nome tag non valido!',
      confirm: 'Crea',
      cancel: 'Annulla'
    },
    team: {
      title: 'Aggiungi nuovo team',
      text: '',
      placeholder: 'Nome',
      inputError: 'Nome team non valido!',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    },
    template: {
      title: 'Aggiungi schema',
      text: '',
      placeholder: 'Nome',
      inputError: 'Nome schema non valido!',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    },
    user: {
      title: 'Creato!',
      text: 'L\'utente è stato creato.'
    },
    users: {
      title: 'Sei sicuro?',
      text: 'Tutti i proclamatori mostrati saranno agguinti al progetto.',
      confirm: 'Aggiungi',
      cancel: 'Annulla'
    }
  },
  update: {
    file: {
      title: 'Modifica nome file',
      text: '',
      placeholder: 'Nome file',
      inputError: 'Nome file non valido!',
      confirm: 'Modifica',
      cancel: 'Annulla'
    },
    password: {
      title: 'Modifica password',
      passwordOld: 'Vecchia password',
      passwordNew1: 'Nuova password',
      passwordNew2: 'Ripeti nuova password',
      confirm: 'Modifica',
      cancel: 'Annulla',
      passwordChanged: 'Password modificata'
    },
    question: {
      title: 'Modifica domanda',
      text: '',
      placeholder: 'Domanda/Titolo',
      confirm: 'Modifica',
      cancel: 'Annulla'
    },
    template: {
      title: 'Modifica nome',
      text: '',
      placeholder: 'Nome',
      confirm: 'Modifica',
      cancel: 'Annulla'
    }
  },
  delete: {
    account: {
      title: 'Vuoi davvero eliminare il tuo account?',
      text: 'Il tuo account sarà eliminato in modo irreversibile!',
      confirm: 'Elimina il mio Account!',
      cancel: 'Annulla'
    },
    allShifts: {
      title: 'Sei sicuro?',
      text: 'All shifts on this day and all requests for these shifts will irreversibly get deleted.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    file: {
      title: 'Sei sicuro?',
      text: 'Il file sarà eliminato permanentemente.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    language: {
      title: 'Vuoi davvero eliminare questa lingua?',
      text: 'This will delete the language with its stock.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    meeting: {
      title: 'Vuoi davvero eliminare questo punto d\'incontro?',
      text: 'Questo punto d\'incontro sarà eliminato anche da tutti i turni esistenti per il futurio',
      checkInput: 'Elimina',
      placeholder: 'Per favore inserisci "{{0}}" come conferma',
      inputError: 'L\'input non corrispone a "{{0}}"',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    note: {
      title: 'Vuoi davvero eliminare questa nota?',
      text: 'La nota sarà eliminata in maniera irreversibile.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    project: {
      title: 'Vuoi davvero eliminare questo progetto?',
      text: 'This will irreversibly delete all settings associated with this project, e.g. shifts, reports, requests, literature. Only the user accounts will remain.',
      checkInput: 'elimina questo progetto',
      placeholder: 'Per favore inserisci "{{0}}" come conferma',
      inputError: 'L\'input non corrispone a "{{0}}"',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    publication: {
      title: 'Vuoi davvero eliminare questa pubblicazione dal deposito?',
      text: 'You will loose all stored data for this publication.',
      confirm: 'Remove',
      cancel: 'Annulla'
    },
    question: {
      title: 'Sei sicuro?',
      text: 'This will irreversibly delete the question and its answer.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    shift: {
      title: 'Vuoi davvero eliminare questo turno?',
      text: 'Tutte le richieste per questo turno verranno rimosse.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    store: {
      title: 'Vuoi davvero reimpostare il deposito?',
      text: 'This will delete all added publications.',
      confirm: 'Reset',
      cancel: 'Annulla'
    },
    tab: {
      title: 'Sei sicuro?',
      text: 'The whole tab with all the questions will be deleted.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    tag: {
      title: 'Really delete tag?',
      text: 'All shifts belonging to this tag will also be deleted. This includes all requests for these shifts. <br><br> To confirm type in "delete".',
      checkInput: 'Elimina',
      placeholder: 'Per favore inserisci "{{0}}" come conferma',
      inputError: 'L\'input non corrispone a "{{0}}"',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    team: {
      title: 'Vuoi davvero eliminare questo team?',
      text: 'The team will get removed from all existing shifts planned for the future. approved requests for these shifts will be reallocated to other teams. <br><br> To confirm type in "delete".',
      checkInput: 'Elimina',
      placeholder: 'Per favore inserisci "{{0}}" come conferma',
      inputError: 'L\'input non corrispone a "{{0}}"',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    template: {
      title: 'Vuoi davvero eliminare questo schema?',
      text: '',
      confirm: 'Elimina',
      cancel: 'Annulla'
    },
    user: {
      title: 'Vuoi davvero eliminare questo utente?',
      text: 'Ogni permesso al progetto sarà revocato.',
      confirm: 'Elimina',
      cancel: 'Annulla'
    }
  },
  request: {
    approve: {
      title: 'Vuoi davvero approvare questo proclamatore?',
      text: 'Questo proclamatore era stato rimosso in precedenza. Per questo accertati per favore che il proclamatore è ancora in grado e volentoroso di partecipare.',
      confirm: 'Si',
      cancel: 'No'
    },
    cancel: {
      title: 'Sei sicuro?',
      text: 'Questo team sarà eliminato se sei l\'ultimo partecipante.',
      confirm: 'Yes, cancel my participation',
      cancel: 'No'
    },
    decline: {
      title: 'Vuoi davvero rifiutare questo partecipante?',
      text: 'Se il partecipant era già stato notificato, riceverà un email di annullamento.',
      confirm: 'Si',
      cancel: 'No'
    },
    maxReached: {
      title: 'Troppi utenti selezionati',
      text: 'Imposta numero massimo per il team da {{0}} a {{1}} e approva selezionati?',
      confirm: 'Approve selected',
      cancel: 'Annulla'
    },
    minNotReached: {
      title: 'Non abbastanza utenti selezionati',
      text: 'Imposta numero minimo per il team da {{0}} a {{1}} e approva selezionati?',
      confirm: 'Approve selected',
      cancel: 'Annulla'
    },
    minReached: {
      title: 'Vuoi davvero rifiutare questo partecipante?',
      text: 'Il numero minimo per questo team è stato raggiunto. Se rimuovi questo utente, il sistem dovrà rimuovere questo team.',
      confirm: 'Rimuovi team',
      cancel: 'No'
    },
    noNewTeamleader: {
      title: 'Vuoi davvero rifiutare questo partecipante?',
      text: 'Purtroppo non c\'è un altro possibile caposquadra in questo team. Se rimuovi questo utente, il sistem dovrà rimuovere questo team.',
      confirm: 'Rimuovi team',
      cancel: 'No'
    }
  }
}

export default swal
