const publisher = {
  entity: {
    username: 'Nome de utilizador',
    profile: {
      firstname: 'Nome',
      lastname: 'Apelido',
      email: 'Email',
      telefon: 'Telefone',
      gender: 'Sexo',
      genderValues: {
        m: 'Irmão',
        w: 'Irmã'
      },
      congregation: 'Congregação',
      pioneer: 'Privilégio do serviço',
      pioneerValues: {
        publisher: 'Publicador',
        auxiliary: 'Pioneiro auxiliar',
        regular: 'Pioneiro regular',
        special: 'Pioneiro especial',
        circuit: 'Superintendente de circuito',
        bethelite: 'Betelita',
        ldc: 'Servo de construção'
      },
      privilege: 'Responsabilidade na congregação',
      privilegeValues: {
        publisher: 'Publicador',
        servant: 'Servo ministerial',
        elder: 'Ancião',
        coordinator: 'Coordenador',
        secretary: 'Secretário',
        serviceOverseer: 'Superintendente de serviço'
      },
      language: 'Língua da conta',
      languageValues: {
        de: 'Alemão',
        'en-US': 'Inglês  (EUA)',
        'en-GB': 'Inglês  (GB)',
        'en-AU': 'Inglês  (Australia)',
        'el-GR': 'Grego',
        fi: 'Finlandês',
        fr: 'Francês',
        hu: 'Húngaro',
        it: 'Italiano',
        pl: 'Polaco',
        pt: 'Português',
        ru: 'Russo',
        'zh-TW': 'Chinês (Tradicional) (parcialmente)',
        'zh-CN': 'Chinês (Simplificado) (parcialmente)'
      },
      languages: 'Línguas estrangeiras',
      shortTermCalls: 'Receber e-mails de falta de pessoal',
      shortTermCallsAlways: 'Disponível a curto prazo',
      availability: {
        new: 'Adicionar novo intervalo de tempo',
        noElements: 'Nenhum intervalo de tempo',
        methodConfirmation: 'Quer mesmo apagar este intervalo de tempo?',
        mondays: 'Segundas',
        tuesdays: 'Terças',
        wednesdays: 'Quartas',
        thursdays: 'Quintas',
        fridays: 'Sextas',
        saturdays: 'Sábados',
        sundays: 'Domingos',
        start: 'Início',
        startDateFormat: 'HH:mm',
        startValues: {
          '0': '00:00',
          '1': '01:00',
          '2': '02:00',
          '3': '03:00',
          '4': '04:00',
          '5': '05:00',
          '6': '06:00',
          '7': '07:00',
          '8': '08:00',
          '9': '09:00',
          '10': '10:00',
          '11': '11:00',
          '12': '12:00',
          '13': '13:00',
          '14': '14:00',
          '15': '15:00',
          '16': '16:00',
          '17': '17:00',
          '18': '18:00',
          '19': '19:00',
          '20': '20:00',
          '21': '21:00',
          '22': '22:00',
          '23': '23:00'
        },
        end: 'Fim',
        endDateFormat: 'HH:mm',
        endValues: {
          '0': '00:00',
          '1': '01:00',
          '2': '02:00',
          '3': '03:00',
          '4': '04:00',
          '5': '05:00',
          '6': '06:00',
          '7': '07:00',
          '8': '08:00',
          '9': '09:00',
          '10': '10:00',
          '11': '11:00',
          '12': '12:00',
          '13': '13:00',
          '14': '14:00',
          '15': '15:00',
          '16': '16:00',
          '17': '17:00',
          '18': '18:00',
          '19': '19:00',
          '20': '20:00',
          '21': '21:00',
          '22': '22:00',
          '23': '23:00'
        },
        wholeDay: 'Dia inteiro'
      },
      vacation: {
        start: 'Início',
        end: 'Fim',
        new: 'Adicionar novas férias',
        noElements: 'Sem férias',
        methodConfirmation: 'Quer mesmo apagar estas férias?',
        startDateFormat: 'DD/MM/YYYY [até]',
        endDateFormat: 'DD/MM/YYYY'
      }
    },
    password: {
      change: 'Mudar palavra-passe',
      reset: 'Enviar email para restabeler a palavra-passe',
      resetConfirmation: 'Quer mesmo enviar um email para restabeler a palavra-passe para o utilizador?',
      password: 'Introduza a nova palavra-passe',
      passwordRepeat: 'Volte a introduzir a palavra-passe'
    },
    permissions: {
      permissions: 'Permissões',
      project: 'Permissões do projeto',
      projectValues: {
        admin: 'Gestor de projeto',
        shiftScheduler: 'Programador de turnos',
        shiftAdmin: 'Gerente de turnos',
        member: 'Membro'
      },
      tag: {
        tag: 'Etiqueta',
        role: 'Função',
        roleValues: {
          teamleader: 'Dirigente de equipa',
          substituteTeamleader: 'Dirigente de equipa substituto',
          participant: 'Participante',
          none: 'Nada'
        }
      }
    },
    status: {
      lastLogin: {
        date: 'Última conexão'
      }
    },
    invite: 'Enviar convite para projeto',
    inviteConfirmation: 'Quer mesmo enviar um convite de projeto por email ao utilizador?',
    delete: 'Remover o acesso deste utilizador ao projecto',
    deleteConfirmation: 'Quer mesmo remover o acesso deste utilizador ao projecto?'
  },
  search: {
    placeholder: 'Nome, Apelido, Email, Telefone ou Nome de Utilizador'
  },
  details: {
    sections: {
      identification: 'Dados de identificação',
      availability: 'Disponibilidade',
      vacations: 'Férias',
      permissions: 'Permissões',
      password: 'Palavra-passe',
      options: 'Opções'
    }
  },
  profile: {
    availability: {
      details: {
        sections: {
          mondays: 'Disponibilidade às segundas',
          tuesdays: 'Disponibilidade às terças',
          wednesdays: 'Disponibilidade às quartas',
          thursdays: 'Disponibilidade às quintas',
          fridays: 'Disponibilidade às sextas',
          saturdays: 'Disponibilidade aos sábados',
          sundays: 'Disponibilidade aos domingos'
        }
      }
    }
  },
  permissions: {
    details: {
      sections: {
        permissions: {
          project: 'Permissões de projeto',
          tags: 'Permissões de etiquetas'
        }
      }
    },
    tag: {
      details: {
        sections: {
          permissions: {
            tag: 'Permissão de projeto'
          }
        }
      }
    }
  }
}

export default publisher
