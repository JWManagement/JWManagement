const project = {
  nameShort: 'Admin',
  entity: {
    _id: 'ID',
    name: 'Name',
    email: 'Project Email Address',
    news: {
      text: 'News'
    },
    shifts: 'Shifts',
    calendar: 'Calendar',
    knowledgeBase: 'Knowledge Base',
    settings: 'Settings',
    users: 'Users',
    publishers: 'Publishers',
    publisherActions: 'Publisher Bulk Actions',
    vessels: 'Vessels',
    leave: 'Cancel any participation in this project',
    leaveConfirmation: 'Do you really want to leave this project and PERMANENTLY CANCEL ANY PARTICIPATION with it? This can\'t be undone!',
    supportPage: 'Support',
    support: {
      phone: 'Call us',
      discord: 'Write us on Discord (preferred)',
      github: 'Create a GitHub Issue',
      paypal: 'PayPal',
      iban: 'IBAN'
    },
    noElements: 'No Projects found'
  },
  details: {
    sections: {
      project: 'Project',
      modules: 'Modules',
      administration: 'Administration',
      participation: 'Participation'
    }
  },
  search: {
    placeholder: 'Search for projects'
  },
  support: {
    details: {
      sections: {
        support: 'Get support',
        donate: 'Donate'
      }
    }
  }
}

export default project
