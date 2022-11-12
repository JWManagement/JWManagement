const modal = {
  close: 'Sulje',
  addParticipant: {
    title: 'Lisä osallistuja',
    description: 'Valitse julistaja, jonka haluat lisätä tähän vuoroon.'
  },
  addVessel: {
    title: 'Lisää laiva',
    action: 'Lisää laiva'
  },
  addWeek: {
    title: 'Luo uusi viikko',
    noTemplate: 'Määrittele ensin mallipohja',
    defineTemplate: 'Määrittele mallipohja',
    action: 'Luo viikko',
    text: {
      top: 'Valitse viikko, johon mallipohja lisätään:',
      bottom: 'Valitse mallipohja:'
    }
  },
  cancelTeam: {
    title: 'Peruuta tiimi',
    text: 'Kirjoita kuvaus, miksi tämä tiimi peruutettiin. Kaikki osallistujat saavat tämän kuvauksen viestissä, joka lähetetään peruutussähköpostissa.',
    action: 'Peruuta tiimi'
  },
  copyShift: {
    title: 'Kopioi vuoro',
    text: 'Valitse päivät, johon haluat kopioida vuoron.',
    action: 'Kopioi vuoro'
  },
  editShift: {
    title: 'Muokkaa vuoron tietoja',
    mainData: 'Perustiedot',
    tag: 'Tunniste',
    team: 'Tiimi',
    teams: 'Tiimin liitetyt vuorot',
    helpText: {
      tag: 'Aseta vuoron tunniste. Kaikki käyttäjät, joilla on tämä tunniste, voivat nähdä vuoron.',
      scheduling: 'Hyväksy heti ilmoittautumiset hyväksytään automaattisesti, kun minimimäärä osallistujia seuraavalle tiimille saavutetaan.'
    },
    addTeam: 'Lisää uusi tiimi',
    teamMin: 'Minimi osallistujämäärä:',
    teamMax: 'Maksimi osallistujamäärä:',
    teamStart: 'Aloitus:',
    teamEnd: 'Lopetus:',
    teamPlace: 'Paikka:',
    removeTeam: 'Poista tämä tiimi',
    noMeeting: 'Ei kokoontumista',
    action: 'Toiminto:',
    delete: 'Poista',
    switch: 'Aikatauluta vuoro',
    copyShift: 'Kopioi vuoro'
  },
  editTeamPicture: {
    title: 'Vaihda tiimin kuva',
    currentPicture: 'Nykyinen kuva:',
    hints: 'Kuva näkyy todennäköisesti suurempana julistajalle.',
    noPictureUploaded: 'Et ole vielä ladannut yhtään kuvaa',
    upload: 'Lataa',
    delete: 'Poista'
  },
  editMeetingPicture: {
    title: 'Vaihda kokoontumispaikan kuvaa',
    currentPicture: 'Nykyinen kuva:',
    hints: 'Kuva näkyy todennäköisesti suurempana julistajalle.',
    noPictureUploaded: 'Et ole vielä ladannut yhtään kuvaa',
    upload: 'Lataa',
    delete: 'Poista'
  },
  editVessel: {
    title: 'Muokkaa laivaa',
    action: 'Tallenna muutokset'
  },
  inviteUser: {
    title: 'Kutsu uusia julistajia',
    key: '<span class="text-warning">Orassi nimi</span> tarkoittaa, että käyttäjä on jo kutsuttu.',
    selectAll: 'Valitse kaikki',
    noUsers: 'Uusia julistajia ei löytynyt',
    invite: 'Kutsu'
  },
  position: {
    title: 'Merkitse paikka klikkaamalla hiiren vasemmalla painikkeella'
  },
  shift: {
    collapseTeam: 'Piilota reitti ja kokoontumispisteet',
    expandTeam: 'Näytä reitti ja kokoontumispisteet',
    noParticipants: 'Ei osallistujia',
    requestTeam: 'Pyydä saada osallistua',
    requestTeamAgain: 'Ilmoittaudu uudelleen',
    requests: 'Ilmoittautumiset',
    cancelRequest: 'Peruuta ilmoittautuminen',
    cancelParticipation: 'Peruuta osallistuminen',
    addParticipant: 'Lisää osallistuja',
    closedTeam: 'Tiimi on suljettu. Et voi pyytää osallistumista.',
    maximumReached: 'Maksimimäärä osallistujia on jo saavutettu',
    noPermission: 'Sinulla ei ole käyttöoikeuksia osallistujien aikatauluttamiseen',
    noTeamleader: 'Käyttäjälle ei ole tiimivastaavan käyttöoikeuksia',
    alreadyTeamleader: 'Käyttäjä on jo tiimivastaava',
    openTeam: 'Avaa tiimi',
    closeTeam: 'Sulje tiimi',
    switch: 'Muokkaa vuoroa',
    existingTeamleaders: 'Tiimivastaava olemassa',
    noExistingTeamleader: 'Tiimivastaava puuttuu'
  },
  shiftReport: {
    title: 'Raportti',
    teamleader: 'Tiimivastaava',
    substituteTeamleader: 'Tiimivastaavan apulainen',
    publications: 'Julkaisut',
    occurrences: 'Tapahtumat',
    store: 'Varasto',
    experiences: 'Kokemukset',
    present: 'Läsnä',
    sick: 'Sairaana',
    missing: 'Ei paikalla',
    name: 'Nimi',
    language: 'Kieli',
    count: 'Määrä',
    action: 'Toimenpide',
    noPublications: 'Ei julkaisuja',
    select_publication: 'Valitse julkaisu',
    selectPublicationFirst: 'Valitse ensin julkaisu',
    addItem: 'Lisää tämä julkaisu',
    removeItem: 'Poista tämä julkaisu',
    texts: 'Raamatunkohdat',
    speaks: 'Keskustelut',
    videos: 'Näytety videot',
    website: 'Näytetty jw.org sivustoa',
    returnVisits: 'Uusintakäynnit',
    bibleStudies: 'Raamatuntutkistelut',
    time: 'Palvelusaika',
    trolleysFilled: 'Kärryt on täytetty',
    neatnessLast: 'Kärryjen kunto vuoron jälkeen',
    bad: 'Huono',
    normal: 'Normaali',
    good: 'Hyvä',
    yes: 'Kyllä',
    no: 'Ei',
    expRoute: 'Reitti',
    expGood: 'Kivat kokemukset',
    expProblems: 'Ongelmat / vaikeat tilanteet',
    date: 'Päivämäärä',
    toShift: 'Vuoroon',
    pages: {
      publisher: 'Julistajan sivu',
      items: 'Levitetyt julkaisut sivu',
      occurrences: 'Tapahtumat',
      store: 'Varastohuoneesta',
      experiences: 'Kokemuksesi',
      prevPage: 'Siirry edelliselle sivulle',
      nextPage: 'Siirry seuraavalle sivulle',
      finish: 'Päätä raportti'
    }
  },
  route: {
    title: 'Luo/muokkaa reittiä',
    routeMarkers: 'Reittimerkintä',
    addRouteMarkers: 'Klikkaa kartalla lisätäksesi uuden reittimerkin'
  },
  uploadUserFile: {
    title: 'Käyttäjätiedoston lataus',
    helpEncoding: 'Tiedoton tulee olla UTF-8 koodattua',
    uploadFile: 'Lataa CSV-tiedosto',
    name: 'Nimi',
    email: 'Sähköposti',
  },
  mergeAccounts: {
    title: 'Yhdistä käyttäjätilit',
    description: 'Anna sen käyttäjätunnuksen tiedot, jonka haluat yhdistää tämän käyttäjätilin käyttöoikeuksiin. Sinut kirjataan sisään yhdistettävään käyttäjätiliin välittömästi.',
    username: 'Käyttäjänimi',
    password: 'Salasana',
    merge: 'Yhdistä käyttäjätilit'
  }
}

export default modal
