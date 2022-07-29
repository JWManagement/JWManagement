const authentication = {
  landing: {
    title: 'Welcome to JW Management',
  },
  signIn: {
    name: 'Login',
    text: 'Proszę wprowadź dane logowania',
    forgot: 'Zapomniałeś hasła?',
    create: 'Stwórz konto'
  },
  forgotPassword: {
    name: 'Zapomniałeś hasła?',
    text: 'Wprowadź swój adres email a my wyślemy Ci link potrzebny do zresetowania hasła.',
    button: 'Wyślij link resetujący hasło',
    back: 'Wróć do strony głównej',
    noUserForThisEmail: 'Nie ma konta z takim adresem e-mail',
    multipleAccountsForThisEmail: 'Z tym adresem powiązane jest kilka kont. Proszę sprecyzować użytkownika.',
    emailMissing: 'Brakuje adresu e-mail',
    mailSent: 'Za chwilę otrzymasz e-mail. Otwórz go i kliknij w link aby zresetować Twoje hasło.'
  },
  resetPassword: {
    name: 'Reset hasła',
    text: 'Proszę wprowadź nowe hasło dla {{0}} {{1}}.',
    noUserFound: '<p>Ten link stracił ważność</p><p>Wyślij nową prośbę o zresetowanie hasła.</p>',
    button: 'Zmień hasło',
    back: 'Wróć do strony głównej'
  },
  firstLogin: {
    name: 'Witaj',
    text: '<p>Czekaliśmy na Ciebie.</p><p>Proszę ustaw swoją nazwę użytkownika i hasło. Od teraz będziesz potrzebował ich aby zalogować się do systemu.</p><p>Po tym kroku będziesz mógł zacząć korzystać z JW Management.</p><p>Powodzenia!</p>',
    agreeTerms: 'Zgadzam się z <a href="/en/terms" target="blank">warunkami użytkownia</a> i <a href="/de/privacy" target="blank">polityką prywatności</a>',
    button: 'Zaczynamy!',
    tokenError: 'Ten link jest już nieważny. Poproś o nowy email lub spróbuj zresetować swojego hasło.',
    tokenMissing: 'Niepoprawny link. Upewnij się że skopiowałeś cały link z emaila.',
    usernameExists: 'Ta nazwa użytkownika jest już zajęta. Proszę wybrać inną.',
    usernameMissing: 'Wprowadź nazwę użytkownika.',
    agreeTermsMissing: 'Aby korzystać z systemu musisz wyrazić zgodę z warunkami użytkowania i polityką prywatności.',
    buttonCreateAccount: 'Potrzebuję nowego konta',
    buttonHaveAccount: 'Mam już konto'
  }
}

export default authentication
