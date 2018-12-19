const mail = {
  footer: 'Dies ist eine automatisierte Mail. Wir erwarten keine Antwort darauf.',
  link: 'JW Management öffnen',
  accountCreated: {
    subject: 'JW Management Konto erstellt!',
    headline: 'Herzlich Willkommen!',
    hello: 'Hallo',
    text1: 'wir möchten dir mitteilen, dass wir für dich in JW Management ein Konto angelegt haben. Um dich anzumelden musst du einen Benutzernamen und ein Passwort hinterlegen. Klicke dazu einfach auf den Button unten.',
    text2: 'Bei Problemen kannst du dich gerne an uns wenden.<br>Wir wünschen dir viel Freude mit JW Management.<br>Deine Brüder von JW Management',
    button: 'Los geht\'s!'
  },
  teamCancellation: {
    subject: 'Team wurde abgesagt',
    headline: 'Team musste leider abgesagt werden.',
    hello: 'Hallo',
    text: 'leider müssen wir dir mitteilen, dass dein Teameinsatz am <b>{{date}}</b> um <b>{{time}}</b> Uhr <u>abgesagt</u> wurde.',
    missingParticipant: 'Ein Teilnehmer fehlt leider. Sobald wieder genug Teilnehmer vorhanden sind, kann das Team wieder stattfinden.'
  },
  confirmation: {
    subject: 'Neue Schichtzuteilung',
    headline: 'Du wurdest zugeteilt!',
    hello: 'Hallo',
    text1: 'du wurdest folgender Schicht zugeteilt:',
    datetime: '{{date}} von {{time}} Uhr'
  },
  declined: {
    subject: 'Bewerbung nicht berücksichtigt',
    headline: 'Bewerbung leider nicht berücksichtigt',
    hello: 'Hallo',
    text1: 'deine Bewerbung auf folgende Schicht konnte leider nicht berücksichtigt werden:',
    text2: 'Vielen Dank für deine Bewerbung!',
    datetime: '{{date}} von {{time}} Uhr'
  },
  reversal: {
    subject: 'Austragung',
    hello: 'Hallo',
    text1: 'du wurdest aus folgender Schicht ausgetragen:',
    datetime: '{{date}} von {{time}} Uhr'
  },
  teamUpdate: {
    subject: 'Team geändert',
    _changed: 'hat sich geändert.',
    changed: {
      participant: 'Ein Teilnehmer',
      time: 'Die Uhrzeit',
      location: 'Der Ort',
      leader: 'Der Teamleiter'
    },
    hello: 'Hallo',
    text1: 'da du als Teammitglied oder Teamleiter eingetragen bist, möchten wir dich über Änderungen deines Teams informieren.',
    text2: 'Im Folgenden findest du die aktuellen Daten des Teams:',
    datetime: '{{date}} von {{time}} Uhr'
  },
  understaffed: {
    subject: 'Team unterbelegt',
    headline: 'Team ist unterbelegt',
    hello: 'Hallo',
    text1: 'das folgende Team ist unterbelegt und benötigt noch einen',
    text2: 'Schau doch bitte nach, ob es dir möglich wäre, einzuspringen.',
    datetime: '{{date}} von {{time}} Uhr'
  },
  resetPassword: {
    subject: 'Passwort zurücksetzen',
    headline: 'Passwort zurücksetzen',
    text1: 'Hallo,<br>Bitte klicke auf den folgenden Button, um ein neues Passwort zu vergeben:',
    button: 'Passwort zurücksetzen',
    text2: '<p>Tipps für sichere Passwörter findest du im g01 22. 6. S.31</p><p>Wenn du das Zurücksetzen deines Passwortes nicht angefordert hast, lösche diese E-Mail bitte.</p>'
  }
}

export default mail
