const authentication = {
  signIn: {
    name: 'Iniciar sesion',
    text: 'Por favor entra los detalles de tu cuenta para iniciar sesion',
    forgot: 'Olvide mi nombre de usario o contraseña',
    create: 'No tengo una cuenta'
  },
  signUp: {
    name: 'Crear cuenta',
    text: '<p>Le gustaria probar esta plataforma y manejar su propio projecto?<p></p>Solo entre sus detalles abajo para crear una cuenta.</p>',
    bySigningYouAgreeTo: 'Al crear una cuenta, usted acepta nuestros',
    terms: 'terminos de uso',
    andOur: 'y nuestra',
    privacyPolicy: 'politica de privacidad',
    signIn: 'Ya tengo una cuenta'
  },
  forgotPassword: {
    name: 'Olvide nombre de usuario o contraseña',
    text: 'Por favor entre su correo electronico. Le enviaremos un enlace para que restablezca su contraseña. El enlace lo iniciara automaticamente y entonces podra buscar su nombre de usuario.',
    button: 'Envie el enlace para restablecer su contraseña',
    back: 'Regresar para Iniciar Sesion',
    noUserForThisEmail: 'No se encontro una cuenta con ese correo electronico',
    multipleAccountsForThisEmail: 'Existen varias cuentas con ese correo electronico. Por favor especifique el usuario.',
    emailMissing: 'Falta el correo electronico ',
    mailSent: 'Recibira un correo electronico en breve. Siga el enlace en el correo para restablecer la contraseña.'
  },
  resetPassword: {
    name: 'Restablecer la contraseña',
    text: 'Por favor entre el nuevo password para {{0}}.',
    noUserFound: '<p>Este enlace no es valido.</p><p>Solicite otro correo de restablecimiento de contraseña.</p>',
    button: 'Cambie contraseña',
    back: 'Regresar para iniciar sesion'
  },
  firstLogin: {
    name: 'Bienvenido',
    text: '<p>Estamos felices de darles la bienvenida.</p><p>Por favor establezca su nombre de usuario y contraseña. De ahora en adelante necesitara usar estos para confirmar que es usted el que esta usando el sistema.</p><p>Despues de esto puede comenzar a usar JW Management.</p><p>Enjoy!</p>',
    agreeTerms: 'Estoy de acuerdo con los <a href="/en/terms" target="blank">terminos de uso</a> y la <a href="/de/privacy" target="blank">politica de privacidad</a>',
    button: 'Adelante!',
    tokenError: 'Enlace vencido. Este ya no es valido. Por favor pida un nuevo correo electronico o trate de restablecer su contraseña.',
    plainTextToken: 'Parece que su cliente de correo electronico no no admite correos en HTML. Por favor abra el correo con un cliente de correos electronicos moderno para tener acceso al enlace completo.',
    tokenMissing: 'Enlace invalido. Por favor acceda al enlace desde el correo electronico.',
    usernameExists: 'Este nombre de usuario ya esta en uso. Por favor seleccione otro.',
    usernameMissing: 'Por favor provea un nombre de usuario.',
    usernameCannotBeEmail: 'Lo sentimos, el nombre de usuario no puede ser un correo electronico. Por favor seleccione un nombre de usuario diferente.',
    agreeTermsMissing: 'Por favor acepte los terminos de usuario y politica de privacidad.',
    buttonCreateAccount: 'Necesito crear una cuenta',
    buttonHaveAccount: 'Ya tengo una cuenta'
  }
}

export default authentication
