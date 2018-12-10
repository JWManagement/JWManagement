const pages = {
  login: {
    name: 'Login',
    welcome: 'Witaj w JW Management',
    text: 'Proszę wprowadź dane logowania',
    forgot: 'Zapomniałeś hasła?',
    create: 'Stwórz konto',
    back: 'Wróć do strony głównej'
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
  profile: {
    name: 'Mój profil',
    personalData: 'Moje informacje osobiste',
    changePicture: 'Zmień zdjęcie...',
    options: {
      title: 'Ustawienia',
      helpText: {
        mergeAccounts: 'W JW Management możesz zrobić wszystko z dosłownie jednym kontem. Dzięki temu wystarczy, że zapamiętasz tylko jedną nazwę użytkownika i jedno hasło. Jeżeli masz więcej kont kliknij w "Scal konta" i wprowadź dane logowania dla innych konto. Ta opcja doda (scali) uprawnienia wielu kont w jedno.'
      }
    },
    availability: {
      title: 'Dostępność',
      helpText: 'Proszę zaznacz godziny w których jesteś dostępny.',
      shortTermCalls: 'Jestem dostępny nawet w ostatniej chwili',
      shortTermCallsAlways: 'Nawet jeżeli nie zaznaczyłem dostępności',
      notifyViaEmail: 'Preferuję kontakt mailowy.'
    },
    speaks: 'Speaks',
    telefon: 'Telefon',
    congregation: 'Zbór',
    languages: 'Język',
    gender: 'Płeć',
    _gender: {
      brother: 'Brat',
      sister: 'Siostra'
    },
    publisher: 'Głosiciel',
    privilegeOfService: 'Przywilej służby',
    _privilegeOfService: {
      auxiliaryPioneer: 'Pionier pomocniczy',
      pioneer: 'Pionier stały',
      specialPioneer: 'Pionier specjalny',
      circuitOverseer: 'Nadzorca obwodu',
      bethelite: 'Betelczyk',
      fulltimeConstructionServant: 'Sługa budowlany'
    },
    ministryPrivilege: 'Zadania zborowe',
    _ministryPrivilege: {
      ministerialServant: 'Sługa pomocniczy',
      elder: 'Starszy',
      coordinator: 'Koordynator Grona Starszych',
      secretary: 'Sekretarz',
      serviceOverseer: 'Nadzorca służby'
    },
    placeholder: {
      telefon: '(np. +48 123 456 789)',
      congregation: 'Zbór',
      languages: 'Języki'
    },
    changePassword: 'Zmień hasło',
    deleteAccount: 'Usuń konta',
    mergeAccounts: 'Scal konta',
    vacation: {
      title: 'Urlop',
      helpText: 'Możesz dodać tutaj termin w którym nie będziesz dostępny'
    },
    until: 'do',
    addVacation: 'Dodaj urlop',
    deleteVacation: 'Usuń ten urlop',
    usernameTaken: 'Ta nazwa użytkownika jest już przez kogoś zajęta. Proszę wybrać inną.'
  },
  wiki: {
    name: 'Centrum informacji',
    nameShort: 'Info',
    files: 'Pliki',
    addQuestion: 'Dodaj pytanie / tytuł',
    edit: 'Edytuj',
    delete: 'Usuń',
    noFiles: 'Brak dostępnych plików',
    addTab: 'Dodaj nową zakładkę',
    editQuestion: 'Edytuj to pytanie',
    removeFaq: 'Usuń to pytanie',
    editFaq: 'Edytuj tą odpowiedź',
    changeFaq: 'Zapisz tą odpowiedź',
    cancelFaq: 'Anuluj edycję'
  },
  shifts: {
    name: 'Grafik',
    route: 'Ulica',
    addShift: 'Dodaj nową zmianę',
    addWeek: 'Dodaj nowy tydzień',
    requests: 'Zgłoszenia',
    openRequests: 'Otwarte zgłoszenia',
    automation: 'Automatycznie',
    template: 'Szablon',
    noVisibleShifts: 'Brak zmian dla tego tagu w tym tygodniu',
    start: 'Start',
    end: 'Koniec',
    visibility: 'Widoczność:',
    helpText: {
      start: 'To jest pierwszy tydzień stworzony przez system.',
      end: 'To jest ostatni tydzień stworzony przez system.',
      visibility: 'To definiuje ile tygodni do przodu głosiciele będą mogli zobaczyć grafik i wysyłać zgłoszenia. Uwzględniając początkowy i końcowy tydzień, system automatycznie stworzy potrzebne zmiany.'
    },
    weeks: 'tygodni',
    sendWeek: 'Wyślij mailowe potwierdzenia dla wszystkich zmian w tym tygodniu',
    hideNames: 'Zwiń wszystkie zmiany',
    showNames: 'Rozwiń wszystkie zmiany',
    editShifts: 'Edytuj zmiany',
    prevWeek: 'Idź do wcześniejszego tygodnia',
    nextWeek: 'Idź do następnego tygodnia',
    shownTag: 'Zmiany z tym tagiem są aktualnie widoczne',
    hiddenTag: 'Zmiany z tym tagiem są aktualnie ukryte',
    shift: {
      tag: 'Tag',
      schedule: 'Grafik',
      teamleader: 'Koordynator zmiany',
      teams: 'Lokalizacje',
      noTeams: 'Brak lokalizacji',
      participants: 'Współpracownicy',
      start: 'Start',
      end: 'Koniec',
      requests: 'Zgłoszenie',
      requests_plural: 'Zgłoszenia',
      requestsOf: 'Zgłoszenie z',
      requestsOf_plural: 'Zgłoszenia z',
      teamleaders: 'Koordynatorów zmiany',
      noPermission: 'Tylko Menadżer projektu lub Menadżer zmian jest uprawniony aby edytować lub usuwać zmiany'
    }
  },
  day: {
    removeAll: 'Usuń wszystkie'
  },
  reports: {
    export: 'Eksportuj jako CSV'
  },
  settings: {
    main: {
      title: 'Główne ustawienia',
      id: 'ID',
      name: {
        text: 'Nazwa',
        placeholder: 'Nazwa projektu',
        helpText: 'W wielu przypadkach nazwa projetku to nazwa zboru. Dla większych projektów zawierających wiele zborów to możę być nazwa miasta w którym projekt jest prowadzony. Jeżeli projetk nie dotyczy organizacji służby z wózkami, nazwa może również odnosić się do tego co będzie organizowane w tym projekcie.'
      },
      email: {
        text: 'Email',
        placeholder: 'Adres e-mail projetku',
        helpText: 'W wiadomościach email np. zawierających potwierdzenia przydziału, ten adres będzie ustawiony jako Odpowiedz-Do, więc jeżeli któryś ze współpracowników odpowie na ten e-mail, wiadomość zostanie normalnie wysłana na skrzynkę odbiorczą tego adresu (oczywiście pod warunkiem, że na programie współpracownika ma poprawnie skonfigurowaną swoją pocztę). Dodatkowo, ten adres będzie poinformowany w wypadku gdy ktoś wycofa swoje zgłoszenie w ostatniej chwili.'
      },
      language: {
        text: 'Język',
        helpText: 'Jeżeli system będzie informował wymieniony wyżej adres o zmianach, to wyśle e-maile w języku sprecyzowanym tutaj.'
      },
      deleteProject: 'Usuń projekt'
    },
    tags: {
      title: 'Tags',
      helpText: '<p>Każda zmiana ma przypisany tag. Dodatkowo każdy użytkownik może mieć udostępniony lub odebrany dostęp do oglądania zmian zależnie od tagu.</p><p>Tagi mogą dotyczyć różnych aktywności (np. głoszenia z wózkami, stanowiskami informacyjnymi, głoszeniu na ulic, itd.). Dzielenie zmian na różne tagi może być użyteczne, na przykłąd jeżeli będzie istnieć w tym samym czasie kilka zmian lub jeżeli tylko wybrani głosicieli zostali przeszkolenie w jakimś rodzaju służby publicznej.</p><p>Dla każdego tagu można ustawić tygodniowy szablon zmian. Używając opcji automatycznej podczas tworzenia grafiku, system będzie mógł użyć tego szablonu. To zaoszczędzi dla Menadżera projektu lub Menadżera zmian sporo czasu potrzebnego na układanie grafiku.</p>',
      id: 'ID',
      name: 'Nazwa',
      img: {
        name: 'Zdjęcie',
        helpText: 'To zdjęcie będzie pokazane w panelu startowym po kliknięciu \'Grafik\'. Zdjęcie powinno podpowiadać jakiego rodzaju zmian dotyczy grafiku w tym tagu. Jeżeli chciałbyś dodać inne zdjęcie, prosimy wyślij je do nas na support@jwmanagement.org opisując swój opomysł'
      },
      templates: 'Szablony',
      showTemplate: 'Edytuj zmiany',
      editTemplate: 'Edytuj nazwę',
      removeTemplate: 'Usuń',
      addTemplate: 'Stwórz nowy szablon',
      action: 'Akcje',
      none: 'Zadne taki nie zostały jeszcze dodane',
      add: 'Dodaj nowy tag',
      remove: 'Usuń ten tag'
    },
    teams: {
      title: 'Lokalizacja',
      helpText: {
        main: 'Każda zmiana musi mieć przydzieloną przynajmniej jedną lokalizację.',
        picture: 'Głosiciele będą widzieli to zdjęcie. W związku z tym, zdjęcie powinno podpowiadać o jaką lokalizę chodzi. Na przykład może przedstawiać ulicę na Google Maps lub OpenStreetMap (w zależności który z nich ma lepsze pokrycie twojego ternu).',
        link: 'Ten link będzie powiązany ze zdjęciem. Gdy użytkownik kliknie zdjęcie zostanie przekierowany na adres z tego linku. Na przykład możesz tutaj umieścić tutaj link do mapy Google Maps or OpenStreetMap.',
        description: 'Tutaj możesz dodatkowo ustawić opis dla tej lokalizacji. Na przykład możesz wyjaśnić niektóre szczegóły.'
      },
      id: 'ID',
      name: 'Nazwa',
      icon: 'Ikona',
      picture: 'Zdjęcie',
      editPicture: 'Wstaw zdjęcie dla tej lokalizacji',
      noPicture: 'Brak wysłanego zdjęcia',
      link: 'Link',
      description: 'Opis',
      action: 'Akcje',
      none: 'Żaden lokalizacja nie została jeszcze dodana',
      add: 'Dodaj nową lokalizację',
      remove: 'Usuń tą lokalizację'
    },
    meetings: {
      title: 'Meeting Point',
      helpText: {
        main: 'Dla każdej lokalizacji można przypisać punkt zbiórki. Dzięki temu, zmiennicy mogą spotkać się niezależnie jedni od drugich. To może być użyteczne, jeżeli lokalizacje mogą być tak oddalone od siebie, że wspólne spotkanie zabrało by za dużo czasu. Punkty zbiórki są definiowane ze współrzędnymi.',
        picture: 'Głosiciele będą widzieli to zdjęcie. W związku z tym, zdjęcie powinno wskazywać więcej informacji dla tego punktu zbiórki. Na przykład może przedstawiać ulicę na Google Maps lub OpenStreetMap (w zależności który z nich ma lepsze pokrycie twojego ternu).'
      },
      id: 'ID',
      name: 'Nazwa',
      picture: 'Zdjęcie',
      editPicture: 'Wrzuć zdjęcie dla tego punktu zbiórki',
      noPicture: 'Brak wysłanego zdjęcia',
      action: 'Akcje',
      none: 'Żaden punkt zbiórki nie został jeszcze stworzony',
      add: 'Dodaj nowy punkt zbiórki',
      remove: 'Usuń ten punkt zbiórki'
    }
  },
  firstLogin: {
    name: 'Witaj',
    text: '<p>Czekaliśmy na Ciebie.</p><p>Proszę ustaw swoją nazwę użytkownika i hasło. Od teraz będziesz potrzebował ich aby zalogować się do systemu.</p><p>Po tym kroku będziesz mógł zacząć korzystać z JW Management.</p><p>Powodzenia!</p>',
    agreeTerms: 'Zgadzam się z <a href="/en/terms" target="blank">warunkami użytkownia</a> i <a href="/en/privacy" target="blank">polityką prywatności</a>',
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

export default pages
