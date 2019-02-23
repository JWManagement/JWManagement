const mail = {
  footer: 'To jest automatycznie wysłany mail. Nie oczekujemy, że na niego odpowiesz.',
  link: 'Otwórz JW Management',
  accountCreated: {
    subject: 'Konto JW Management zostało stworzone!',
    headline: 'Witaj!',
    hello: 'Witaj',
    text1: 'Chcemy powiedzieć Ci, że stworzyliśmy dla Ciebie konto JW Management. Możesz ustawić swoją nazwę użytkownika i hasło klikając w przycisk poniżej.',
    text2: 'W przypadków problemów śmiało pisz do nas.<br>Życzymy Ci dużo radości w korzystaniu z JW Management.<br>Twoi bracia z JW Management',
    button: 'Zaczynamy!'
  },
  teamCancellation: {
    subject: 'Zmiana anulowana',
    headline: 'Zmiana została anulowana.',
    hello: 'Witaj',
    text: 'Niestety, chcieliśmy poinformować Cię, że twoja zmiana <b>{{date}}</b> o godzinie <b>{{time}}</b> została <u>anulowana</u>.',
    missingParticipant: 'Aktualnie brakuje współpracownika. Jeżeli będzie wystarczająco współpracowników zmiana może powstać ponownie.'
  },
  confirmation: {
    subject: 'Zgłoszenie zaakceptowane',
    headline: 'Twoje zgłoszenie zostało zaakceptowane!',
    hello: 'Witaj',
    text1: 'Twoje zgłoszenie dla następujących zmian zostało zaakceptowane:',
    datetime: '{{date}} o godzinie {{time}}'
  },
  declined: {
    subject: 'Zgłoszenie odrzucone',
    headline: 'Twoje zgłoszenie nie zostało rozpatrzone pozytywnie',
    hello: 'Witaj',
    text1: 'Niestety, Twoje zgłoszenie dotyczące następujących zmian nie zostało zaakceptowane:',
    text2: 'Dziękujemy za Twoje zgłoszenie!',
    datetime: '{{date}} o godzinie {{time}}'
  },
  reversal: {
    subject: 'Usunięcie',
    hello: 'Witaj',
    text1: 'Zostałeś usunięty z następującej zmiany:',
    datetime: '{{date}} o godzinie {{time}}'
  },
  teamUpdate: {
    subject: 'Zmiana została zmieniona',
    _changed: 'zmieniona.',
    changed: {
      participant: 'Współpracownik',
      time: 'Czas',
      location: 'Miejsce',
      leader: 'Koordynator zmiany'
    },
    hello: 'Witaj',
    text1: 'Zostałeś oznaczony jako koordynator zmiany.',
    text2: 'Tutaj jest aktualny skład zmiany',
    datetime: '{{date}} o godzinie {{time}}'
  },
  understaffed: {
    subject: 'Zmiana nie została skompletowana',
    headline: 'Zmiana nie została skompletowana',
    hello: 'Witaj',
    text1: 'Następująca zmiana nie została zebrana i potrzebuje',
    text2: 'Proszę zobacz czy możesz jakoś pomóc tej zmianie.',
    datetime: '{{date}} o godzinie {{time}}'
  },
  resetPassword: {
    subject: 'Zresetuj hasło',
    headline: 'Zresetuj swoje hasło',
    text1: 'Witaj,<br>Proszę kliknij w przycisk poniżej aby ustawić nowe hasło:',
    button: 'Resetuj hasło',
    text2: '<p>Użyteczne podpowiedzi dotyczące bezpiecznego hasło można znaleźć na <a href="https://wol.jw.org/pl/wol/d/r12/lp-p/102001451">g01 6/22 s. 31</a></p><p>Jeżeli to nie ty prosiłeś o zresetowanie hasła, śmiało możesz usunąć tą wiadomość.</p>'
  }
}

export default mail
