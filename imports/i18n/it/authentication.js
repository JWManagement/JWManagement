const authentication = {
  signIn: {
    name: 'Accedi',
    text: 'Per favore inserisci le tue credenziali per accedere al sito',
    forgot: 'Nome utente o password dimenticato?',
    create: 'Crea un account'
  },
  forgotPassword: {
    name: 'Nome utente o password dimenticato',
    text: 'Per favore inserisci il tuo indirizzo email. Ti sarà inviato un link per reimpostare la tua password. Sarà così possibile accedere automaticamente al sito e verficare il tuo nome utente.',
    button: 'Invia link per reimpostare password',
    back: 'Ritorna al Login',
    noUserForThisEmail: 'Non esiste alcun account con questo indirizzo email',
    multipleAccountsForThisEmail: 'Esistono più account con questo indirizzo email. Per favore specifica un utente.',
    emailMissing: 'Manca l\'indirizzo email',
    mailSent: 'Riceverai un email a breve. Segui il link nell\'email per reimpostare la password.'
  },
  resetPassword: {
    name: 'Reimposta password',
    text: 'Per favore inserisci una nuova password per {{0}}.',
    noUserFound: '<p>Questo link non è valido.</p><p>Per favore richiedi un\'altro link per reimpostare la password.</p>',
    button: 'Cambia password',
    back: 'Ritorna al Login'
  },
  firstLogin: {
    name: 'Benvenuto',
    text: '<p>Siamo felici di poterti dare il benvenuto.</p><p>Per favore imposta il tuo nome utente personale e la tua password. Da ora in poi ti serviranno per poterti autentificare nel sistema.</p><p>Dopodiché puoi iniziare ad usare JW Management.</p><p>Enjoy!</p>',
    agreeTerms: 'Confermo i <a href="/en/terms" target="blank">termini d\'uso</a> e <a href="/de/privacy" target="blank">privacy dati</a>',
    button: 'Vai!',
    tokenError: 'Link non più attivo. Non è più valido. Per favore richiedi una nuova email o prova a reimpostare la password.',
    tokenMissing: 'Link non valido. Per favore visita il link contenuto nella email.',
    usernameExists: 'Questo nome utente è già in uso. Per favore scegli un\'altro nome utente.',
    usernameMissing: 'Per favore scegli un nome utente.',
    agreeTermsMissing: 'Per favore conferma i termini d\'uso e privacy dati.',
    buttonCreateAccount: 'Desidero creare un nuovo account',
    buttonHaveAccount: 'Ho già un account'
  }
}

export default authentication
