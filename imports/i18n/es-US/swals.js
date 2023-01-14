const swal = {
  error: 'Error',
  publisherInOtherTeam: 'Uno de los publicadores seleccionados ya forma parte de otro equipo. Por favor, elimínelos de allí primero.',
  onlyTeam: 'No puedes eliminar este equipo. Es el único equipo en este turno. Cada turno debe tener al menos un equipo.',
  noTeamleader: 'Cada equipo requiere un líder de equipo. Lamentablemente, este publicador no tiene permiso para servir como líder de equipo.',
  ownPermission: 'No se le permite revocar sus propios permisos. Otro administrador tiene que hacer eso.',
  approvalInformed: 'Este participante ha sido informado de que su solicitud ha sido aprobada.',
  declinementInformed: 'Este participante ha sido informado de que su solicitud fue rechazada.',
  vacationEndInPast: 'La fecha de finalización no puede estar en el pasado.',
  missingTag: 'Sin etiqueta definida. Primero defina una etiqueta en Admin > Ajustes',
  logout: {
    title: 'Hint',
    text: 'No es necesario cerrar la sesión a menos que esté en una computadora compartida. Su conexión está encriptada y la información de la sesión solo se almacena en su navegador local. Nadie más puede ver o secuestrar tu sesión.',
    confirm: 'Cerrar sesión',
    cancel: 'Cancelar'
  },
  invite: {
    user: {
      title: 'Invitar Publicador?',
      text: 'Este publicador <b>ya tiene una cuenta</b>, por lo que no es necesario crear más cuentas. En cambio el publicador <b>simplemente recibirá permiso para acceder a este proyecto</b>.<br>Claro <b>le dejaremos saber</b> de este cambio. <br><p>En caso de que más de un publicador se haya registrado con la misma dirección de correo electrónico, elija el correcto:</p>'
    },
    users: {
      title: 'Está seguro?',
      text: 'Le enviaremos un email a todos los publicadores seleccionados.',
      confirm: 'Invitar',
      cancel: 'Cancelar'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Está seguro?',
      text: 'Todos los publicadores aprobados recibirán un correo electrónico de confirmación y todos los publicadores rechazados recibirán un correo electrónico de rechazo.',
      confirm: 'Sí',
      cancel: 'Cancelar'
    },
    confirmation: {
      title: 'Informar al Publicador?',
      text: 'El publicador será informado por correo electrónico sobre la aprobación de este turno.',
      confirm: 'Sí',
      cancel: 'Cancelar'
    },
    declined: {
      title: 'Informar al Publicador?',
      text: 'El publicador será informado por correo electrónico sobre la cancelación de este turno.',
      confirm: 'Sí',
      cancel: 'Cancelar'
    },
    selectTag: {
      title: 'Cuál Etiqueta?',
      text: 'Por favor, seleccione la etiqueta para la que le gustaría enviar correos electrónicos de confirmación:',
      confirm: 'OK',
      cancel: 'Cancelar'
    },
    teamUpdate: {
      user: {
        title: 'El Lider de euipo fue informado',
        text: 'El líder del equipo ya ha sido informado. ¿Quieres enviarle un correo electrónico con esta actualización?',
        confirm: 'Sí',
        cancel: 'No'
      },
      general: {
        title: 'Está seguro?',
        text: 'Los publicadores ya informados recibirán un correo electrónico con la información actualizada sobre el equipo.',
        confirm: 'Sí',
        cancel: 'No'
      }
    },
    understaffed: {
      title: 'Informar a los publicadores?',
      text: '¿Informar a todos los publicadores sobre este equipo con pocos participantes?',
      confirm: 'Sí',
      cancel: 'No',
      teamleader: {
        title: 'Informar a los líderes de equipo?',
        text: 'Informar a todos los lideres de equipo sobre este grupo?',
        confirm: 'Sí',
        cancel: 'No'
      }
    }
  },
  add: {
    meeting: {
      title: 'Añadir lugar de encuentro',
      text: '',
      placeholder: 'Nombre',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    },
    question: {
      title: 'Añadir una nueva pregunta/título',
      text: '',
      placeholder: 'Pregunta/Título',
      inputError: 'Necesitas escribir algo!',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    },
    tab: {
      title: 'Añadir una nueva pestaña',
      text: '',
      placeholder: 'Título',
      inputError: 'Nombre de pestaña inválido!',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    },
    tag: {
      title: 'Añadir una nueva Etiqueta',
      text: '',
      placeholder: 'Nombre',
      inputError: 'Nombre de etiqueta inválido!',
      confirm: 'Crear',
      cancel: 'Cancelar'
    },
    team: {
      title: 'Añadir un nuevo grupo',
      text: '',
      placeholder: 'Nombre',
      inputError: 'Nombre de grupo inválido!',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Añadir plantilla',
      text: '',
      placeholder: 'Nombre',
      inputError: 'Nombre de plantilla inválido!',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    },
    user: {
      title: 'Creado!',
      text: 'El Usuario fue creado.'
    },
    users: {
      title: 'Está seguro?',
      text: 'Todos los publicadores mostrados se agregarán al proyecto.',
      confirm: 'Añadir',
      cancel: 'Cancelar'
    }
  },
  update: {
    file: {
      title: 'Cambiar nombre de archivo',
      text: '',
      placeholder: 'Archivo',
      inputError: 'Nombre de archivo inválido!',
      confirm: 'Cambiar',
      cancel: 'Cancelar'
    },
    password: {
      title: 'Cambiar contraseña',
      passwordOld: 'Vieja contraseña',
      passwordNew1: 'Nueva contraseña',
      passwordNew2: 'Repita nueva contraseña',
      confirm: 'Cambiar',
      cancel: 'Cancelar',
      passwordChanged: 'Contraseña cambiada'
    },
    question: {
      title: 'Cambiar Pregunta',
      text: '',
      placeholder: 'Pregunta/Título',
      confirm: 'Cambiar',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Editar nombre',
      text: '',
      placeholder: 'Nombre',
      confirm: 'Cambiar',
      cancel: 'Cancelar'
    }
  },
  delete: {
    account: {
      title: 'Realmente deseas borrar tu cuenta?',
      text: 'La cuenta será eliminada de forma irreversible!',
      confirm: 'Borrar mi cuenta!',
      cancel: 'Cancelar'
    },
    allShifts: {
      title: 'Está seguro?',
      text: 'Todos los turnos de este día y todas las solicitudes de estos turnos se eliminarán de forma irreversible.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    file: {
      title: 'Está seguro?',
      text: 'El archivo se borrará de forma permanente.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    language: {
      title: 'Seguro desea borrar este idioma?',
      text: 'Esto borrará el idioma con su stock.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    meeting: {
      title: 'Seguro desea borrar este lugar de encuentro?',
      text: 'El punto de encuentro también se eliminará de todos los turnos existentes planificados para el futuro.',
      checkInput: 'borrar',
      placeholder: 'Por favor escriba "{{0}}" para su aprobación',
      inputError: 'La entrada no coincidió con "{{0}}"',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    note: {
      title: 'Seguro desea borrar esta nota?',
      text: 'La nota se borrará de forma permanente.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    project: {
      title: 'Seguro desea borrar este proyecto?',
      text: 'Esto eliminará irreversiblemente todas las configuraciones asociadas con este proyecto (por ejemplo, turnos, informes, solicitudes, literatura). Solo permanecerán las cuentas de usuario.',
      checkInput: 'borrar este proyecto',
      placeholder: 'Escriba "{{0}}" para su aprobación',
      inputError: 'La entrada no coincidió con "{{0}}"',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    publication: {
      title: '¿Quitar esta publicación de tu tienda?',
      text: 'Perderá todos los datos almacenados para esta publicación.',
      confirm: 'Removeer',
      cancel: 'Cancelar'
    },
    question: {
      title: 'Esta seguro?',
      text: 'Esto eliminará irreversiblemente la pregunta y su respuesta.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    shift: {
      title: '¿Seguro desea borrar este turno?',
      text: 'Todas las solicitudes para este turno serán removidas.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    store: {
      title: 'Seguro desea restablecer el almacén?',
      text: 'Esto borrará todas las publicaciones añadidas.',
      confirm: 'Reestablecer',
      cancel: 'Cancelar'
    },
    tab: {
      title: 'Esta seguro?',
      text: 'Se eliminará toda la pestaña con todas las preguntas.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    tag: {
      title: 'Seguro desea borrar la etiqueta?',
      text: 'Todos los turnos pertenecientes a esta etiqueta también serán eliminados. Esto incluye todas las solicitudes para estos turnos. <br><br> Para confirmar, escriba "borrar".',
      checkInput: 'borrar',
      placeholder: 'Por favor escriba "{{0}}" para aprobar',
      inputError: 'La entrada no coincidió con "{{0}}"',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    team: {
      title: 'Seguro desea borrar este grupo?',
      text: 'El equipo será eliminado de todos los turnos existentes planificados para el futuro. Las solicitudes aprobadas para estos turnos se reasignarán a otros equipos. <br><br> Para confirmar, escriba "borrar".',
      checkInput: 'borrar',
      placeholder: 'Por favor escriba "{{0}}" para aprobar',
      inputError: 'La entrad no coincidió con "{{0}}"',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    template: {
      title: 'Seguro desea borrar la plantilla?',
      text: '',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    user: {
      title: 'Seguro desea borra este usuario?',
      text: 'Se revocarán todos los permisos del proyecto.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    },
    wholeWeek: {
      title: 'Seguro que desea borra toda la semana?',
      text: 'También se eliminarán todos los turnos de esta semana.',
      confirm: 'Borrar',
      cancel: 'Cancelar'
    }
  },
  request: {
    approve: {
      title: 'Seguro desea aprobar al publicador?',
      text: 'Este publicador ha sido rechazado previamente. Asegúrese de que el publicador aún pueda y esté dispuesto a participar.',
      confirm: 'Sí',
      cancel: 'No'
    },
    cancel: {
      title: 'Está seguro?',
      text: 'El equipo será eliminado si eres el último participante.',
      confirm: 'Sí, cancela mi participación',
      cancel: 'No'
    },
    decline: {
      title: 'Seguro desea rechazar el participante?',
      text: 'Si el participante ya está informado, recibirá un correo electrónico de reversión.',
      confirm: 'Sí',
      cancel: 'No'
    },
    maxReached: {
      title: 'Demasiados usuarios seleccionados',
      text: '¿Establecer el límite máximo del equipo de {{0}} a {{1}} y aprobar seleccionado?',
      confirm: 'Aprobar seleccionado',
      cancel: 'Cancelar'
    },
    minNotReached: {
      title: 'No hay suficientes usuarios seleccionados',
      text: '¿Establecer el límite mínimo del equipo de {{0}} a {{1}} y aprobar seleccionado?',
      confirm: 'Aprobar seleccionado',
      cancel: 'Cancelar'
    },
    minReached: {
      title: 'Seguro desea rechazar el participante?',
      text: 'Se ha alcanzado el límite mínimo de este equipo. Si rechaza a este usuario, el sistema eliminará este equipo.',
      confirm: 'Remover equipo',
      cancel: 'No'
    },
    noNewTeamleader: {
      title: 'Seguro desea rechazar el participante?',
      text: 'Desafortunadamente, no hay otro líder de equipo posible en este equipo. Si rechaza a este usuario, el sistema eliminará este equipo.',
      confirm: 'Remover equipo',
      cancel: 'No'
    }
  }
}

export default swal
