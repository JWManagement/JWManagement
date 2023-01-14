const modal = {
  close: 'Cerrar',
  addParticipant: {
    title: 'Añadir participante',
    description: 'Elija los publicaodres que desea agregar a este equipo.',
    search: 'Buscar un publicador',
    addAsRequests: 'Añadir como solicitud',
    addAsParticipants: 'Añadir como participantes'
  },
  addVessel: {
    title: 'Añadir Barco',
    action: 'Añadir Barco'
  },
  addWeek: {
    title: 'Crear nueva semana',
    noTemplate: 'Por favor defina primero una plantilla',
    defineTemplate: 'Defina plantilla',
    action: 'Crear semana',
    text: {
      top: 'Elija una semana a la que se aplicará la plantilla de semana:',
      bottom: 'Elige la plantilla semana:'
    }
  },
  cancelTeam: {
    title: 'Cancelar equipo',
    text: 'Describa por qué este equipo tiene que ser cancelado. Todos los participantes recibirán este mensaje a través del correo de cancelación.',
    action: 'Cancelar equipo'
  },
  copyShift: {
    title: 'Copiar turno',
    text: 'Simplemente seleccione los días a los que desea copiar este turno.',
    action: 'Copiar turno'
  },
  editShift: {
    title: 'Editar información de turno',
    mainData: 'Detalles principales',
    tag: 'Etiqueta',
    team: 'Equipo',
    teams: 'Equipos asignados a este turno',
    helpText: {
      tag: 'Establezca esta etiqueta de turno. Todos los usuarios con permisos en esta etiqueta pueden ver el turno.',
      scheduling: '\'Aprobar inmediatamente\' las solicitudes se aprobarán automáticamente cuando se alcance el límite mínimo de participantes para el siguiente equipo.'
    },
    addTeam: 'Añadir un nuevo equipo',
    teamMin: 'Minimo de participantes:',
    teamMax: 'Maximo de participantes:',
    teamStart: 'Comienza:',
    teamEnd: 'Termina:',
    teamPlace: 'Lugar:',
    removeTeam: 'Remover este equipo',
    noMeeting: 'Sin reunion',
    action: 'Accion:',
    delete: 'Borrar',
    switch: 'Planificar turno',
    copyShift: 'Copiar turno'
  },
  editTeamPicture: {
    title: 'Cambiar foto de equipo',
    currentPicture: 'Foto actual:',
    hints: 'Esta foto probablemente se mostrará más grande para el publicador.',
    noPictureUploaded: 'Aún no has subido ninguna foto',
    upload: 'Subir',
    delete: 'Borrar'
  },
  editMeetingPicture: {
    title: 'Cambiar foto del punto de reunión',
    currentPicture: 'Fot Actual:',
    hints: 'Esta foto probablemente se mostrará más grande para el publicador.',
    noPictureUploaded: 'Aún no has subido ninguna foto',
    upload: 'Subir',
    delete: 'Borrar'
  },
  editVessel: {
    title: 'Editar Barco',
    action: 'Guardar cambios'
  },
  inviteUser: {
    title: 'Invitar nuevos publicadores',
    key: '<span class="text-warning">Nombres en color naranja</span> significa que el usuario ya está invitado.',
    selectAll: 'Selecciona todo',
    noUsers: 'No se encontraron nuevos publicadores',
    invite: 'Invitar'
  },
  position: {
    title: 'Marcar la posición con el botón izquierdo del ratón'
  },
  shift: {
    clickToEnlarge: 'Haga click en la imagen para aumentar su tamaño',
    openLink: 'Ver información vinculada',
    meetingAt: 'Punto de encuentro en',
    collapseTeam: 'Ocultar información del equipo y puntos de encuentro',
    expandTeam: 'Ampliar información del equipo y puntos de encuentro',
    noParticipants: 'Sin participantes',
    requestTeam: 'Solicitar participación',
    requestTeamAgain: 'Solicitar participación de nuevo',
    requests: 'Solicitudes',
    cancelTeam: 'Cancelar equipo',
    cancelRequest: 'Cancelar equipo',
    cancelParticipation: 'Cancelar participación',
    addParticipant: 'Añadir participantes',
    closedTeam: 'Este equipo esta cerrado. No puede solicitar participación.',
    maximumReached: 'Ya se ha alcanzado el límite máximo de participantes del equipo',
    noPermission: 'No tienes permiso para programar usuarios',
    noTeamleader: 'Este usuario no tiene permiso para ser un líder de equipo',
    alreadyTeamleader: 'Este usuario ya es líder de equipo',
    openTeam: 'Abrir equipo',
    closeTeam: 'Cerrar equipo',
    sendUnderstaffed: 'Enviar correo sin suficientes participantes',
    switch: 'Editar turno',
    existingTeamleaders: 'Existe Lider de equipo',
    noExistingTeamleader: 'Falta Lider de equipo',
    notTeamleader: 'Sin lider de equipo',
    selected: 'Seleccionado:',
    of: 'de',
    approveSelected: 'Aprobar seleccionado',
    declineSelected: 'Rechazar seleccionado',
    removeSelected: 'Remover seleccionado',
    report: 'Reporte'
  },
  shiftReport: {
    title: 'Reporte',
    teamleader: 'Lider de Equipo',
    substituteTeamleader: 'Auxiliar de lider de equipo',
    publications: 'Publicaciones',
    occurrences: 'Ocurrencias',
    store: 'Tienda',
    experiences: 'Experiencias',
    present: 'Presente',
    sick: 'Enfermo',
    missing: 'Falta',
    name: 'Nombre',
    language: 'Idioma',
    count: 'Cuenta',
    action: 'Accion',
    noPublications: 'No publicaciones aqui',
    select_publication: 'Seleccionar una publicacion',
    selectPublicationFirst: 'Por favor seleccione una publicacion primero',
    plusIconReminder: 'No olvides hacer clic en el ícono más',
    addItem: 'Añadir esta publicacion',
    removeItem: 'Remover esta publicacion',
    texts: 'Textos bíblicos',
    speaks: 'Conversaciones',
    videos: 'Videos mostrados',
    website: 'Pagina de internet mostrada',
    returnVisits: 'Revisitas',
    bibleStudies: 'Cursos bíblicos',
    time: 'Horas de Servicio',
    trolleysFilled: 'Carrito fue reabastecido',
    neatnessLast: 'Condicion del carrito despes de ultimo turno',
    bad: 'Mal',
    normal: 'Normal',
    good: 'Bueno',
    yes: 'Si',
    no: 'No',
    expRoute: 'Ruta',
    expGood: 'Buenas experiencias',
    expProblems: 'Problemas / Dificultadess',
    date: 'Fecha',
    toShift: 'Para el turno',
    pages: {
      publisher: 'Pagina del publicador',
      items: 'Pagina de publicaciones colocadas',
      occurrences: 'Ocurrencias sucedidaa',
      store: 'Acerca del alamcen de publicaciones',
      experiences: 'Tus experiencias',
      prevPage: 'Ir a la página anterior',
      nextPage: 'Ir a la próxima página',
      finish: 'Terminar este reporte'
    }
  },
  route: {
    title: 'Crear/editar ruta',
    routeMarkers: 'Marcador de ruta',
    addRouteMarkers: 'Haz clic en el mapa para añadir un nevo marcador de ruta'
  },
  uploadUserFile: {
    title: 'Carga de archivos de usuario',
    helpText: 'Orden la data personal (* campos requeridos): <br> Email*, Primer nombre*, Apellido*, Genero(m or w)*, Telefono, Privilegio de servicio (\'publicador\', \'auxiliar\', \'regular\', \'special\', \'circuit\', \'betelita\' o \'ldc\'), Privilegio de congregación (\'publicador\', \'ministerial\', \'anciano\', \'coordinador\', \'secretario\' o \'supServicio\'), Congregacion, Idioma de la cuenta (\'en-US\', \'en-GB\', \'de\', ...), Idiomas extranjeros que habla (e.g. \'Aleman, Frances\'), Roles (ver exportación de usuario para un ejemplo)',
    helpEncoding: 'El archivo debe estar codificado en UTF-8 para admitir todos los caracteres',
    uploadFile: 'Subir archivo CSV',
    new: 'Nuevos Publicadores',
    existing: 'Publicadores con cuenta JW Management',
    name: 'Nombre',
    email: 'Email',
    add: 'Añadir Usuario'
  },
  mergeAccounts: {
    title: 'Fusionar cuentas',
    description: 'Ingrese las credenciales de la cuenta en la que desea fusionar los permisos de esta cuenta. Se iniciará sesión en esa cuenta de inmediato.',
    username: 'Usuario',
    password: 'Contraseña',
    merge: 'Fusionar cuentas'
  }
}

export default modal
