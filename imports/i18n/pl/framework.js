const framework = {
  searchForm: {
    loading: 'Ładowanie',
    noResults: 'Brak wyników',
    xResults: '{{count}} wynik',
    xResults_plural: '{{count}} wyników',
    showingTheFirstX: 'Pokazuję pierwszy {{count}}',
    showingAll: '',
    showingAll_plural: 'Pokazuję wszystkie',
    showAll: 'Pokaż wszystkie {{count}}'
  },
  validation: {
    required: 'Te pole jest wymagana',
    unique: 'Już istnieje wpis z tą wartością',
    minString8: 'Hasło musi mieć przynajmniej 8 znaków',
    passwordMismatch: 'Hasła nie pasują do siebie',
    hasToBeBigger: 'Ta wartość musi być większa',
    regEx: 'To nie jest poprawny adres email'
  },
  detailsForm: {
    yes: 'Tak',
    no: 'Nie'
  },
  dateFormat: {
    date: 'DD.MM.YYYY',
    dateAndTime: 'DD.MM.YYYY HH:mm',
    time: 'HH:mm'
  }
}

export default framework
