const swal = {
  error: 'Błąd',
  publisherInOtherTeam: 'Jeden z zaznaczonych głosicieli jest już członkiem innej zmiany. Proszę usuń go najpierw z tamtej zmiany.',
  onlyTeam: 'Nie możesz usunąć tej lokalizacii. To jest jedyna lokalizacja dla tej zmiany. Każda zmiana musi mieć przypisany przynajmniej jedną lokalizację.',
  noTeamleader: 'Każda zmiana musi posiadać koordynatora zmiany. Niestety ten głosiciel nie ma uprawnień do występowania w tej roli.',
  ownPermission: 'Nie możesz odebrać sobie uprawnień. Może to zrobić tylko inny administrator.',
  approvalInformed: 'Ten współpracownik został już poinformowany o zaakceptowaniu jego zgłoszenia.',
  declinementInformed: 'Ten współpracownik został już poinformowany o tym, że jego zgłoszenie zostało odrzucone.',
  vacationEndInPast: 'Data końcowa nie może być z przeszłości.',
  missingTag: 'Brak zdefiniowanych tagów. Prosimy najpierw stworzyć nowy tak w zakładce Admin > Ustawienia',
  logout: {
    title: 'Podpowiedź',
    text: 'Wylogowanie nie jest niezbędne jeżeli nie korzystasz z wspólnego komputera. Twoje połączenie jest szyfrowane a wszelkie dane sesji zapisujemy tylko w twojej przeglądarce. Nikt inny nie jest w stanie zobaczyć lub ukraść danych sesji.',
    confirm: 'Wyloguj się',
    cancel: 'Anuluj'
  },
  invite: {
    user: {
      title: 'Zaprosić głosiciela?',
      text: 'Ten głosiciel <b>już ma konto</b>, więc nowe nie zostało stworzone. Zamiast tego otrzymał <b>poprostu uprawnienia dostępu do tego projektu</b>.<br>Oczywiście <b>poinformujemy go</b> o tej zmienie. <br><p>W wypadku jeżeli więcej niż jeden głosiciel zarejestrował się pod tym samym adresem email, proszę wybierz prawidłowego:</p>'
    },
    users: {
      title: 'Czy jesteś pewny?',
      text: 'Wyślemy informacje do zaznaczonych głoscieli.',
      confirm: 'Zaproś',
      cancel: 'Anuluj'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Czy jesteś pewny?',
      text: 'Wszyscy zaakceptowani i odrzuceni głosiciele dostaną emaila z informacją.',
      confirm: 'Tak',
      cancel: 'Anuluj'
    },
    confirmation: {
      title: 'Poinformować głosiciela?',
      text: 'Głosiciel zostanie poinformowany przez e-mail o zaakceptowaniu tego zgłoszenia.',
      confirm: 'Tak',
      cancel: 'Anuluj'
    },
    declined: {
      title: 'Poinformować głosiciela?',
      text: 'Głosiciel zostanie poinformowany przez e-mail o odrzuceniu tego zgłoszenia.',
      confirm: 'Tak',
      cancel: 'Anuluj'
    },
    selectTag: {
      title: 'Jaki Tag?',
      text: 'Proszę wybierz tag, dla którego chcesz wysłać emaile z potwierdzeniem:',
      confirm: 'OK',
      cancel: 'Anuluj'
    },
    teamUpdate: {
      user: {
        title: 'Koordynator zmiany już został poinformowany',
        text: 'Koordynator zmiany jest już poinformowany. Czy chesz wysłać e-mail z tą aktualizacją do niego?',
        confirm: 'Tak',
        cancel: 'Nie'
      },
      general: {
        title: 'Czy jesteś pewny?',
        text: 'Poinformowani głosciele otrzymają maila z zaktualizowanymi informacji o tej zmianie.',
        confirm: 'Tak',
        cancel: 'Nie'
      }
    },
    understaffed: {
      title: 'Poinformować głosiciela?',
      text: 'Poinformować wszystkich głosicieli o niepełnych zmianach?',
      confirm: 'Tal',
      cancel: 'Nie',
      teamleader: {
        title: 'Poinformować koordynatora zmiany?',
        text: 'Czy poinformować wszystkich koordynatorów zmian?',
        confirm: 'Tak',
        cancel: 'Nie'
      }
    }
  },
  add: {
    meeting: {
      title: 'Dodaj nową zbiórkę',
      text: '',
      placeholder: 'Nazwa',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    },
    question: {
      title: 'Dodaj nowe pytanie/tytuł',
      text: '',
      placeholder: 'Pytanie/Tytuł',
      inputError: 'Musisz coś napisać!',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    },
    tab: {
      title: 'Dodaj nową zakładkę',
      text: '',
      placeholder: 'Tytuł',
      inputError: 'Nieprawidłowa nazwa zakładki!',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    },
    tag: {
      title: 'Dodaj nowy tag',
      text: '',
      placeholder: 'Nazwa',
      inputError: 'Nieprawidłowa nazwa tagu!',
      confirm: 'Stwórz',
      cancel: 'Anuluj'
    },
    team: {
      title: 'Dodaj nową lokalizację',
      text: '',
      placeholder: 'Nazwa',
      inputError: 'Niepoprawna nazwa lokalizacji!',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    },
    template: {
      title: 'Dodaj szablon',
      text: '',
      placeholder: 'Nazwa',
      inputError: 'Niepoprawna nazwa szablonu!',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    },
    user: {
      title: 'Stworzono!',
      text: 'Użytkownik został stworzony.'
    },
    users: {
      title: 'Czy jesteś pewny?',
      text: 'Wszyscy pokazani głosiciele zostaną dodani do tego projektu.',
      confirm: 'Dodaj',
      cancel: 'Anuluj'
    }
  },
  update: {
    file: {
      title: 'Zmień nazwę pliku',
      text: '',
      placeholder: 'Plik',
      inputError: 'Niepoprawna nazwa pliku!',
      confirm: 'Zmień',
      cancel: 'Anuluj'
    },
    password: {
      title: 'Zmień hasło',
      passwordOld: 'Stare hasło',
      passwordNew1: 'Niewe hasło',
      passwordNew2: 'Powtórz nowe hasło',
      confirm: 'Zmień',
      cancel: 'Anuluj',
      passwordChanged: 'Hasło zostało zmienione'
    },
    question: {
      title: 'Zmień pytanie',
      text: '',
      placeholder: 'Pytanie/Tytuł',
      confirm: 'Zmień',
      cancel: 'Anuluj'
    },
    template: {
      title: 'Edytuj nazwę',
      text: '',
      placeholder: 'Nazwa',
      confirm: 'Zmień',
      cancel: 'Anuluj'
    }
  },
  delete: {
    account: {
      title: 'Na pewno usunąć Twoje konto?',
      text: 'Konto zostanie nieodwracalnie usunięte!',
      confirm: 'Usuń moje konto!',
      cancel: 'Anuluj'
    },
    allShifts: {
      title: 'Czy jesteś pewny?',
      text: 'Wszystkie zmiany z tego dnia i wszystkie zgłoszenia dla tych zmian zostaną nieodwracalnie usunięte.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    file: {
      title: 'Czy jesteś pewny?',
      text: 'Ten plik zostanie stale usunięty.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    language: {
      title: 'Na pewno usunąć ten język?',
      text: 'Usuwając język usuwasz również ilość publikacji w tym języku.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    meeting: {
      title: 'Na pewno usunąć ten punkt zbiórki?',
      text: 'Punkt zbiórki zostanie również usunięty ze wszystkich istniejących zmian zaplanowanych w przyszłości. <br><br> Any potwierdzić wpisz "usuń".',
      checkInput: 'usuń',
      placeholder: 'Proszę wpisz "{{0}}" aby potwierdzić',
      inputError: 'Wpisany tekst nie zgadza się. Wpisz słowo "{{0}}"',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    note: {
      title: 'Na pewno usunąć tą noatkę?',
      text: 'Nietatka zostanie nieodwracalnie usunięta.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    project: {
      title: 'Na pewno usunąć ten projekt?',
      text: 'To nieodwracalnie usunie wszystkie ustawienia związane z tym projektem, m. in. grafik, sprawozdania, zgłoszenia, magazyn. Tylko konta użytkowników nie zostaną usunięte. <br><br> Any potwierdzić wpisz "usuń ten projekt".',
      checkInput: 'usuń ten projekt',
      placeholder: 'Proszę wpisz "{{0}}" aby potwierdzić',
      inputError: 'Wpisany tekst nie zgadza się. Wpisz słowo "{{0}}"',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    publication: {
      title: 'Usunąć tą publikację z magazynu?',
      text: 'Stracisz wszelkie zebrane dane dotyczące tej publikacji.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    question: {
      title: 'Czy jesteś pewny?',
      text: 'To nieodwracalnie usunie pytanie i powiązaną odpowiedź.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    shift: {
      title: 'Na pewno usunąć tą zmianę?',
      text: 'Wszelkie zgłoszenia dla tej zmiany zostaną usunięte.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    store: {
      title: 'Na pewno zresetować magazyn?',
      text: 'To usunie wszystkie dodane publikacje.',
      confirm: 'Zresetuj',
      cancel: 'Anuluj'
    },
    tab: {
      title: 'Czy jesteś pewny?',
      text: 'Cała zakładka ze wszystkimi pytaniami zostanie usunięta.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    tag: {
      title: 'Na pewno usunąć tag?',
      text: 'Wszystkie zmiany należace do tego tagu również zostaną usunięte. Podobnie wszyskie zgłoszenia dotyczące tych zmian. <br><br> Aby potwierdzić wpisz "usuń".',
      checkInput: 'usuń',
      placeholder: 'Proszę wpisz "{{0}}" aby potwierdzić',
      inputError: 'Wpisany tekst nie zgadza się. Wpisz słowo "{{0}}"',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    team: {
      title: 'Na pewno usunąć tą lokalizację?',
      text: 'Ta lokalizacja zostanie usunięta ze wszystkich istniejących zmian zaplanowanych w przyszłości. <br><br> Any potwierdzić wpisz "usuń".',
      checkInput: 'usuń',
      placeholder: 'Proszę wpisz "{{0}}" aby potwierdzić',
      inputError: 'Wpisany tekst nie zgadza się. Wpisz słowo "{{0}}"',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    template: {
      title: 'Na pewno usunąć ten szablon?',
      text: '',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    },
    user: {
      title: 'Na pewno usunąć tego użytkownika?',
      text: 'Wszelkie uprawnienia tego użytkownika w projekcie zostaną usunięte.',
      confirm: 'Usuń',
      cancel: 'Anuluj'
    }
  },
  request: {
    approve: {
      title: 'Na pewno zaakceptować tego głosiciela?',
      text: 'Zgłoszenie tego głosiciela zostało wcześniej odrzucone. W związku z tym proszę upewnij się że ten głosiciel jest dalej dostępny i chętny do współpracy.',
      confirm: 'Tak',
      cancel: 'Nie'
    },
    cancel: {
      title: 'Czy jesteś pewny?',
      text: 'Zmiana zostanie anulowana jeżeli jesteś ostatnim współpracownikiem.',
      confirm: 'Tak, anuluj moje zgłoszenie',
      cancel: 'Nie'
    },
    decline: {
      title: 'Na pewno odrzucić zgłoszenie współpracownika?',
      text: 'Jeżeli współpracownik został wcześniej poinformowany, to otrzyma wiadomość z odrzuceniem zgłoszenia.',
      confirm: 'Tak',
      cancel: 'Nie'
    },
    maxReached: {
      title: 'Za dużo wybranych użytkowników',
      text: 'Zmienić maksymalną ilość członków zmiany z {{0}} do {{1}} i zaakceptować zaznaczonych?',
      confirm: 'Zaakceptuj zaznaczonych',
      cancel: 'Anuluj'
    },
    minNotReached: {
      title: 'Za mało wybranych użytkowników',
      text: 'Zmienić minimalną ilość członków zmiany z {{0}} do {{1}} i zaakceptować zaznaczonych?',
      confirm: 'Zaakceptuj zaznaczonych',
      cancel: 'Anuluj'
    },
    minReached: {
      title: 'Na pewno odrzucić zgłoszenie współpracownika?',
      text: 'Minimalna ilość członków zmiany została osiągnięta. Jeżeli odrzucisz zgłoszenie tego użytkownika, system anuluje tą zmianę.',
      confirm: 'Anuluj zmianę',
      cancel: 'Nie'
    },
    noNewTeamleader: {
      title: 'Na pewno odrzucić zgłoszenie współpracownika?',
      text: 'Niestety w tej zmianie nie ma innego dostępnego koordynatora zmiany. Jeżeli odrzucisz zgłoszenie tego użytkownika, system anuluje tą zmianę.',
      confirm: 'Anluj zmianę',
      cancel: 'Nie'
    }
  }
}

export default swal
