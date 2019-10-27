const framework = {
  searchForm: {
    loading: 'Загрузка',
    noResults: 'Нет результатов',
    xResults: '1 результат',
    xResults_plural: '{{count}} результатов',
    showingTheFirstX: 'Показать первые {{count}}',
    showingAll: '',
    showingAll_plural: 'Показать все',
    showAll: 'Показать все {{count}}',
  },
  validation: {
    required: 'Это обязательное поле',
    unique: 'Уже есть запись с этим значением, cоздай новое',
    minString8: 'Пароль должен иметь не менее 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    hasToBeBigger: 'Это значение должно быть больше',
    regEx: 'Это недействительный адрес электронной почты',
    usernameAlreadyTaken: 'Это имя пользователя уже используется. Придумай другое.'
  },
  detailsForm: {
    yes: 'Да',
    no: 'Нет'
  },
  dateFormat: {
    date: 'ДД.ММ.ГГГГ',
    dateAndTime: 'ДД.ММ.ГГГГ ЧЧ:мм',
    time: 'ЧЧ:мм'
  }
}

export default framework
