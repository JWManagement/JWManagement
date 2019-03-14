const authentication = {
  signIn: {
    name: 'Kirjaudu',
    text: 'Anna käyttäjätiedot kirjautuaksesi sisään',
    forgot: 'Salasana unohtunut?',
    create: 'Luo uusi tili'
  },
  forgotPassword: {
    name: 'Salasana unohtunut',
    text: 'Anna sähköpostiosoitteesi, niin lähetämme sinulle linkin, jonka avulla voit vaihtaa salasanasi.',
    button: 'Lähetä salasanan palautuslinkki',
    back: 'Takaisin aloitussivulle',
    noUserForThisEmail: 'Tällä sähköpostiosoitteella ei ole luotu käyttäjätiliä',
    multipleAccountsForThisEmail: 'Tällä sähköpostiosoitteella on luotu useita käyttäjätilejä. Anna myös käyttäjätunnus.',
    emailMissing: 'Sähköpostiosoite puuttuu',
    mailSent: 'Saat pian sähköpostia. Klikkaa siinä olevaa linkkiä palauttaaksesi salasanasi.'
  },
  resetPassword: {
    name: 'Palauta salasana',
    text: 'Anna uusi salasana käyttäjälle {{0}} {{1}}.',
    noUserFound: '<p>Tämä linkki on vanhentunut</p><p>Pyydä uusi linkki sähköpostiisi.</p>',
    button: 'Vaihda salasana',
    back: 'Takaisin aloitussivulle'
  },
  firstLogin: {
    name: 'Tervetuloa',
    text: '<p>Tervetuloa JW Management\'in käyttäjäksi!</p><p>Ole hyvä ja valitse itsellesi käyttäjätunnus ja salasana. Tulet tästä lähtien tarvitsemaan näitä tunnuksia tähän järjestelmään kirjautumiseksi.</p><p>Sen jälkeen voit aloittaa JW Management\'in käyttämisen.</p><p>Nauti!</p>',
    agreeTerms: 'Hyväksyn <a href="/en/terms" target="blank">käyttöehdot</a> ja <a href="/de/privacy" target="blank">yksityisyyskäytännön</a>',
    button: 'Eteenpäin!',
    tokenError: 'Vanhentunut linkki. Tämä ei ole enää voimassa. Pyydä uutta sähköpostilla tai yritä palauttaa salasanasi.',
    tokenMissing: 'Viallinen linkki. Ole hyvä ja käytä linkkiä, jonka sait sähköpostissa.',
    usernameExists: 'Käyttäjänimi on jo olemassa. Valitse jokin toinen käyttäjänimi.',
    usernameMissing: 'Anna käyttäjänimi.',
    agreeTermsMissing: 'Ole hyvä ja hyväksy käyttöehdot ja yksityisyyskäytäntö.',
    buttonCreateAccount: 'Minulla ei ole vielä käyttäjätiliä',
    buttonHaveAccount: 'Minulla on jo käyttäjätili'
  }
}

export default authentication
