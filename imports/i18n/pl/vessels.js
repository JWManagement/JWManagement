const vessel = {
  nameShort: 'Statki',
  entity: {
    name: 'nazwa Statku',
    flag: 'Flaga',
    type: 'Typ',
    typeValues: {
      c: 'Kontenerowiec',
      cr: 'Statek wycieczkowy',
      mf: 'Statek towarowy',
      mt: 'Tankowiec',
      p: 'Statek Pasażerski',
      pt: 'Pushtow',
      rc: 'Statek rzeczny',
      f: 'Prom',
      ro: 'Rorowiec',
      t: 'Holownik',
      unknown: 'Nieznany'
    },
    callsign: 'sygnał wywoławczy',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Usuń ten statek',
    deleteConfirmation: 'Czy na pewno chcesz usunąć ten statek?',
    visit: {
      new: 'Zapisz nową wizytę',
      noElements: 'Ten statek nie został jeszcze odwiedzony',
      delete: 'Usunąć tą wizytę?',
      deleteConfirmation: 'Czy na pewno chcesz usunąć tą wizytę?',
      person: 'Głosiciel',
      email: 'Adres E-mail głosiciela',
      phone: 'Numer telefonu głosiciela',
      isUserVisible: 'Uczynić twoje dane kontaktowe widoczne dla innych głosicieli?',
      date: 'Data',
      dateNext: 'Następna wizyta najlepiej po',
      harbor: 'Port',
      harborId: 'Port',
      harborIdValues: {
        placeholder: 'Wybierz port',
      },
      country: 'Kraj',
      language: {
        new: 'Dodaj język',
        noElements: 'Brak zanotowanych języków',
        methodConfirmation: 'Czy na pewno chcesz usunąć ten język?',
        languageIds: 'Język',
        languageIdsValues: {
          placeholder: 'Wybierz język'
        }
      },
      languages: 'Języki na pokładzie'
    }
  },
  search: {
    placeholder: 'Nazwa statku, Sygnał Wywoławczy, ENI, IMO albo MMSI'
  },
  details: {
    sections: {
      identification: 'Dane Identyfikacyjne',
      visit: 'Dane wizyty'
    },
    dateFormat: 'MM/DD/YYYY'
  },
  visit: {
    details: {
      sections: {
        main: 'Dane wizyty',
        language: 'Language data',
        option: 'Opcje'
      },
      dateFormat: 'MM/DD/YYYY'
    }
  }
}

export default vessel
