const mail = {
  footer: 'Αυτό είναι ένα αυτοματοποιημένο μήνυμα. Δεν περιμένουμε μια απάντηση.',
  link: 'Άνοιγμα JW Management',
  accountCreated: {
    subject: 'Δημιουργία νέου λογαριασμού JW Management!',
    headline: 'Καλώς ήρθες!',
    hello: 'Γεια σου',
    text1: 'Θέλουμε να σε ενημερώσουμε ότι έχουμε δημιουργήσει λογαριασμό εσένα στο JW Management. Για να συνδεθείς, πρέπει να εισαγάγεις ένα όνομα χρήστη και έναν κωδικό πρόσβασης. Απλά κάντε κλικ στο παρακάτω κουμπί.',
    text2: 'Αν έχεις κάποιο προβλήματα, επικοινώνησε μαζί μας.<br> Σας ευχόμαστε πολλή ευχαρίστηση με τη διαχείριση JW <br> Οι αδελφοί σας από το JW Management',
    button: 'Ας αρχίσουμε!'
  },
  teamCancellation: {
    subject: 'Η ομάδα ακυρώθηκε',
    headline: 'Η ομάδα έπρεπε δυστυχώς να ακυρωθεί.',
    hello: 'Γεια σου',
    text: 'Δυστυχώς, πρέπει να σε ενημερώσουμε ότι η συμμετοχή σου στην ακόλουθη ομάδα <u>ακυρώθηκε</u>: <b>{{date}}</b> της <b>{{time}}</b>.',
    missingParticipant: 'Δυστυχώς ένας συμμετέχων λείπει. Μόλις είναι διαθέσιμοι αρκετοί συμμετέχοντες, η ομάδα μπορεί να λάβει χώρα ξανά.'
  },
  confirmation: {
    subject: 'Νέος διορισμός βάρδιας',
    headline: 'Διορίστηκες!',
    hello: 'Γεια σου',
    text1: 'Διορίστηκες στην ακόλουθη βάρδια:',
    datetime: '{{date}} απο {{time}} ώρα'
  },
  declined: {
    subject: 'Η αίτησή δεν εξετάστηκε',
    headline: 'Δυστυχώς, η αίτησή δεν εξετάστηκε',
    hello: 'Γεια σου',
    text1: 'Δυστυχώς, η αίτησή σου για την ακολουθεί βάρδια δεν μπορούσε να ληφθεί υπόψη:',
    text2: 'Ευχαριστούμε για την αίτησή σου!',
    datetime: '{{date}} απο {{time}} ώρα'
  },
  reversal: {
    subject: 'Απαλλαγή από βάρδια',
    hello: 'Γεια σου',
    text1: 'Απαλλάχθηκες από την ακόλουθη βάρδια:',
    datetime: '{{date}} απο {{time}} ώρα'
  },
  teamUpdate: {
    subject: 'Η ομάδα άλλαξε',
    _changed: 'έχει αλλάξει.',
    changed: {
      participant: 'Ένας συμμετέχων',
      time: 'η ώρα',
      location: 'ο τόπος',
      leader: 'ο αρχηγός ομάδας'
    },
    hello: 'Γεια σου',
    text1: 'Αφού είστε μέλος ομάδας ή αρχηγός ομάδας, θέλουμε να σε ενημερώσουμε για αλλαγές στην ομάδα σου.',
    text2: 'Παρακάτω θα βρεις τα τρέχοντα στοιχεία της ομάδας:',
    datetime: '{{date}} απο {{time}} ώρα'
  },
  understaffed: {
    subject: 'Η ομάδα δεν έχει αρκετό προσωπικό',
    headline: 'Η ομάδα δεν έχει αρκετό προσωπικό',
    hello: 'Γεια σου',
    text1: 'η επόμενη ομάδα είναι υποπληρωμένη και χρειάζεται ένα ακόμη',
    text2: 'Παρακαλούμε δες εάν μπορείς να βοηθήσεις αυτήν την ομάδα.',
    datetime: '{{date}} απο {{time}} ώρα'
  },
  resetPassword: {
    subject: 'Επαναφορά κωδικού πρόσβασης',
    headline: 'Επαναφορά κωδικού πρόσβασης',
    text1: 'Γεια σου,<br>Κάντε κλικ στο παρακάτω κουμπί για να δώσετε έναν νέο κωδικό πρόσβασης:',
    button: 'Επαναφορά κωδικού πρόσβασης',
    text2: '<p>Συμβουλές για ασφαλή κωδικούς πρόσβασης μπορείτε να βρείτε στο g01 22. p.31 </p> <p> Εάν δεν ζήτησες την επαναφορά του κωδικού σου, διέγραψε αυτό το email.</p>'
  }
}

export default mail