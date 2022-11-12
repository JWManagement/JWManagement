const modal = {
  close: 'Bezárás',
  addParticipant: {
    title: 'Résztvevő hozzáadása',
    description: 'Kérjük, válaszd ki azt a hírnököt, akit hozzá kívánsz adni ehhez a szolgálati időszakhoz.'
  },
  addWeek: {
    title: 'Új hét készítése',
    noTemplate: 'Először hozz létre egy sablont',
    defineTemplate: 'Sablon létrehozása',
    action: 'Hét készítése',
    text: {
      top: 'Válassz egy hetet, hogy a sablonhét alkalmazható legyen:',
      bottom: 'Válaszd ki a sablon hetét:'
    }
  },
  cancelTeam: {
    title: 'Csoport törlés',
    text: 'Írd le, hogy miért kell ezt a csapatot törölni. Minden résztvevő megkapja ezt az üzenetet a törlési levélen keresztül.',
    action: 'Csoport törlés'
  },
  copyShift: {
    title: 'Szolgálati időpont másolása',
    text: 'Csak válaszs ki azokat a napokat, amelyekre át kívánja másolni ezt a szolgálati időpontot.',
    action: 'Szolgálati időpont másolása'
  },
  editShift: {
    title: 'Szolgálati időszak információjának szerkesztése',
    mainData: 'Főbb részletek',
    tag: 'Címke',
    team: 'Csoport',
    teams: 'A szolgálati időszakhoz rendelt csoport',
    helpText: {
      tag: 'Állítsd be ezt a szolgálati idöszak címkét. A címkével rendelkező összes jogosultsággal rendelkező felhasználó megtekintheti a szolgálati időszakot.',
      scheduling: 'Az "azonnali jóváhagyás" automatikusan jóváhagyásra kerül, amikor elérjük a minimális résztvevő limitet a következő csoport számára.'
    },
    addTeam: 'Új csopoprt hozzáadása',
    teamMin: 'Minimum résztvevő:',
    teamMax: 'Maximum résztvevő:',
    teamStart: 'Indít:',
    teamEnd: 'Vége:',
    teamPlace: 'Hely:',
    removeTeam: 'Csoport eltávolítása',
    noMeeting: 'Nincs találkozás',
    action: 'Akció:',
    delete: 'Törlés',
    switch: 'Ütemezett szolgálati idöszak',
    copyShift: 'Szolgálati időszak másolása'
  },
  editTeamPicture: {
    title: 'Csoport kép cseréje',
    currentPicture: 'Aktuális kép:',
    hints: 'Ez a kép valószínűleg nagyobb lesz a hírnök számára.',
    noPictureUploaded: 'Még nem töltöttél fel képet.',
    upload: 'Feltöltés',
    delete: 'Törlés'
  },
  editMeetingPicture: {
    title: 'Találkozási pont fényképének cseréje',
    currentPicture: 'Aktuális kép:',
    hints: 'Ez a kép valószínűleg nagyobb lesz a hírnök számára.',
    noPictureUploaded: 'Még nem töltöttél fel képet.',
    upload: 'Feltöltés',
    delete: 'Törlés'
  },
  inviteUser: {
    title: 'Új hírnök meghívása',
    key: '<span class="text-warning">Naracs színü név</span> azt jelenti, hogy a felhasználó már meghívott.',
    selectAll: 'Összes kijelölése',
    noUsers: 'Nics új hirnökre találat',
    invite: 'Meghívás'
  },
  position: {
    title: 'Jelöljd meg a pozíciót a bal egérkattintással'
  },
  shift: {
    collapseTeam: 'Az Útvonalak és találkozási helyek összecsukása',
    expandTeam: 'Az Útvonalak és találkozási helyek kibontása',
    noParticipants: 'Nincsenek résztvevők',
    requestTeam: 'Részvételi kérés',
    requestTeamAgain: 'Ismételt részvételi kérés',
    requests: 'Kérések',
    cancelRequest: 'Kérés visszavonás',
    cancelParticipation: 'A részvétel visszavonása',
    addParticipant: 'Résztvevő hozzáadása',
    closedTeam: 'Ez a csoport zárva van. Nem kérhetsz részvételi lehetőséget.',
    maximumReached: 'A csoport elérte amaximális létszámot',
    noPermission: 'Nincs engedélyed a felhasználók ütemezésére',
    noTeamleader: 'Ennek a felhasználónak nincs engedélye, hogy csoportvezető legyen',
    alreadyTeamleader: 'Ez a felhasználó már csoportvezető',
    openTeam: 'Csoport megnyitása',
    closeTeam: 'Csoport bezárása',
    switch: 'Szolgálati időszak szerkesztése',
    existingTeamleaders: 'Van csoportvezető',
    noExistingTeamleader: 'Nincs csoportvezető'
  },
  shiftReport: {
    title: 'Jelentés',
    teamleader: 'Csoportvezető',
    substituteTeamleader: 'Helyettes csoportvezető',
    publications: 'Kiadványok',
    occurrences: 'Esemény',
    store: 'Készlet',
    experiences: 'Tapasztalatok',
    present: 'Jelenlévő',
    sick: 'Beteg',
    missing: 'Hiányzó',
    name: 'Név',
    language: 'Nyelv',
    count: 'Számláló',
    action: 'tevékenység',
    noPublications: 'Nincsenek kiadványok',
    select_publication: 'Válassz ki egy kiadványt',
    selectPublicationFirst: 'Először válasszd ki a kiadványt',
    addItem: 'Add this publication',
    removeItem: 'Távolítsa el ezt a kiadványt',
    texts: 'Bibliavesek',
    speaks: 'Beszélgetések',
    videos: 'Videólejátszások',
    returnVisits: 'Újralátogatások',
    bibleStudies: 'Bibliatanulmányozások',
    time: 'Szolgálatban eltöltött órák',
    trolleysFilled: 'Feltöltött mozgópultok',
    neatnessLast: 'Mozgópult állapota utolsó szolgálat után',
    bad: 'Rossz',
    normal: 'Normál',
    good: 'Jó',
    yes: 'Igen',
    no: 'Nem',
    expRoute: 'Útvonal',
    expGood: 'Jó tapasztalatok',
    expProblems: 'Problémák / nehézségek',
    date: 'Dátum',
    toShift: 'A szolgálati időszakhoz',
    pages: {
      publisher: 'Hírnök oldala',
      items: 'Elterjesztett kiadványok oldala',
      occurrences: 'Megtörtént esetek',
      store: 'A készletezésről',
      experiences: 'A te tapasztalataid',
      prevPage: 'Ugrás az előző oldalra',
      nextPage: 'Go to the next page',
      finish: 'Ugrás a következő oldalra'
    }
  },
  route: {
    title: 'Útvonal létrehozása / szerkesztése',
    routeMarkers: 'Útvonal kijelölés',
    addRouteMarkers: 'Kattints egy új útvonaljelző hozzáadására a térképen'
  },
  uploadUserFile: {
    title: 'Felhasználói-fájl feltöltése',
    helpEncoding: 'A fájlnak UTF-8 kódolásúnak kell lennie, hogy támogatni tudja az összes karaktert',
    uploadFile: 'CSV-Fájl feltöltése',
    name: 'Név',
    email: 'Email',
  }
}

export default modal
