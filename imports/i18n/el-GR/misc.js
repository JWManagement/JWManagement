const misc = {
  input: {
    username: 'Όνομα Χρήστη',
    usernameOrEmail: 'Όνομα χρήστη ή email',
    firstname: 'Όνομα',
    lastname: 'Επώνυμο',
    email: 'Email',
    telefon: 'Αρ.τηλ.',
    congregation: 'Εκκλησία',
    languages: 'Ξένες γλώσσες',
    gender: 'Φύλο',
    privilegeOfService: 'Προνόμιο υπηρεσίας',
    privilegeOfMinistry: 'Εκκλησιαστική διορισμοί',
    password: 'Κωδικός Πρόσβασης',
    passwordRepeat: 'Επαν. Κωδικού Πρόσβασης',
    newPassword: 'Νέος Κωδικός Πρόσβασης',
    newPasswordRepeat: 'Επαν. νέου Κωδικού Πρόσβασης'
  },
  role: {
    role: 'Ρόλος',
    admin: 'Διευθυντής έργου',
    shiftScheduler: 'Υπεύθυνος για την οργάνωση της βάρδιας',
    shiftAdmin: 'Υπεύθυνος της βάρδιας',
    storeAdmin: 'Υπεύθυνος της αποθήκης',
    member: 'Συμμέτοχος',
    teamleader: 'Αρχηγός ομάδας',
    substituteTeamleader: 'Αναπληρωτής αρχηγός ομάδας',
    participant: 'Συμμέτοχος',
    nothing: 'Tίποτα',
    noPermission: 'Χωρίς δικαιώματα'
  },
  permissions: {
    notAdmin: 'Αυτός ο χρήστης δεν είνα Διευθυντής του έργου',
    notShiftScheduler: 'Αυτός ο χρήστης δεν είνα Υπεύθυνος για την οργάνωση της βάρδιας',
    notShiftAdmin: 'Αυτός ο χρήστης δεν είνα Υπεύθυνος της βάρδιας',
    notStoreAdmin: 'Αυτός ο χρήστης δεν είνα Υπεύθυνος της αποθήκης',
    notProjectParticipant: 'Αυτός ο χρήστης δεν συμμετέχει σε αυτό το έργο',
    notTeamleader: 'Αυτός ο χρήστης δεν είνα Αρχηγός ομάδας',
    notTagParticipant: 'Ο χρήστης δεν διαθέτει τα δικαιώματα συμμετοχής σε βάρδιας αυτής της κατηγορίας',
    notTeamParticipant: 'Αυτός ο χρήστης δεν είνα συμμέτοχος της ομάδας'
  },
  time: {
    start: 'Αρχή',
    end: 'Τέλος',
    suffix: 'ώρα',
    years: 'Έτη',
    to: 'μέχρι'
  },
  scheduling: {
    name: 'Ταξινόμηση',
    direct: 'Άμεση αυτόματη επιβεβαίωση',
    manual: 'Mη αυτόματη επιβεβαίωση'
  },
  password: {
    tooShort: 'Ο κωδικός πρόσβασης πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες',
    notMatching: 'Οι κωδικοί πρόσβασης δεν ταιριάζουν'
  },
  weekdays: {
    mo: 'Δευτέρα',
    tu: 'Τρίτη',
    we: 'Τετάρτη',
    th: 'Πέμπτη',
    fr: 'Παρασκευή',
    sa: 'Σάββατο',
    su: 'Κυριακή'
  },
  intervals: {
    m: 'Mη αυτόματα',
    every: 'Κάθε εβδομάδα',
    even: 'Κάθε ζυγοί εβδομάδα',
    odd: 'Κάθε άνιση εβδομάδα'
  },
  privileges: {
    auxiliary: 'Βοηθητικός σκαπανέας',
    regular: 'Σκαπανέας',
    special: 'Ειδικός σκαπανέας',
    circuit: 'Επίσκοπος περιοχής',
    bethelite: 'Μπεθελίτις',
    ldc: 'LDC Εθελοντής οικοδόμησης',
    coordinator: 'Συντονιστής',
    secretary: 'Γραμματέας',
    serviceOverseer: 'Επίσκοπος υπηρεσίας',
    elder: 'Πρεσβύτερος',
    servant: 'Διακονικός υπηρέτης',
    publisher: 'Ευαγγελιζόμενος'
  },
  period: {
    d: 'T',
    w: 'W',
    '4w': '4W'
  }
}

export default misc
