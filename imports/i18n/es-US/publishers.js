const publisher = {
  entity: {
    username: 'Usuario',
    profile: {
      firstname: 'Nombre',
      lastname: 'Apellido',
      email: 'E-mail',
      telefon: 'Teléfono',
      gender: 'Género',
      genderValues: {
        m: 'Hermano',
        w: 'Hermana'
      },
      congregation: 'Congregación',
      pioneer: 'Privilegio de servicio',
      pioneerValues: {
        publisher: 'Publicador',
        auxiliary: 'Precursor auxiliar',
        regular: 'Precursor regular',
        special: 'Precursor especial',
        circuit: 'Superintendente de circuito',
        bethelite: 'Betelita',
        ldc: 'Siervo de construcción'
      },
      privilege: 'Asignación de congregación',
      privilegeValues: {
        publisher: 'Publicador',
        servant: 'Siervo ministerial',
        elder: 'Anciano',
        coordinator: 'Coordinador del cuerpo de ancianos',
        secretary: 'Secretario',
        serviceOverseer: 'Superintendente de servicio'
      },
      language: 'Idioma de la cuenta',
      shortTermCalls: 'Recibir correos cuando faltan participantes',
      shortTermCallsAlways: 'Disponible con avisos a corto plazo',
      availability: {
        new: 'Añadir un nuevo intervalo',
        noElements: 'No se ha(n) añadido intervalo(s)',
        methodConfirmation: 'Seguro que desea borrar este intervalo?',
        mondays: 'Lunes',
        tuesdays: 'Martes',
        wednesdays: 'Miércoles',
        thursdays: 'Juéves',
        fridays: 'Viernes',
        saturdays: 'Sábados',
        sundays: 'Domingos',
        start: 'Comenzar',
        startDateFormat: 'h a -',
        startValues: {
          '0': '12 am',
          '1': '1 am',
          '2': '2 am',
          '3': '3 am',
          '4': '4 am',
          '5': '5 am',
          '6': '6 am',
          '7': '7 am',
          '8': '8 am',
          '9': '9 am',
          '10': '10 am',
          '11': '11 am',
          '12': '12 pm',
          '13': '1 pm',
          '14': '2 pm',
          '15': '3 pm',
          '16': '4 pm',
          '17': '5 pm',
          '18': '6 pm',
          '19': '7 pm',
          '20': '8 pm',
          '21': '9 pm',
          '22': '10 pm',
          '23': '11 pm'
        },
        end: 'Terminar',
        endDateFormat: 'h a',
        endValues: {
          '0': '1 am',
          '1': '2 am',
          '2': '3 am',
          '3': '4 am',
          '4': '5 am',
          '5': '6 am',
          '6': '7 am',
          '7': '8 am',
          '8': '9 am',
          '9': '10 am',
          '10': '11 am',
          '11': '12 pm',
          '12': '1 pm',
          '13': '2 pm',
          '14': '3 pm',
          '15': '4 pm',
          '16': '5 pm',
          '17': '6 pm',
          '18': '7 pm',
          '19': '8 pm',
          '20': '9 pm',
          '21': '10 pm',
          '22': '11 pm',
          '23': '12 am'
        },
        wholeDay: 'Todo el día'
      },
      vacation: {
        start: 'Comenzar',
        end: 'Terminar',
        new: 'Añadir nueva vacación',
        noElements: 'No se han añadido vaciones',
        methodConfirmation: 'Seguro que desea borrar esta vacación?',
        startDateFormat: 'MM/DD/YYYY [hasta]',
        endDateFormat: 'MM/DD/YYYY'
      }
    },
    password: {
      change: 'Cambiar contraseña',
      reset: 'Enviar email para restablecer contraseña',
      resetConfirmation: 'Seguro que desea enviar al usuario un email para restablecer contraseña?',
      password: 'Entre la nueva contraseña',
      passwordRepeat: 'Entre de nuevo la nueva contraseña'
    },
    permissions: {
      permissions: 'Permisos',
      project: 'Permisos de proyecto',
      projectValues: {
        admin: 'Administrador de proyecto',
        shiftScheduler: 'Programador de turnos',
        shiftAdmin: 'Administrador de turnos',
        storeAdmin: 'Administrador de tienda',
        member: 'Miembro'
      },
      tag: {
        tag: 'Etiqueta',
        role: 'Rol',
        roleValues: {
          teamleader: 'Lider de equipo',
          substituteTeamleader: 'Auxiliar de lider de equipo',
          participant: 'Participante',
          none: 'Ninguno'
        }
      }
    },
    status: {
      lastLogin: {
        date: 'Último acceso'
      }
    },
    invite: 'Enviar invitación al proyecto',
    inviteConfirmation: 'Seguro quieres enviar al usuario una invitación al proyecto?',
    delete: 'Revocar el acceso de este usuario al proyecto',
    deleteConfirmation: 'Seguro que desea Revocar el acceso de este usuario al proyecto?'
  },
  search: {
    placeholder: 'Nombre, Apellido, E-mail, Teléfono or Nombre de usuario'
  },
  details: {
    sections: {
      identification: 'Datos de identificación',
      availability: 'Disponibilidad',
      vacations: 'Vacaciones',
      permissions: 'Permisos',
      password: 'Contraseña',
      options: 'Opciones'
    }
  },
  profile: {
    availability: {
      details: {
        sections: {
          mondays: 'Disponibilidad los Lunes',
          tuesdays: 'Disponibilidad los Martes',
          wednesdays: 'Disponibilidad los Miércoles',
          thursdays: 'Disponibilidad los Juéves',
          fridays: 'Disponibilidad los Viernes',
          saturdays: 'Disponibilidad los Sábados',
          sundays: 'Disponibilidad los Domingos'
        }
      }
    }
  },
  permissions: {
    details: {
      sections: {
        permissions: {
          project: 'Permisos de Proyecto',
          tags: 'Permisos de Etiqueta'
        }
      }
    },
    tag: {
      details: {
        sections: {
          permissions: {
            tag: 'Permiso de Etiqueta'
          }
        }
      }
    }
  }
}

export default publisher
