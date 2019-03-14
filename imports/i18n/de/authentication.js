const authentication = {
  signIn: {
    name: 'Anmelden',
    text: 'Bitte gib deine Daten ein um dich anzumelden',
    forgot: 'Benutzernamen oder Passwort vergessen',
    create: 'Account erstellen'
  },
  signUp: {
    name: 'Account erstellen',
    text: '<p>Du möchtest das System gerne testen und deine eigenes Projekt managen?<p></p>Dann füll einfach das Formular aus um einen Account anzulegen.</p>',
    bySigningYouAgreeTo: 'Mit der Erstellung eines Accounts bestätigst du unsere',
    terms: 'Bedingungen',
    andOur: 'und die',
    privacyPolicy: 'Datenschutzerklärung',
    signIn: 'Ich habe bereits einen Account'
  },
  forgotPassword: {
    name: 'Benutzername oder Passwort vergessen',
    text: 'Bitte gib deine E-Mail Adresse ein, dann schicken wir dir einen Link um dein Passwort zurückzusetzen. Dadurch wirst du eingeloggt und kannst auch deinen Benutzernamen nachschauen.',
    button: 'Sende Link zum Zurücksetzen',
    back: 'Zurück zur Anmeldung',
    noUserForThisEmail: 'Es konnte kein Benutzer mit dieser E-Mail Adresse gefunden werden',
    multipleAccountsForThisEmail: 'Es existieren mehrere Benutzer mit dieser E-Mail Adresse. Bitte wähle einen aus.',
    emailMissing: 'Please enter your email address',
    mailSent: 'Du solltest nun eine E-Mail bekommen haben. Diese beinhaltet einen Link, mit dem du dein Passwort zurücksetzen kannst.'
  },
  resetPassword: {
    name: 'Passwort zurücksetzen',
    text: 'Neues Passwort für {{0}} eingeben.',
    noUserFound: '<p>Dieser Link ist ungültig.</p><p>Bitte lass dir einen neuen Link zuschicken.</p>',
    button: 'Passwort ändern',
    back: 'Zurück zur Anmeldung'
  },
  firstLogin: {
    name: 'Herzlich Willkommen',
    text: '<p>Wir freuen uns dich bei JW Management begrüßen zu dürfen.</p><p>Bitte setze für dein Profil einen Benutzernamen und ein Passwort. Mit diesen Daten wirst du dich in Zukunft am System anmelden.</p><p>Danach kann es los gehen.</p><p>Wir wünschen dir viel Freude!</p>',
    agreeTerms: 'Ich akzeptiere die <a href="/de/terms" target="blank">Nutzungsbedingungen</a> und die <a href="/de/privacy" target="blank">Datenschutzerklärung</a>',
    button: 'Los geht\'s!',
    tokenError: 'Abgelaufener Link. Dieser Link ist nicht mehr gültig. Bitte lass dir eine neue E-Mail schicken oder versuche, dein Passwort zurückzusetzen.',
    tokenMissing: 'Ungültiger Link. Bitte verwende den Link aus der E-Mail.',
    plainTextToken: 'Scheint, als unterstützt dein Mail Programm kein HTML. Bitte öffne den Link noch einmal aus einem modernen Mail Programm heraus.',
    usernameExists: 'Der Benutzername wird bereits verwendet. Bitte wähle einen anderen.',
    usernameMissing: 'Bitte gib einen Benutzernamen an.',
    agreeTermsMissing: 'Bitte akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung.',
    usernameCannotBeEmail: 'Sorry, der Benutzername darf keine E-Mail Adresse sein. Bitte versuche es mit einem anderen Benutzernamen.',
    buttonCreateAccount: 'Ich möchte einen neuen Account erstellen',
    buttonHaveAccount: 'Ich habe bereits einen Account'
  }
}

export default authentication
