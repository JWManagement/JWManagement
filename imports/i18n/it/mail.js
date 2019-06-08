const mail = {
  footer: 'Questa è un email automatica. Non è richiesta nessuna risposta.',
  link: 'Apri JW Management',
  accountCreated: {
    subject: 'Account creato su JW Management!',
    headline: 'Benvenuto!',
    hello: 'Ciao',
    text1: 'Desideriamo informarti che è stato creato un account per te su JW Management. Puoi impostare il tuo note utente personale e la tua password cliccando sul pulsante in basso.',
    text2: 'In caso di problemi siamo lieti di poterti aiutare.<br>Ti auguriamo molta gioia nell\'usare JW Management.<br>Tuoi fratelli di JW Management',
    button: 'Si parte!'
  },
  teamCancellation: {
    subject: 'Team annullato',
    headline: 'Team è stato annullato.',
    hello: 'Ciao',
    text: 'Purtroppo dobbiamo informarti che l\'assegnazione per il tuo team per il <b>{{date}}</b> alle ore <b>{{time}}</b> è stata <u>annullata</u>.',
    missingParticipant: 'Manca purtroppo un partecipante. Appena ci sono abbastanza partecipanti, sarà di nuovo possibile partecipare come team.'
  },
  confirmation: {
    subject: 'Nuova Richiesta Approvata',
    headline: 'La tua richiesta è stata approvata!',
    hello: 'Ciao',
    text1: 'La tua richiesta per il seguete turno è stata approvata:',
    datetime: '{{date}} alle ore {{time}}'
  },
  declined: {
    subject: 'Richiesta respinta',
    headline: 'Richiesta è stata respinta',
    hello: 'Ciao',
    text1: 'Purtroppo la tua richiesta per il seguente turno non è stata considerata:',
    text2: 'Grazie per la tua richiesta!',
    datetime: '{{date}} alle ore {{time}}'
  },
  reversal: {
    subject: 'Annullamento',
    hello: 'Ciao',
    text1: 'Sei stato rimosso dal seguente team:',
    datetime: '{{date}} alle ore {{time}}'
  },
  teamUpdate: {
    subject: 'Team modificato',
    _changed: 'è stato modificato.',
    changed: {
      participant: 'Un partecipante',
      time: 'L\'orario',
      location: 'Il luogo',
      leader: 'Il caposquadra'
    },
    hello: 'Ciao',
    text1: 'essendo stato assegnato come membro del team o caposquadra, desideriamo informarti di alcune modifiche nel tuo team.',
    text2: 'Ecco la composizione del team aggiornata'
  },
  understaffed: {
    subject: 'Team a corto di partecipanti',
    headline: 'Team è a corto di partecipanti',
    hello: 'Ciao',
    text1: 'il seguente Team è a corto di partecipanti e neccesita un volontario',
    text2: 'Per favore controlla se ti è possibile nel sostenere questo team.',
    datetime: '{{date}} alle ore {{time}}'
  },
  resetPassword: {
    subject: 'Reimposta Password',
    headline: 'Reimposta la tua Password',
    text1: 'Ciao,<br>Per favora clicca sul seguente pulsante per impostare la tua nuova password:',
    button: 'Reimposta Password',
    text2: '<p>Alcuni utilil suggerimenti su come generare una password sicura si trovano su <a href="https://wol.jw.org/it/wol/d/r6/lp-i/102001451">g01 22 giugno p. 31</a></p><p>Se non sei stato tu a richiedere di reimpostare la password puoi semplicemente eliminare questa email.</p>'
  }
}

export default mail
