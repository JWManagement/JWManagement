const pages = {
  profile: {
    name: 'My Profile',
    personalData: 'Mis detalles personales',
    changePicture: 'Editar foto...',
    options: {
      title: 'Ajustes',
      helpText: {
        mergeAccounts: 'En JW Management puedes hacer todo con solo una cuenta. Solo tienes que recordar un nombre de usuario y contraseña. Si tiene varias cuentas, haga clic en "Combinar cuentas" e ingrese las credenciales para su otra cuenta. Esto combinará los permisos de esta cuenta en la cuenta especificada.'
      }
    },
    availability: {
      title: 'Disponibilidad',
      helpText: 'Por favor marque las horas en las que está disponible.',
      shortTermCalls: 'Me pueden contactar a corto plazo',
      shortTermCallsAlways: 'Incluso si no se establezco que estoy disponible'
    },
    speaks: 'Habla',
    telefon: 'Teléfono',
    congregation: 'Congregacion',
    language: 'Idioma de la cuenta',
    languages: 'Idiomas extranjeros',
    gender: 'Genero',
    _gender: {
      brother: 'Hermano',
      sister: 'Hermana'
    },
    publisher: 'Publicador',
    privilegeOfService: 'Privilegio de servicio',
    _privilegeOfService: {
      auxiliaryPioneer: 'Precursor auxiliar',
      pioneer: 'Precursor regular',
      specialPioneer: 'Precursor especial',
      circuitOverseer: 'Superintendente de circuito',
      bethelite: 'Betelita',
      fulltimeConstructionServant: 'Siervo de construcción'
    },
    ministryPrivilege: 'Asignación de congregación',
    _ministryPrivilege: {
      ministerialServant: 'Siervo ministerial',
      elder: 'Anciano',
      coordinator: 'Coordinador de cuerpo de ancianos',
      secretary: 'Secretario',
      serviceOverseer: 'Superintendente de Servicio'
    },
    placeholder: {
      telefon: '(e.g. 407-123-4444)',
      congregation: 'Congregación',
      languages: 'Idiomas'
    },
    changePassword: 'Restablecer contraseña',
    deleteAccount: 'Borrar cuenta',
    mergeAccounts: 'Combinar cuentas',
    vacation: {
      title: 'Vacación',
      helpText: 'Añade los periodos en los que no estás disponible.'
    },
    until: 'hasta',
    addVacation: 'Añadir vación',
    deleteVacation: 'Borrar esta vacación',
    usernameTaken: 'Este nombre de usuario ya está en uso por otra persona. Por favor, elija otro.'
  },
  wiki: {
    name: 'Centro de Información',
    nameShort: 'Info',
    files: 'Archivos',
    addQuestion: 'Añade pregunta/título',
    edit: 'Editar',
    delete: 'Borrar',
    noFiles: 'No hay archivos disponibles',
    addTab: 'Añadir nueva pestaña',
    editQuestion: 'Editar esta pregunta',
    removeFaq: 'Remover esta pregunta',
    editFaq: 'Editar esta respuesta',
    changeFaq: 'Guardar esta respuesta',
    cancelFaq: 'Cancelar edición'
  },
  shifts: {
    name: 'Turnos',
    route: 'Ruta',
    addShift: 'Añadir nuevo turno',
    deleteWeek: 'Borrar la semana completa',
    addWeek: 'Añadir nueva semana',
    requests: 'Solicitudes',
    openRequests: 'Abrir solicitudes',
    automation: 'Automatico',
    template: 'Plantilla',
    noVisibleShifts: 'No hay turnos con esa etiqueta esta semana',
    start: 'Comenzar',
    end: 'Terminar',
    visibility: 'Visibilidad:',
    helpText: {
      start: 'Esta es la primera semana en ser creada por el sistema.',
      end: 'Esta es la última semana en ser creada por el sistema.',
      visibility: 'Esto define con cuántas semanas de anticipación los publicadores podrán ver y solicitar. Teniendo en cuenta la semana de inicio y la semana de finalización, el sistema creará automáticamente los turnos necesarios.'
    },
    weeks: 'semanas',
    hideNames: 'Ocultar todos los nombres en los turnos',
    showNames: 'Mostrar todos los nombres en los turnos',
    editShifts: 'Editat los turnos',
    prevWeek: 'Ir a la semana anterior',
    nextWeek: 'Ir a la semana siguiente',
    sendWeek: 'Enviar confirmaciones de todos los turnos de esta semana por correo electrónico',
    shownTag: 'Los turnos de esta etiqueta se muestran actualmente',
    hiddenTag: 'Los turnos de esta etiqueta están actualmente ocultos',
    shift: {
      tag: 'Etiqueta',
      schedule: 'Programa',
      teamleader: 'Lider de equipo',
      teams: 'Grupos',
      noTeams: 'No hay grupos',
      participants: 'Participantes',
      start: 'Comienza',
      end: 'Termina',
      requests: 'Solicitud',
      requests_plural: 'Solicitudes',
      requestsOf: 'Solicitud de',
      requestsOf_plural: 'Solicitudes de',
      teamleaders: 'LEs',
      noPermission: 'Solo un administrador de proyecto o un administrador de turnos puede editar o programar turnos.'
    }
  },
  day: {
    removeAll: 'Remover todo'
  },
  reports: {
    export: 'Exportar como CSV'
  },
  settings: {
    main: {
      title: 'Ajustes Principales',
      id: 'ID',
      name: {
        text: 'Nombre',
        placeholder: 'Nombre del proyecto',
        helpText: 'En muchos casos el nombre del proyecto es el nombre de la congregación. Para proyectos más grandes que incluyen varias congregaciones, puede ser el nombre de la ciudad donde se llevará a cabo el proyecto. Si el proyecto no organiza la predicación con los carritos, el nombre también puede reflejar lo que se organizará con este proyecto.'
      },
      news: {
        text: 'Noticias',
        placeholder: 'No hay noticias',
        helpText: 'Las noticias aparecerán en la parte superior de la descripción general del proyecto. Se puede utilizar para comunicarse con sus participantes.'
      },
      email: {
        text: 'Email',
        placeholder: 'Email del proyecto',
        helpText: 'En correos electrónicos como confirmaciones de turnos y actualizaciones de líderes de equipo, esta dirección se establecerá como la dirección Responder a, de modo que si los destinatarios responden a estos correos electrónicos, la respuesta normalmente se enviará a la bandeja de entrada de esta dirección si programa de correo electrónico del destinatario se comporta correctamente. Además, esta dirección será notificada (por ejemplo, en cancelaciones de participación a corto plazo).'
      },
      language: {
        text: 'Idioma',
        helpText: 'Si el sistema notifica a la dirección indicada arriba sobre los cambios, enviará los correos en el idioma que especifique aquí.'
      },
      deleteProject: 'Borrar proyecto'
    },
    tags: {
      title: 'Etiquetas',
      helpText: '<p>A cada turno se le debe asignar una etiqueta. Además, a cada usuario se le puede permitir o denegar el permiso para ver los turnos según las etiquetas.</p><p>Las etiquetas pueden reflejar diferentes actividades (e.g., Predicacion con Carritos, Puesto de Información, Trabajo en la Calle, etc.). La división de turnos en diferentes etiquetas puede ser útil, por ejemplo, si hay varios turnos al mismo tiempo o si solo ciertos publicadores están capacitados en un tipo específico de testificación pública.</p><p>Con cada etiqueta puede haber un conjunto de plantillas de semanas que se han definido previamente.</p>',
      id: 'ID',
      name: 'Nombre',
      img: {
        name: 'Imagen',
        helpText: 'Esta imagen se mostrará en el tablero al hacer clic en \'Turnos\'. Debe explicar el tipo de tareas realizadas en los turnos de esta etiqueta. Si desea agregar una imagen personalizada, envíenos un correo electrónico describiendo su idea a support@jwmanagement.org.'
      },
      templates: 'Plantillas',
      showTemplate: 'Editar Turnos',
      editTemplate: 'Editar nombre',
      removeTemplate: 'Borrar',
      addTemplate: 'Definir nueva plantilla',
      action: 'Accion',
      none: 'No se han añadido etiquetas aún',
      add: 'Añadir una etiqueta nueva',
      remove: 'Remover esta etiqueta'
    },
    teams: {
      title: 'Grupos',
      helpText: {
        main: 'Para cada turno debe haber al menos un equipo. Los equipos pueden representar diferentes rutas o ubicaciones. Un participante de turno siempre es miembro de uno de estos equipos.',
        picture: 'Los publicadores podrán ver esta imagen. Por lo tanto, debe dar más información para las tareas en este equipo. Por ejemplo, puede crear una ruta para este equipo en Google Maps o OpenStreetMap (el que mejor cobertura tenga de su área) y subir una imagen de eso aquí.',
        link: 'Este enlace se conectará con la imagen. Si el usuario hace clic en la imagen, será redirigido a la dirección de este enlace. Por ejemplo, puede proporcionar el enlace del mapa de Google Maps o OpenStreetMap aquí.',
        description: 'Aquí tiene la opción de establecer una descripción para este equipo. Por ejemplo podrías explicar algunas particularidades de este equipo o ruta.'
      },
      id: 'ID',
      name: 'Nombre',
      icon: 'Icono',
      picture: 'Foto',
      editPicture: 'Suba una foto para este grupo',
      noPicture: 'No se han subido fotos',
      link: 'Enlace',
      description: 'Descripción',
      action: 'Accion',
      none: 'No se han añadido grupos aún',
      add: 'Añadir un nuevo grupo',
      remove: 'Remover este grupo'
    },
    meetings: {
      title: 'Lugra de Encuentro',
      helpText: {
        main: 'Para todos los equipos de turno se puede asignar un punto de encuentro. Con eso, los equipos pueden reunirse independientemente unos de otros. Esto puede ser útil cuando la ruta o la ubicación de los equipos están tan alejadas que una reunión en común tomaría demasiado tiempo.',
        picture: 'Los publicadores podrán ver esta imagen. Por lo tanto, debe dar más información de el punto de encuentro. Por ejemplo, podrías subir una foto con el entorno de Google Maps o OpenStreetMap (el que tenga mejor cobertura de tu área).'
      },
      id: 'ID',
      name: 'Nombre',
      picture: 'Foto',
      editPicture: 'Subir una foto para este punto de encuentro',
      noPicture: 'No se ha subido una foto',
      action: 'Acción',
      none: 'No se ha añadido un punto de encuentro aún',
      add: 'Add un nuevo punto de encuentro',
      remove: 'Remover este lugar de encuentro'
    }
  }
}

export default pages
