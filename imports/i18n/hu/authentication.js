const authentication = {
  landing: {
    title: 'Welcome to JW Management',
  },
  signIn: {
    name: 'Bejelentkezés',
    text: 'Kérjük, add meg fiókadataidat a bejelentkezéshez',
    forgot: 'Elfelejtetted a jelszavad?',
    create: 'Hozz létre egy fiókot'
  },
  forgotPassword: {
    name: 'Elfelejtett jelszó',
    text: 'Add meg e-mail címed, és elküldjük a jelszavad visszaállításához szükséges linket.',
    button: 'Jelszó-visszaállító hivatkozás küldése',
    back: 'Vissza a kezdő oldalra',
    noUserForThisEmail: 'Ennek az e-mail címnek nincs fiókja',
    multipleAccountsForThisEmail: 'Ennek az e-mail címnek több fiókja van. Adj meg egy felhasználót.',
    emailMissing: 'Az email cím hiányzik',
    mailSent: 'Hamarosan kapsz egy emailt. Kattints az e-mailben található linkre a jelszó visszaállításához.'
  },
  resetPassword: {
    name: 'Jelszó visszaállítás',
    text: 'Adj meg új jelszót a {{0}} {{1}}.',
    noUserFound: null,
    button: 'Jelszó módosítása',
    back: 'Vissza a kezdő oldalra'
  },
  firstLogin: {
    name: 'Üdvözlünk',
    text: '<p>Örömmel látjuk hogy itt vagy közöttünk!</p><p>Kérjük állítsd be a felhasználónevedet és jelszavadat. Mostantól ezekre szükszéged lesz hogy azonosítani tudjon téged a rendszerünk.</p><p>Ezt követően elkezdheted a JW Management használatát.</p><p>Leld benne örömöd!</p>',
    agreeTerms: 'Egyetértek a <a href="/en/terms" target="blank">Használati feltételek</a> és a  <a href="/de/privacy" target="blank">Adatvédelmi irányelvek</a>',
    button: 'Kezdjünk neki!',
    tokenError: null,
    tokenMissing: 'Érvénytelen link. Kérünk, látogass el az e-mail címedre kapott linkre.',
    usernameExists: 'This username is already in use. Please choose another one.',
    usernameMissing: 'Adj meg egy felhasználónevet!',
    agreeTermsMissing: 'Kérünk, fogadd el a használati feltételeket és az adatvédelmi irányelvet.'
  }
}

export default authentication
