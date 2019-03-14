const pages = {
  profile: {
    name: 'A profilom',
    personalData: 'Személyes adataim',
    changePicture: 'Kép szerkesztése...',
    options: {
      title: 'Beállítások',
      helpText: 'A JW Managementben mindössze egyetlen fiókkal mindent megtehetsz, ezért csak egy felhasználónevet és jelszót kell megjegyezned. Ha több fiókod van, kérjük, írj nekünk egy e-mailt a support@jwmanagement.org-ra mindkét fiók felhasználónevével.'
    },
    availability: {
      title: 'Elérhetőség',
      helpText: 'Kérjük, jelöld meg a rendelkezésre álló órákat.',
      shortTermCalls: 'Kapcsolatba lehet lépni velem rövid idöszakra',
      shortTermCallsAlways: 'Még akkor is, ha nincs elérhetőség'
    },
    speaks: 'Beszél',
    telefon: 'telefon',
    congregation: 'Gyülekezet',
    languages: 'Beszélt nyelvek',
    gender: 'Nem',
    _gender: {
      brother: 'Testvér',
      sister: 'Testvérnő'
    },
    publisher: 'Hírnök',
    privilegeOfService: 'Szolgálati kíváltság',
    _privilegeOfService: {
      auxiliaryPioneer: 'Kisegítő úttörő',
      pioneer: 'Általános úttörő',
      specialPioneer: 'Különleges úttörő',
      circuitOverseer: 'Körzet felvigyázó',
      bethelite: 'Bétel tag',
      fulltimeConstructionServant: 'Építési család tagja'
    },
    ministryPrivilege: 'Gyülekezeti feladat',
    _ministryPrivilege: {
      ministerialServant: 'Kisegítőszolga',
      elder: 'Vén'
    },
    placeholder: {
      telefon: '(PL. +447712345678)',
      congregation: 'Gyülekezet',
      languages: 'Nyelvek'
    },
    changePassword: 'Jelszó változtatás',
    deleteAccount: 'Fiók törlése',
    vacation: {
      title: 'Munkaszüneti nap',
      helpText: 'Add meg azokat az időszakokat, amikor nem tudsz rendelkezésre állni.'
    },
    until: 'amíg',
    addVacation: 'Szabadság hozzáadása',
    deleteVacation: 'Szabadság törlése',
    usernameTaken: 'Ezt a felhasználónevet már valaki más használja. Kérjük, válassz másikat.'
  },
  wiki: {
    name: 'Információs Központ',
    nameShort: 'Infó',
    files: 'Fájlok',
    addQuestion: 'Kérdés/Cím hozzáadása',
    edit: 'Szerkesztés',
    delete: 'Törlés',
    noFiles: 'Nincsenek fájlok',
    addTab: 'Új fül hozzáadása',
    editQuestion: 'Ennek a kérsésnek a szerkesztése',
    removeFaq: 'Ennek a kérdésnek a törlése',
    editFaq: 'Ennek a válasznak a szerkesztése',
    changeFaq: 'Ennek a válasznak a mentése',
    cancelFaq: 'Szerkesztés visszavonása'
  },
  shifts: {
    name: 'Szolgálati idopont',
    route: 'Útvonal',
    addShift: 'Új szolgálati időszak hozzáadása',
    addWeek: 'Új hét hozzáadása',
    requests: 'Kérések',
    openRequests: 'Kérések megnyitása',
    automation: 'Automatikus',
    template: 'Sablon',
    noVisibleShifts: 'Nincs szolgálati időszak ezen a héten ezzel a cimkével',
    start: 'Kezdés',
    end: 'Vége',
    visibility: 'Láthatóság:',
    helpText: {
      start: 'Ez az első hét, amelyet a rendszer hoz létre.',
      end: 'Ez a rendszer által létrehozott utolsó hét.',
      visibility: 'Ez határozza meg, hogy hány héttel korábban a láthatják a hírnökök és kérhetnek is. Figyelembe veszi a hét elejét és a hét végét, a rendszer automatikusan létrehozza a szükséges szolgálati időszakokat.'
    },
    weeks: 'Hetek',
    sendWeek: 'Jóváhagyás küldése email-ben erre a hétre minden szolgálati időszakra',
    hideNames: 'Az összes név elrejtése a szolgálati időszakokban',
    showNames: 'Show all names in the shifts',
    editShifts: 'Az összes név megjelenítése a szolgálati időszakokban',
    prevWeek: 'Ugrás az előző hétre',
    nextWeek: 'Ugrás a következő hétre',
    shownTag: 'A szolgálati időszakok címkéi jelenleg láthatóak',
    hiddenTag: 'A szolgálati időszakok címkéi jelenleg rejtve vannak',
    shift: {
      tag: 'Címke',
      schedule: 'Ütemterv',
      teamleader: 'Csoport felelős',
      teams: 'Csoport',
      noTeams: 'Nincs csoport',
      participants: 'Résztvevők',
      start: 'Kezdés',
      end: 'Vége',
      noPermission: 'A projektmenedzser vagy a szolgálat szervezője csak szolgálati időszakok szerkesztésére vagy ütemezésére jogosult.'
    }
  },
  day: {
    removeAll: 'Összes törlése'
  },
  project: {
    name: 'Adminisztráció',
    nameShort: 'Admin'
  },
  reports: {
    export: 'Exportálás csv -be.'
  },
  settings: {
    main: {
      title: 'Fő beállítások',
      id: 'ID',
      name: {
        text: 'Név',
        placeholder: 'Projekt neve',
        helpText: 'Sok esetben a projekt neve a gyülekezet neve. Nagyobb projekteknél, beleértve a több gyülekezetet is, ez lehet a város neve, ahol a projekt megvalósul. Ha a projekt nem  közterületi tanuskodás szervezése, akkor a névnek is tükröznie kell azt, hogy mit fogsz szervezni ezzel a projekttel.'
      },
      email: {
        text: 'Email',
        placeholder: 'Projekt e-mail címe',
        helpText: 'Az e-mailekben, mint a szolgálati időszakok jóváhagyása és a csoport felelősének frissítése, ez a cím lesz beállítva a válasz címnek, így ha a címzettek válaszolnak ezekre az e-mailekre, akkor a választ általában erre az e-mail címre küldik, ha a címzett e-mail programja helyesen működik. Ezenkívül ez a cím kap értesítést pl. a közeli időben történő részvétel lemondásokról.'
      },
      language: {
        text: 'Nyelv',
        helpText: 'Ha a rendszer a változásokról értesíti a fent felsorolt címeket, elküldi a leveleket az itt megadott nyelven.'
      },
      deleteProject: 'Projekt törlése'
    },
    tags: {
      title: 'Cimkék',
      helpText: '<p>Minden szolgálati időszakhoz egy címkét kell rendelni. Ezenkívül minden felhasználó engedélyt kap, vagy  engedélye tiltva van, hogy a címkéketől függően mely szolgálati időszakokat láthat.</p><p>A címkék tükrözhetik a különböző tevékenységeket (például mozgópultos tanúskodás, Tanúskodó asztal-os szolgálat, Utcai tanuskodás stb.). A szolgálati időszakok különböző címkékre való felosztása hasznos lehet, például ha egy idöben több helyszínen vannak szolgálati időszakok, vagy bizonyos hírnököket képezünk egy adott típusú közterületi tanuskodásra. </p><p>Minden címkével olyan heti sablonok készíthetőek, amelyeket korábban definiáltunk. Az automatikus opció használatakor ütemezéssel a program használhatja ezeket a heti sablonokat. Ez a projekt vezetőjét vagy a Szolgálat szervező időt takaríthat meg az ütemezés során.</p>',
      id: 'ID',
      name: 'Név',
      img: {
        name: 'Kép',
        helpText: 'Ez a kép jelenik meg az irányítópulton, amikor a "szolgálati időszakok" gombra kattinttasz. Meg kell magyaráznod, hogy milyen típusú feladatokat kell végrehajtani a bizonyos címkevel jelölt szolgálati idöpont során.  Ha egyéni képeket szeretnél felvenni, küldj egy e-mailt a support@jwmanagement.org címre, amely leírja az ötletedet.'
      },
      templates: 'Sablonok',
      showTemplate: 'szolgálati időszak szerkesztése',
      editTemplate: 'Név szerkesztése',
      removeTemplate: 'Törlés',
      addTemplate: 'Új sablon megadása',
      action: 'Esemény',
      none: 'Még nincsenek címkék megadva',
      add: 'Új címke hozzáadása',
      remove: 'Ennek a cimkének a tölése'
    },
    teams: {
      title: 'Csoport',
      helpText: {
        main: 'Minden szolgálati időponhoz legalább egy csoportnak hozzá kell rendelve lennie. Minden csoport egy útvonalhoz vagy helyhez van hozzárendelve. A szolgálati időszak egyik résztvevője mindig tagja az egyik csapatnak.',
        picture: 'A hírnökök láthatják ezt a képet.  Ezért további információt kell adni a csoport feladatairól. Például létre tudsz hozni egy útvonalat ehhez a csoporthoz a Google Térképen vagy az OpenStreetMap-ban (attól függően, hogy melyik térképnek van jobb lefedettsége ), és feltölthetsz egy képet róla.',
        link: 'Ez a link kapcsolódik a képhez. Ha a felhasználó rákattint a képre, akkor a link címére továbbítja. Például megadhatod a Google Térkép vagy az OpenStreetMap térkép linkjét.',
        description: 'Itt állíthatsz be a leírást a csoporthoz. Például megmagyarázhatod a csoport vagy az útvonal bizonyos sajátosságait.'
      },
      id: 'ID',
      name: 'Név',
      picture: 'Kép',
      editPicture: 'Kép feltöltése a csoportról',
      noPicture: 'Nincs kép feltöltve',
      link: 'Hivatkozás',
      description: 'Leírás',
      action: 'Esemény',
      none: 'Még nincs csoport hozzáadva',
      add: 'Új csoport hozzáadása',
      remove: 'Ennek a csoportnak az eltávolítása'
    },
    meetings: {
      title: 'Találkozási hely',
      helpText: {
        main: 'Minden szolgálati csoporthoz lehet találkozási helyet rendelni. Ezzel a csoportok egymástól függetlenül találkozhatnak. Ez hasznos lehet, hiszen amikor a csoportok útvonala vagy helyszíne olyan messze van egymástól, hogy egy közös találkozó túlságosan időigényes lenne. A találkozási helyeket a koordináták határozzák meg.',
        picture: 'A hírnökök láthatják ezt a képet. Ezért további tájékoztatást kell adni a találkozási helyről. Például feltölthetsz egy képet a környezetről a Google Térképen vagy az OpenStreetMap-ban (attól függően, hogy melyik térképnek van jobb lefedettsége) itt.'
      },
      id: 'ID',
      name: 'Név',
      picture: 'Kép',
      editPicture: 'Kép feltöltése a találkozási helyről',
      noPicture: 'Nincs kép feltöltve',
      action: 'Esemény',
      none: 'Még nincs találkozási hely hozzáadva',
      add: 'Találkozási hely hozzáadása',
      remove: 'Találkozási hely eltávolítása'
    }
  },
  notes: {
    description: 'Itt egyszerű jegyzeteket készíthetsz. Minden projektmenedzser, a szolgálat szervező és a készletezési irányító láthatja ezeket a jegyzeteket. Így a csoportok együtt tarthatják a dolgaikat.',
    createNote: 'Jegyzet készítése',
    title: 'Cím',
    text: 'Szöveg',
    deleteNote: 'Ennek a jegyzetnek a törlése'
  }
}

export default pages
