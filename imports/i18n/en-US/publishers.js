const publisher = {
  entity: {
    username: 'Username',
    profile: {
      firstname: 'First name',
      lastname: 'Last name',
      email: 'E-mail',
      telefon: 'Phone',
      gender: 'Gender',
      genderValues: {
        m: 'Brother',
        w: 'Sister'
      },
      congregation: 'Congregation',
      pioneer: 'Privilege of service',
      pioneerValues: {
        publisher: 'Publisher',
        auxiliary: 'Auxiliary pioneer',
        regular: 'Regular pioneer',
        special: 'Special pioneer',
        circuit: 'Circuit overseer',
        bethelite: 'Bethelite',
        ldc: 'Construction servant'
      },
      privilege: 'Congregation assignment',
      privilegeValues: {
        publisher: 'Publisher',
        servant: 'Ministerial servant',
        elder: 'Elder',
        coordinator: 'Coordinator of the Body of Elders',
        secretary: 'Secretary',
        serviceOverseer: 'Service overseer'
      },
      language: 'Account language',
      languageValues: {
        de: 'German',
        'en-US': 'English (US)',
        'en-GB': 'English (GB)',
        'en-AU': 'English (Australian)',
        'el-GR': 'Greek',
        fi: 'Finnish',
        fr: 'French',
        hu: 'Hungarian',
        it: 'Italian',
        pl: 'Polish',
        pt: 'Portuguese',
        ru: 'Russian',
        'zh-TW': 'Chinese (Traditional) (partially)',
        'zh-CN': 'Chinese (Simplified) (partially)'
      },
      languages: 'Foreign languages',
      shortTermCalls: 'Receive understaffed mails',
      shortTermCallsAlways: 'Available in short term',
      availability: {
        new: 'Add new timeslot',
        noElements: 'No timeslot(s) entered',
        methodConfirmation: 'Do you really want to delete this timeslot?',
        mondays: 'Mondays',
        tuesdays: 'Tuesdays',
        wednesdays: 'Wednesdays',
        thursdays: 'Thursdays',
        fridays: 'Fridays',
        saturdays: 'Saturdays',
        sundays: 'Sundays',
        start: 'Start',
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
        end: 'End',
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
        wholeDay: 'Whole day'
      },
      vacation: {
        start: 'Start',
        end: 'End',
        new: 'Add new vacation',
        noElements: 'No vacations added',
        methodConfirmation: 'Do you really want to delete this vacation?',
        startDateFormat: 'MM/DD/YYYY [until]',
        endDateFormat: 'MM/DD/YYYY'
      }
    },
    password: {
      change: 'Change password',
      reset: 'Send password reset mail',
      resetConfirmation: 'Do you really want to send a reset password mail to the user?',
      password: 'Enter the new password',
      passwordRepeat: 'Re-enter the new password'
    },
    permissions: {
      permissions: 'Permissions',
      project: 'Project permissions',
      projectValues: {
        admin: 'Project manager',
        shiftScheduler: 'Shift scheduler',
        shiftAdmin: 'Shift manager',
        member: 'Member'
      },
      tag: {
        tag: 'Tag',
        role: 'Role',
        roleValues: {
          teamleader: 'Teamleader',
          substituteTeamleader: 'Substitute teamleader',
          participant: 'Participant',
          none: 'None'
        }
      }
    },
    status: {
      lastLogin: {
        date: 'Last Login'
      }
    },
    invite: 'Send project invitation',
    inviteConfirmation: 'Do you really want to send a project invitation mail to the user?',
    delete: 'Revoke this user\'s access to the project',
    deleteConfirmation: 'Do you really want to revoke this user\'s access to the project?'
  },
  search: {
    placeholder: 'First name, Last name, E-mail, Phone or Username'
  },
  details: {
    sections: {
      identification: 'Identification data',
      availability: 'Availability',
      vacations: 'Vacations',
      permissions: 'Permissions',
      password: 'Password',
      options: 'Options'
    }
  },
  profile: {
    availability: {
      details: {
        sections: {
          mondays: 'Availability on mondays',
          tuesdays: 'Availability on tuesdays',
          wednesdays: 'Availability on wednesdays',
          thursdays: 'Availability on thursdays',
          fridays: 'Availability on fridays',
          saturdays: 'Availability on saturdays',
          sundays: 'Availability on sundays'
        }
      }
    }
  },
  permissions: {
    details: {
      sections: {
        permissions: {
          project: 'Project permissions',
          tags: 'Tag permissions'
        }
      }
    },
    tag: {
      details: {
        sections: {
          permissions: {
            tag: 'Tag permission'
          }
        }
      }
    }
  }
}

export default publisher
