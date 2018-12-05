const misc = {
  input: {
    username: 'Nazwa użytkownika',
    usernameOrEmail: 'Nazwa konta lub adres mailowy',
    firstname: 'Imię',
    lastname: 'Nazwisko',
    email: 'Adres email',
    telefon: 'Telefon',
    congregation: 'Zbór',
    languages: 'Języki',
    gender: 'płeć',
    privilegeOfService: 'Przywilej służby',
    privilegeOfMinistry: 'Zadania zborowe',
    password: 'Hasło',
    passwordRepeat: 'Powtórz hasło',
    newPassword: 'Nowe hasło',
    newPasswordRepeat: 'Powtórz nowe hasło'
  },
  role: {
    role: 'Rola',
    admin: 'Menadżer projekut',
    shiftScheduler: 'Grafik',
    shiftAdmin: 'Menadżer zmian',
    storeAdmin: 'Menadżer magazynu',
    member: 'Członek',
    teamleader: 'Koordynator zmian',
    substituteTeamleader: 'Zasdtępca koordynatora zmian',
    participant: 'Współpracownik',
    nothing: 'Nic',
    noPermission: 'Brak uprawnień'
  },
  permissions: {
    notAdmin: 'Ten użytkownik nie jest menadżerem projektu',
    notShiftScheduler: 'Ten użytkownik nie układa grafiku',
    notShiftAdmin: 'Ten użytkownik nie jest menadżerem zmian',
    notStoreAdmin: 'Ten użytkownik nie jest menadżerem magazynu',
    notProjectParticipant: 'Ten użytkownik nie jest współpracownikiem tego projektu',
    notTeamleader: 'Ten użytkownik nie jest koordynatorem zmian',
    notTagParticipant: 'Ten użytkownik nie jest współpracownikiem dla tego tagu',
    notTeamParticipant: 'Ten użytkownik nie jest współpracownikiem dla tej zmiany'
  },
  time: {
    start: 'Start',
    end: 'Koniec',
    suffix: 'godzina',
    years: 'lata',
    to: 'do'
  },
  scheduling: {
    name: 'Grafik',
    direct: 'Akceptuj automatycznie',
    manual: 'Akceptuj ręcznie'
  },
  password: {
    tooShort: 'Hasło musi mieć przynajmniej 8 znaków',
    notMatching: 'Hasła do siebie nie pasują!'
  },
  weekdays: {
    mo: 'Poniedziałek',
    tu: 'Wtorek',
    we: 'Środa',
    th: 'Czwartek',
    fr: 'Piątek',
    sa: 'Sobota',
    su: 'Niedziela'
  },
  intervals: {
    m: 'Ręcznie',
    every: 'Co tydzień',
    even: 'Co drugi tydzień (parzysty)',
    odd: 'Co drugi tydzień (nieparzysty)'
  },
  privileges: {
    auxiliary: 'PP',
    regular: 'PSt',
    special: 'PSp',
    circuit: 'NO',
    bethelite: 'B',
    ldc: 'LDPB',
    coordinator: 'KGS',
    secretary: 'Sek',
    serviceOverseer: 'NS',
    elder: 'St',
    servant: 'Sł',
    publisher: 'G'
  },
  period: {
    d: 'D',
    w: 'T',
    '4w': '4T'
  }
}

export default misc
