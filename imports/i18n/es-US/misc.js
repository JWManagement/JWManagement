const misc = {
  input: {
    username: 'Usuario',
    usernameOrEmail: 'Usuario o direccion de correo electronico',
    firstname: 'Primer nombre',
    lastname: 'Apellido',
    email: 'Direccion de correo electronico',
    telefon: 'Telefono',
    congregation: 'Congregacion',
    languages: 'Idiomas',
    gender: 'Genero',
    privilegeOfService: 'Privilegios de Servicio',
    privilegeOfMinistry: 'Asignacion de Congregacion',
    password: 'Contraseña',
    passwordRepeat: 'Repita contraseña',
    newPassword: 'Nueva contraseña',
    newPasswordRepeat: 'Repita nueva contraseña'
  },
  role: {
    role: 'Rol',
    admin: 'Administrador de Proyecto',
    shiftScheduler: 'Programador de turnos',
    shiftAdmin: 'Administrador de turnos',
    storeAdmin: 'Administrador de tienda',
    member: 'Miembro',
    teamleader: 'Lider de Equipo',
    substituteTeamleader: 'Auxiliar de lider de equipo',
    participant: 'Participante',
    nothing: 'Ninguno',
    noPermission: 'Sin autorizacion'
  },
  permissions: {
    notAdmin: 'Este usuario no es un administrador de proyecto',
    notShiftScheduler: 'Este usuario no es un programador de turnos',
    notShiftAdmin: 'Este usuario no es un administrador de turnos',
    notStoreAdmin: 'Este usuario no es administrador de una tienda',
    notProjectParticipant: 'Este usuario no participa en el proyecto dado',
    notTeamleader: 'Este usuario no es un lider de equipo',
    notTagParticipant: 'Este usuario no puede participar en este turno porque no tiene permisos para la etiqueta de este turno.',
    notTeamParticipant: 'Este usuario no está participando en el equipo dado'
  },
  time: {
    start: 'Comienza',
    end: 'Termina',
    suffix: 'horas',
    years: 'años',
    to: 'para'
  },
  scheduling: {
    name: 'Planificación',
    direct: 'Aprobar inmediatamente',
    manual: 'Aprobar manualmente'
  },
  password: {
    tooShort: 'La contraseña debe tener al menos 8 caracteres',
    notMatching: 'las contraseñas no coinciden!'
  },
  weekdays: {
    mo: 'Lunes',
    tu: 'Martes',
    we: 'Miércoles',
    th: 'Juéves',
    fr: 'Viernes',
    sa: 'Sábado',
    su: 'Domingo'
  },
  intervals: {
    m: 'Manualmente',
    every: 'Toda la semana',
    even: 'Cada dos semanas (par)',
    odd: 'Una semana si y una no (impar)'
  },
  privileges: {
    auxiliary: 'PA',
    regular: 'PR',
    special: 'PS',
    circuit: 'CO',
    bethelite: 'BT',
    ldc: 'LDC',
    coordinator: 'CBE',
    secretary: 'SEC',
    serviceOverseer: 'SO',
    elder: 'A',
    servant: 'S',
    publisher: 'P'
  },
  period: {
    d: 'D',
    w: 'W',
    '4w': '4W'
  }
}

export default misc
