const vessel = {
  nameShort: 'Bateau',
  entity: {
    name: 'Nom du bateau',
    flag: 'Drapeau',
    type: 'Type',
    typeValues: {
      c: 'Porte-conteneurs',
      cr: 'Bateau de croisière',
      mf: 'Cargaison',
      mt: 'Pétrolier',
      p: 'Bateau de passagers',
      pt: 'Pushtow',
      f: 'Ferry',
      r: 'Navire frigorifique',
      rc: 'Bateau de croisière sur fleuve',
      ro: 'Ro-Ro',
      t: 'Remorqueur',
      unknown: 'Inconnu'
    },
    callsign: 'Signe d\'appel',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Supprimer ce bateau',
    deleteConfirmation: 'Voulez-vous vraiment supprimer ce bateau',
    visit: {
      new: 'Ajoutez une nouvelle visite',
      noElements: 'Ce bateau n\'a pas encore été visité',
      delete: 'Supprimez cette visite?',
      deleteConfirmation: 'Voulez-vous vraiment supprimer cette nouvelle visite?',
      person: 'Proclamateur',
      email: 'Adresse E-mail du proclamateur',
      phone: 'Numéro de téléphone du proclamateur',
      isUserVisible: 'Rendre vos données de contact visibles pour d\'autres proclamateurs?',
      date: 'Date',
      dateNext: 'Prochaine visite de préférence après',
      harbor: 'Port',
      harborId: 'Port',
      country: 'Pays',
      language: {
        new: 'Ajoutez une langue',
        noElements: 'Aucune langue notée pour l\'instant',
        methodConfirmation: 'Voulez-vous vraiment supprimer cette langue?',
        languageIds: 'Langue',
        languageIdsValues: {
          placeholder: 'Sélectionnez une langue'
        }
      },
      languages: 'Langues à bord'
    }
  },
  search: {
    placeholder: 'Nom du navire, indicatif d\'appel, ENI, IMO ou MMSI'
  },
  details: {
    sections: {
      identification: 'Données d\'identification',
      visit: 'Données de visite'
    },
    dateFormat: 'DD/MM/YYYY'
  },
  visit: {
    details: {
      sections: {
        main: 'Données de visite',
        language: 'Données linguistiques',
        option: 'Options'
      },
      dateFormat: 'DD/MM/YYYY'
    }
  }
}

export default vessel
