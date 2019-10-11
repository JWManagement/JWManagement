const vessel = {
  nameShort: 'Πλοία',
  entity: {
    name: 'Όνομα του πλοίου',
    flag: 'Σημαία',
    type: 'Τύπος',
    typeValues: {
      c: 'Πλοίο μεταφοράς εμπορευματοκιβωτίων',
      ca: 'Καταμαράν',
      cr: 'Κρουαζιερόπλοιο',
      ex: 'Εκδρομικό πλοίο',
      mf: 'Φρτηγό πλοίο',
      mt: 'Δεξαμενόπλοιο',
      p: 'Πλοίο επιβατών',
      pt: 'Ταχύπλοο',
      r: 'Καράβι-ψυγείο',
      rc: 'Ποταμό κρουαζιερόπλοιο',
      f: 'Πορθμείο',
      fi: 'Αλιευτικό σκάφος',
      ro: 'Ro-Ro',
      t: 'Ρυμουλκό',
      unknown: 'Άλλο'
    },
    callsign: 'Σημείο κλήσης',
    eni: 'ENI',
    imo: 'IMO',
    mmsi: 'MMSI',
    delete: 'Διαγραφή αυτού του πλοίου',
    deleteConfirmation: 'Θέλεις πραγματικά να διαγράψεις αυτό το πλοίο;',
    visit: {
      new: 'Αποτύπωση νέας επισκέψεις',
      noElements: 'Αυτό το πλοίο δεν έχει επισκεφθεί ακόμα',
      delete: 'Διαγραφεί αυτής τις επισκέψεις',
      deleteConfirmation: 'Θέλεις πραγματικά να την διαγράψεις;',
      person: 'Ευαγγελιζόμενος',
      email: 'Email ευαγγελιζομένου',
      phone: 'Αρ.τηλ. ευαγγελιζομένου',
      isUserVisible: 'Κάνετε τα στοιχεία επαφής σας ορατά σε άλλους ευαγγελιζομένους',
      date: 'Hμερομηνία',
      dateNext: 'Επόμενη επίσκεψη το νωρίτερο',
      harbor: 'Λιμάνι',
      harborId: 'Λιμάνι',
      harborIdValues: {
        placeholder: 'Επέλεξε ένα λιμάνι'
      },
      country: 'Χώρα',
      language: {
        new: 'Προσθήκη νέας γλώσσας',
        noElements: 'Δεν υπάρχει ακόμη γλώσσα',
        methodConfirmation: 'Θέλεις πραγματικά να διαγράψεις αυτήν την γλώσσα;',
        languageIds: 'Γλώσσα',
        languageIdsValues: {
          placeholder: 'Επέλεξε μια γλώσσα'
        }
      },
      languages: 'Γλώσσες επί του σκάφους'
    }
  },
  search: {
    placeholder: 'Όνομα του πλοίου, Σημείο κλήσης, ENI, IMO ή MMSI'
  },
  details: {
    sections: {
      identification: 'Στοιχεία ταυτότητας',
      visit: 'Στοιχεία επίσκεψής'
    },
    dateFormat: 'DD/MM/YYYY'
  },
  visit: {
    details: {
      sections: {
        main: 'Στοιχεία επίσκεψής',
        language: 'Γλώσσες',
        option: 'Επιλογές'
      },
      dateFormat: 'DD/MM/YYYY'
    }
  }
}

export default vessel
