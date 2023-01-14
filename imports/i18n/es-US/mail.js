const mail = {
  footer: 'Esto es un correo automatico. No esperamos respuesta.',
  link: 'Abre JW Management',
  accountCreated: {
    subject: 'Cuenta creada en JW Management!',
    headline: 'Bienvenido!',
    hello: 'Hola',
    text1: 'Nos gustaría informarle que hemos creado una cuenta para usted en JW Management. Puede configurar su nombre de usuario y contraseña personal haciendo clic en el botón de abajo.',
    text2: 'En caso de problemas, no dude en ponerse en contacto con nosotros.<br>Esperamos que disfrute usando JW Management.<br>Tus hermanos de JW Management',
    button: 'Vamos!'
  },
  teamCancellation: {
    subject: 'Equipo cancelado',
    headline: 'Equipo ha sido cancelado.',
    hello: 'Hola',
    text: 'Desafortunadamente su asignación de equipo en <b>{{date}}</b> at <b>{{time}}</b> ha sido <u>cancelado</u>.',
    missingParticipant: 'No hay suficientes participantes. Si se unen suficientes participantes, la asignación puede tener lugar de nuevo.'
  },
  confirmation: {
    subject: 'Nuevas Solicitudes Aprobadas',
    headline: 'Tu Solicitud fue Aprobada!',
    hello: 'Hola',
    text1: 'Tu solicitud para el siguiente turno fue aprobada:',
    datetime: '{{date}} from {{time}} en punto'
  },
  declined: {
    subject: 'Solicitud no considerada',
    headline: 'Solicitud no fue considerada',
    hello: 'Hola',
    text1: 'Desafortunadamente, su solicitud para el siguiente turno no pudo ser considerada:',
    text2: 'Muchas gracias por su solicitud!',
    datetime: '{{date}} from {{time}} en punto'
  },
  reversal: {
    subject: 'Removido',
    hello: 'Hola',
    text1: 'Usted ha sido removido del siguiente equipo:',
    datetime: '{{date}} from {{time}} en punto'
  },
  teamUpdate: {
    subject: 'Equipo cambiado',
    _changed: 'cambiado.',
    changed: {
      participant: 'Un participante',
      time: 'La hora',
      location: 'El lugar',
      leader: 'El Lider de Equipo'
    },
    hello: 'Hola',
    text1: 'Está marcado como miembro o líder del equipo, por lo que nos gustaría informarle sobre los cambios en su equipo..',
    text2: 'Aquí está la configuración actual del equipo',
    datetime: '{{date}} from {{time}} en punto'
  },
  understaffed: {
    subject: 'Equipo con pocos particpantes',
    headline: 'Equipo le faltan participantes',
    hello: 'Hola',
    text1: 'El siguiente Equipo tiene pocos participantes y necesita',
    text2: 'Por favor, verifica si puedes ayudar.',
    datetime: '{{date}} from {{time}} en punto'
  },
  resetPassword: {
    subject: 'Restablece contraseña',
    headline: 'Restablece tu contraseña',
    text1: 'Hola,<br>Haga clic en el siguiente botón para establecer una nueva contraseña:',
    button: 'Restablecer la contraseña',
    text2: '<p>Puede encontrar consejos útiles para crear una contraseña segura en <a href="https://wol.jw.org/en/wol/d/r1/lp-e/102001451">g01 6/22 p. 31</a></p><p>Si no solicitó un restablecimiento de contraseña, no dude en eliminar este correo electrónico.</p>'
  }
}

export default mail
