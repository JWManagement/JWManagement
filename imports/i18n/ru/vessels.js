const vessel = {
  nameShort: 'Корабли/судна',
  entity: {
    name: 'Название корабля/судна',
    flag: 'Флаг',
    type: 'Тип',
    typeValues: {
      c: 'Контейнеровоз',
      ca: 'Катамаран',
      cr: 'Круизный',
      ex: 'Курсовой',
      mf: 'Грузоперевозчик',
      mt: 'Танкер',
      p: 'Пассажирский корабль',
      pt: 'Катер',
      r: 'Корабль "Холодильник"',
      rc: 'Корабль круиза по реки',
      f: 'Паром',
      fi: 'Рыболовный корабль',
      ro: 'Ролкер Ro-Ro',
      t: 'Буксир',
      unknown: 'Другой вид'
    },
    callsign: 'Позывной',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Удалить данные этого судна',
    deleteConfirmation: 'Удалить данные этого судна?',
    visit: {
      new: 'Запись нового посещения',
      noElements: 'Это судно ещё не посещали',
      delete: 'Удалить это посещение',
      deleteConfirmation: 'Удалить это посещение?',
      person: 'Возвещатель',
      email: 'E-Mail Возвещателя',
      phone: 'Телефон Возвещателя',
      isUserVisible: 'Показать твои контактные данные другим возвещателям?',
      date: 'Дата',
      dateNext: 'Следующее посещение ',
      harbor: 'Порт',
      harborId: 'Порт',
      harborIdValues: {
        placeholder: 'Выбери Порт'
      },
      country: 'Страна',
      language: {
        new: 'Добавить новый язык',
        noElements: 'Язык ещё не известен',
        methodConfirmation: 'Подтверди что хочешь удалить этот язык',
        languageIds: 'Язык',
        languageIdsValues: {
          placeholder: 'Выбери язык'
        }
      },
      languages: 'Языки на борту'
    }
  },
  search: {
    placeholder: 'Название судна, Позывной, ENI, IMO или MMSI'
  },
  details: {
    sections: {
      identification: 'Идентификационные данные',
      visit: 'Данные о посещении'
    },
    dateFormat: 'ДД.ММ.ГГГГ'
  },
  visit: {
    details: {
      sections: {
        main: 'Данные о посещении',
        language: 'Языки',
        option: 'Опции'
      },
      dateFormat: 'ДД.ММ.ГГГГ'
    }
  }
}

export default vessel
