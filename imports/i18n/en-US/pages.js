const pages = {
  profile: {
    name: 'My Profile',
    personalData: 'My personal details',
    changePicture: 'Edit image...',
    options: {
      title: 'Settings',
      helpText: {
        mergeAccounts: 'In JW Management you can do everything with just one account. You only have to remember one username and password. If you have multiple accounts click on "Merge accounts" and enter the credentials for your other account. This will merge this account\'s permissions into the specified account.'
      }
    },
    availability: {
      title: 'Availability',
      helpText: 'Please mark the hours in which you are available.',
      shortTermCalls: 'I can be contacted in the short term',
      shortTermCallsAlways: 'Even if no availability is set'
    },
    speaks: 'Speaks',
    telefon: 'Phone',
    congregation: 'Congregation',
    language: 'Account language',
    languages: 'Foreign languages',
    gender: 'Gender',
    _gender: {
      brother: 'Brother',
      sister: 'Sister'
    },
    publisher: 'Publisher',
    privilegeOfService: 'Privilege of service',
    _privilegeOfService: {
      auxiliaryPioneer: 'Auxiliary pioneer',
      pioneer: 'Regular pioneer',
      specialPioneer: 'Special pioneer',
      circuitOverseer: 'Circuit overseer',
      bethelite: 'Bethelite',
      fulltimeConstructionServant: 'Construction servant'
    },
    ministryPrivilege: 'Congregation assignment',
    _ministryPrivilege: {
      ministerialServant: 'Ministerial servant',
      elder: 'Elder',
      coordinator: 'Coordinator of the Body of Elders',
      secretary: 'Secretary',
      serviceOverseer: 'Service overseer'
    },
    placeholder: {
      telefon: '(e.g. 218-123-4444)',
      congregation: 'Congregation',
      languages: 'Languages'
    },
    changePassword: 'Change password',
    deleteAccount: 'Delete account',
    mergeAccounts: 'Merge accounts',
    vacation: {
      title: 'Vacation',
      helpText: 'Please add the periods in which you are not available.'
    },
    until: 'until',
    addVacation: 'Add Vacation',
    deleteVacation: 'Delete this vacation',
    usernameTaken: 'This username is already taken by someone else. Please choose another.'
  },
  wiki: {
    name: 'Information Center',
    nameShort: 'Info',
    files: 'Files',
    addQuestion: 'Add question/title',
    edit: 'Edit',
    delete: 'Delete',
    noFiles: 'No files available',
    addTab: 'Add a new tab',
    editQuestion: 'Edit this question',
    removeFaq: 'Remove this question',
    editFaq: 'Edit this answer',
    changeFaq: 'Save this answer',
    cancelFaq: 'Cancel editing'
  },
  shifts: {
    name: 'Shifts',
    route: 'Route',
    addShift: 'Add a new shift',
    deleteWeek: 'Delete the whole week',
    addWeek: 'Add a new week',
    requests: 'Requests',
    openRequests: 'Open Requests',
    automation: 'Automatic',
    template: 'Template',
    noVisibleShifts: 'No shifts by that tag this week',
    start: 'Start',
    end: 'End',
    visibility: 'Visibility:',
    helpText: {
      start: 'This is the first week to be created by the system.',
      end: 'This is the last week to be created by the system.',
      visibility: 'This defines how many weeks in advance publishers will be able to see and request. Under consideration of the start-week and end-week, the system will automatically create the needed shifts.'
    },
    weeks: 'weeks',
    hideNames: 'Hide all names in the shifts',
    showNames: 'Show all names in the shifts',
    editShifts: 'Edit the shifts',
    prevWeek: 'Go to the previous week',
    nextWeek: 'Go to the next week',
    sendWeek: 'Send confirmations for all shifts in this week by email',
    shownTag: 'Shifts of this tag are currently shown',
    hiddenTag: 'Shifts of this tag are currently hidden',
    shift: {
      tag: 'Tag',
      schedule: 'Schedule',
      teamleader: 'Team leader',
      teams: 'Teams',
      noTeams: 'No Teams',
      participants: 'Participants',
      start: 'Start',
      end: 'End',
      requests: 'Request',
      requests_plural: 'Requests',
      requestsOf: 'Request of',
      requestsOf_plural: 'Requests of',
      teamleaders: 'TLs',
      noPermission: 'Only a project manager or shift manager is allowed to edit or schedule shifts.'
    }
  },
  day: {
    removeAll: 'Remove all'
  },
  settings: {
    main: {
      title: 'Main Settings',
      id: 'ID',
      name: {
        text: 'Name',
        placeholder: 'Project name',
        helpText: 'In many cases the project name is the name of the congregation. For bigger projects including multiple congregations it can be the name of the city where the project will be carried out. If the project does not organize cart witnessing, the name can also reflect what will be organized with this project.'
      },
      news: {
        text: 'News',
        placeholder: 'No News',
        helpText: 'The news will show up at the top of the project overview. It can be used to communicate with your participants.'
      },
      email: {
        text: 'Email',
        placeholder: 'Project email address',
        helpText: 'In emails like shift confirmations and team leader updates, this address will be set as the Reply-To address, so that if the recipients answer these emails, the reply will normally be sent to the inbox of this address if the recipient\'s email program is behaving correctly. Furthermore, this address will be notified (e.g. on short-term participation cancellations).'
      },
      language: {
        text: 'Language',
        helpText: 'If the system notifies the address listed above about changes, it will send the mails in the language you specify here.'
      },
      deleteProject: 'Delete project'
    },
    tags: {
      title: 'Tags',
      helpText: '<p>Every shift has to be assigned a tag. Furthermore every user can be permitted or denied permission to see shifts depending on the tags.</p><p>Tags can reflect different activities (e.g. Cart witnessing, Information stand, Street work, etc.). The dividing of shifts into different tags can be useful, for example if there are multiple shifts at the same time or if only certain publishers are trained in a specific type of public witnessing.</p><p>With every tag there can be a set of template weeks which have been defined previously.</p>',
      id: 'ID',
      name: 'Name',
      img: {
        name: 'Image',
        helpText: 'This image will be shown on the dashboard when clicking on \'Shifts\'. It should explain the kind of tasks done in shifts of this tag. If you want to add a custom image, please send us an email describing your idea to support@jwmanagement.org.'
      },
      templates: 'Templates',
      showTemplate: 'Edit shifts',
      editTemplate: 'Edit name',
      removeTemplate: 'Delete',
      addTemplate: 'Define new template',
      action: 'Action',
      none: 'No tags have been added yet',
      add: 'Add a new tag',
      remove: 'Remove this tag'
    },
    teams: {
      title: 'Teams',
      helpText: {
        main: 'For every shift there has to be at least one team. Teams can represent different routes or locations. A participant of the shift is always member of one of these teams.',
        picture: 'Publishers will be able to see this picture. Therefore, it should give further information for the tasks in this team. For example you could create a route for this team on Google Maps or OpenStreetMap (depending on which has better coverage of your area) and upload a picture of that here.',
        link: 'This link will be connected with the picture. If the user clicks on the picture he will be forwarded to the address of this link. For example you could provide the link of the Google Maps or OpenStreetMap map here.',
        description: 'Here you can optionally set a description for this team. For example you could explain some particularities of this team or route.'
      },
      id: 'ID',
      name: 'Name',
      icon: 'Icon',
      picture: 'Picture',
      editPicture: 'Upload a picture for this team',
      noPicture: 'No picture uploaded',
      link: 'Link',
      description: 'Description',
      action: 'Action',
      none: 'No teams have been added yet',
      add: 'Add a new team',
      remove: 'Remove this teams'
    },
    meetings: {
      title: 'Meeting Point',
      helpText: {
        main: 'For all the shift teams there can be a meeting point assigned. With that, teams can meet independently from each other. This can be useful when the route or location of the teams are so far apart that a common meeting would be too time consuming.',
        picture: 'Publishers will be able to see this picture. Therefore, it should give further information for the meeting point. For example you could upload a picture with the environment from Google Maps or OpenStreetMap (whichever one has better coverage of your area).'
      },
      id: 'ID',
      name: 'Name',
      picture: 'Picture',
      editPicture: 'Upload a picture for this meeting point',
      noPicture: 'No picture uploaded',
      action: 'Action',
      none: 'No meeting points have been added yet',
      add: 'Add a new meeting point',
      remove: 'Remove this meeting point'
    }
  }
}

export default pages
