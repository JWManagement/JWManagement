const mail = {
  footer: 'Tämä on automaattinen viesti. Älä vastaa viestiin.',
  link: 'Avaa JW Management',
  accountCreated: {
    subject: 'JW Management käyttäjätili on luotu!',
    headline: 'Tervetuloa!',
    hello: 'Hei!',
    text1: 'Olemme luoneet sinulle käyttäjätilin JW Management sovellukseen. Voit asettaa itsellesi käyttäjänimen ja salasanan klikkaamalla alla olevaa painiketta.',
    text2: 'Jos sinulla on ongelmia käytössä, voit ottaa meihin yhteyttä.<br>Toivomme, että saat paljon iloa JW Management sovelluksen käyttämiestä.<br>Veljesi JW Management tiimistä.',
    button: 'Lähdetään liikkeelle!'
  },
  teamCancellation: {
    subject: 'Tiimi peruutettu',
    headline: 'Tiimi on peruutettu.',
    hello: 'Hei!',
    text: 'Valitettavasti tiimisi vuoro <b>{{date}}</b> klo <b>{{time}}</b> on <u>peruutettu</u>.',
    missingParticipant: 'Osallistuja puuttuu. Jos osallistujia tulee riittävästi, tiimi voi ottaa vuoron uudestaan.'
  },
  confirmation: {
    subject: 'Uusi ilmoittautuminen hyväksytty',
    headline: 'Ilmoittautumisesi on hyväksytty!',
    hello: 'Hei!',
    text1: 'Ilmoittautumisesi seuraavaan vuoroon on hyväksytty:',
    datetime: '{{date}} alkaen klo {{time}}'
  },
  declined: {
    subject: 'Ilmoittautumista ei käsitelty',
    headline: 'Ilmoittautumista ei käsitelty',
    hello: 'Hei!',
    text1: 'Valitettavasti ilmoittautumistasi seuraavaan vuoroon ei voitu käsitellä:',
    text2: 'Kiitos ilmoittautumisestasi!',
    datetime: '{{date}} alkaen klo {{time}}'
  },
  reversal: {
    subject: 'Poistaminen',
    hello: 'Hei!',
    text1: 'Sinut poistettiin seuraavasta tiimistä:',
    datetime: '{{date}} alkaen klo {{time}}'
  },
  teamUpdate: {
    subject: 'Tiimi vaihdettu',
    _changed: 'vaihdettu.',
    changed: {
      participant: 'Osallistuja',
      time: 'Aika',
      location: 'Sijainti',
      leader: 'Tiiminvetäjä'
    },
    hello: 'Hei,',
    text1: 'Sinut on merkitty tiimin jäseneksi tai -vetäjäksi, joten tässä saat joitakin tietoja muutoksista timmissäsi.',
    text2: 'Nykyinen tiimikokoonpano',
    datetime: '{{date}} alkaen klo {{time}}'
  },
  understaffed: {
    subject: 'Vajaa tiimi',
    headline: 'Tiimissä on liian vähän jäseniä',
    hello: 'Hei,',
    text1: 'seuraavassa tiimissä on liian vähän jäseniä ja tarvitsee',
    text2: 'Ole hyvä ja tarkista, voisitko auttaa tätä tiimiä.',
    datetime: '{{date}} alkaen klo {{time}}'
  },
  resetPassword: {
    subject: 'Palauta salasana',
    headline: 'Palauta salasanasi',
    text1: 'Hei,<br>Klikkaa seuraavaa painiketta asettaaksesi uuden salasanan:',
    button: 'Palauta salasana',
    text2: '<p>Käytännöllisiä vinkkejä turvallisen salasanan luomiseksi voit löytää täältä: <a href="http://wol.jw.org/en/wol/d/r1/lp-e/102001451">g01 6/22 p. 31</a></p><p>If you didn\'t request a password reset, feel free to delete this email.</p>'
  }
}

export default mail
