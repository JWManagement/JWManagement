const publisher = {
  entity: {
    username: 'Nazwa użytkownika',
    profile: {
      firstname: 'Imię',
      lastname: 'Nazwisko',
      email: 'E-mail',
      telefon: 'Telefon',
      gender: 'Płeć',
      genderValues: {
        m: 'Brat',
        w: 'Siostra'
      },
      congregation: 'Zbór',
      pioneer: 'Przywilej służby',
      pioneerValues: {
        publisher: 'Głosiciel',
        auxiliary: 'Pionier pomocniczy',
        regular: 'Pionier stały',
        special: 'Pionier specjalny',
        circuit: 'Nadzorca Obwodu',
        bethelite: 'Betelczyk',
        ldc: 'Sługa budowalny'
      },
      privilege: 'Zadania zborowe',
      privilegeValues: {
        publisher: 'Głosiciel',
        servant: 'Sługa pomocniczy',
        elder: 'Starszy',
        coordinator: 'Koordynator Grona Starszych',
        secretary: 'Sekretarz',
        serviceOverseer: 'Nadzorca służby'
      },
      languages: 'Obce języki',
      shortTermCalls: 'Jestem dostępny nawet w ostatniej chwili',
      shortTermCallsAlways: 'Nawet jeśli nie zaznaczyłem dostępności',
      availability: {
        new: 'Dodaj nowy przedział czasowy',
        noElements: 'Nie wprowadzono żadnych przedziałów czasowych',
        methodConfirmation: 'Czy na pewno chcesz usunąć ten przedział czasowy?',
        mondays: 'Poniedziałki',
        tuesdays: 'Wtorki',
        wednesdays: 'Środy',
        thursdays: 'Czwartki',
        fridays: 'Piątki',
        saturdays: 'Soboty',
        sundays: 'Niedziele',
        start: 'Start',
        startDateFormat: 'HH -',
        startValues: {
          '0': '00:00',
          '1': '01:00',
          '2': '02:00',
          '3': '03:00',
          '4': '04:00',
          '5': '05:00',
          '6': '06:00',
          '7': '07:00',
          '8': '08:00',
          '9': '09:00',
          '10': '10:00',
          '11': '11:00',
          '12': '12:00',
          '13': '13:00',
          '14': '14:00',
          '15': '15:00',
          '16': '16:00',
          '17': '17:00',
          '18': '18:00',
          '19': '19:00',
          '20': '20:00',
          '21': '21:00',
          '22': '22:00',
          '23': '23:00'
        },
        end: 'Koniec',
        endDateFormat: 'HH',
        endValues: {
          '0': '01:00',
          '1': '02:00',
          '2': '03:00',
          '3': '04:00',
          '4': '05:00',
          '5': '06:00',
          '6': '07:00',
          '7': '08:00',
          '8': '09:00',
          '9': '10:00',
          '10': '11:00',
          '11': '12:00',
          '12': '13:00',
          '13': '14:00',
          '14': '15:00',
          '15': '16:00',
          '16': '17:00',
          '17': '18:00',
          '18': '19:00',
          '19': '20:00',
          '20': '21:00',
          '21': '22:00',
          '22': '23:00',
          '23': '00:00'
        },
        wholeDay: 'Cały dzień'
      },
      vacation: {
        start: 'Start',
        end: 'Koniec',
        new: 'Dodaj nowy urlop',
        noElements: 'Brak dodanych urlopów',
        methodConfirmation: 'Czy na pewno chcesz usunąć ten urlop?',
        startDateFormat: 'DD.MM.YYYY [do]',
        endDateFormat: 'DD.MM.YYYY'
      }
    },
    password: {
      change: 'Zmień hasło',
      reset: 'Wyślij maila zmieniającego hasło',
      resetConfirmation: 'Czy na pewno chcesz wysłać maila zmieniającego hasło dla tego użytkownika?',
      password: 'Wprowadź nowe hasło',
      passwordRepeat: 'Powtórz nowe hasło'
    },
    permissions: {
      permissions: 'Uprawnienia',
      project: 'Uprawnienia projektu',
      projectValues: {
        admin: 'Zarządzanie projektem',
        shiftScheduler: 'Układanie zmian',
        shiftAdmin: 'Zarządzanie zmian',
        storeAdmin: 'Zarządzanie magazynem',
        member: 'Członek'
      },
      tag: {
        tag: 'Tag',
        role: 'Rola',
        roleValues: {
          teamleader: 'Nadzorca zmiany',
          substituteTeamleader: 'Zastępca nadzorcy zmiany',
          participant: 'Uczestnik',
          none: 'Brak'
        }
      }
    },
    invite: 'Wyślij zaproszenie do projektu',
    inviteConfirmation: 'Czy na pewno chcesz wysłać mailowe zaproszenie do projektu do tego użytkownika?',
    delete: 'Odbierz dostęp do projektu dla wybranych użytkowników',
    deleteConfirmation: 'Czy na pewno chcesz odebrać dostęp do tego projektu wybranym użytkowników?'
  },
  search: {
    placeholder: 'Imię, Nazwisko, E-mail, Telefon lub Nazwa użytkownika'
  },
  details: {
    sections: {
      identification: 'Dane identyfikacyjne',
      availability: 'Dostępność',
      vacations: 'Urlop',
      permissions: 'Uprawnienia',
      password: 'Hasło',
      options: 'Opcje'
    }
  },
  profile: {
    availability: {
      details: {
        sections: {
          mondays: 'Dostępność w poniedziałki',
          tuesdays: 'Dostępność we wtorki',
          wednesdays: 'Dostępność w środy',
          thursdays: 'Dostępność w czwartki',
          fridays: 'Dostępność w piątki',
          saturdays: 'Dostępność w soboty',
          sundays: 'Dostępność w niedziele'
        }
      }
    }
  },
  permissions: {
    details: {
      sections: {
        permissions: {
          project: 'Uprawnienia projektu',
          tags: 'Uprawnienia Tagu'
        }
      }
    },
    tag: {
      details: {
        sections: {
          permissions: {
            tag: 'Uprawnienia Tag'
          }
        }
      }
    }
  }
}

export default publisher
