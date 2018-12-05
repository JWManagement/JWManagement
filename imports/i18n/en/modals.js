const modal = {
  close: 'Close',
  addParticipant: {
    title: 'Add participant',
    description: 'Please choose the publisher you want to add to this shift.',
    submit: 'Add',
    alreadyRequested: 'This user has already requested participation',
    alreadyParticipating: 'This user is already participating',
    select: 'Select Publisher',
    available: 'available',
    callable: 'callable in short term',
    available_users: 'Available Publisher',
    all_users: 'Other Publisher'
  },
  addVessel: {
    title: 'Add a vessel',
    action: 'Add vessel'
  },
  addWeek: {
    title: 'Create new week',
    noTemplate: 'Please define a template first',
    defineTemplate: 'Define template',
    action: 'Create week',
    text: {
      top: 'Choose a week, that the template week will get applied to:',
      bottom: 'Choose the template week:'
    }
  },
  cancelTeam: {
    title: 'Cancel team',
    text: 'Describe why this team has to be cancelled. All participants will get this message via the cancellation mail.',
    action: 'Cancel team'
  },
  copyShift: {
    title: 'Copy shift',
    text: 'Just select the days to which you want to copy this shift.',
    action: 'Copy shift'
  },
  editShift: {
    title: 'Edit shift information',
    mainData: 'Main Details',
    tag: 'Tag',
    team: 'Team',
    teams: 'Teams assigned to this shift',
    helpText: {
      tag: 'Set this shift tag. All users with permissions on this tag can view the shift.',
      scheduling: 'With \'approve immediately\' requests will be approved automatically, when the minimum participant limit for the next team is reached.'
    },
    addTeam: 'Add a new team',
    teamMin: 'Minimum participants:',
    teamMax: 'Maximum participants:',
    teamStart: 'Start:',
    teamEnd: 'End:',
    teamPlace: 'Place:',
    removeTeam: 'Remove this team',
    noMeeting: 'No Meeting',
    action: 'Action:',
    delete: 'Delete',
    switch: 'Schedule shift',
    copyShift: 'Copy shift'
  },
  editTeamPicture: {
    title: 'Change team picture',
    currentPicture: 'Current Picture:',
    hints: 'This picture will probably be displayed larger for the publisher.',
    noPictureUploaded: 'You have not yet uploaded any picture',
    upload: 'Upload',
    delete: 'Delete'
  },
  editMeetingPicture: {
    title: 'Change meeting point picture',
    currentPicture: 'Current Picture:',
    hints: 'This picture will probably be displayed larger for the publisher.',
    noPictureUploaded: 'You have not yet uploaded any picture',
    upload: 'Upload',
    delete: 'Delete'
  },
  editVessel: {
    title: 'Edit vessel',
    action: 'Save changes'
  },
  inviteUser: {
    title: 'Invite new Publishers',
    key: '<span class="text-warning">Orange name</span> means that the user is already invited.',
    selectAll: 'Select All',
    noUsers: 'No new publishers found',
    invite: 'Invite'
  },
  position: {
    title: 'Mark position with left mouse click'
  },
  shift: {
    clickToEnlarge: 'Click the image to enlarge it',
    openLink: 'View linked information',
    meetingAt: 'Meeting point at',
    collapseTeam: 'Collapse team information and meeting points',
    expandTeam: 'Expand team information and meeting points',
    noParticipants: 'No participants',
    requestTeam: 'Request participation',
    requestTeamAgain: 'Request participation again',
    requests: 'Requests',
    cancelTeam: 'Cancel team',
    cancelRequest: 'Cancel request',
    cancelParticipation: 'Cancel participation',
    addParticipant: 'Add participant',
    closedTeam: 'This team is closed. You can\'t request participation.',
    maximumReached: 'Maximum limit for team participants has already been reached',
    noPermission: 'You don\'t have the permission to schedule users',
    noTeamleader: 'This user doesn\'t have permission to be a team leader',
    alreadyTeamleader: 'This user is already a team leader',
    openTeam: 'Open team',
    closeTeam: 'Close team',
    sendUnderstaffed: 'Send understaffed mail',
    switch: 'Edit shift',
    existingTeamleaders: 'Team leader exists',
    noExistingTeamleader: 'Team leader missing',
    notTeamleader: 'No team leader',
    selected: 'Selected:',
    of: 'of',
    approveSelected: 'Approve selected',
    declineSelected: 'Decline selected',
    report: 'Report'
  },
  shiftReport: {
    title: 'Report',
    teamleader: 'Team leader',
    substituteTeamleader: 'Substitute team leader',
    publications: 'Publications',
    occurrences: 'Occurrences',
    store: 'Store',
    experiences: 'Experiences',
    present: 'Present',
    sick: 'Sick',
    missing: 'Missing',
    name: 'Name',
    language: 'Language',
    count: 'Count',
    action: 'Action',
    noPublications: 'No publications here',
    select_publication: 'Select a publication',
    selectPublicationFirst: 'Please select a publication first',
    addItem: 'Add this publication',
    removeItem: 'Remove this publication',
    texts: 'Bible Texts',
    speaks: 'Conversations',
    videos: 'Shown Videos',
    website: 'Website shown',
    returnVisits: 'Return Visits',
    bibleStudies: 'Bible Studies',
    time: 'Hours of Service',
    trolleysFilled: 'Trolleys were filled',
    neatnessLast: 'Trolley condition after last Shift',
    bad: 'Bad',
    normal: 'Normal',
    good: 'Good',
    yes: 'Yes',
    no: 'No',
    expRoute: 'Route',
    expGood: 'Nice Experiences',
    expProblems: 'Problems / Difficulties',
    date: 'Date',
    toShift: 'To the shift',
    pages: {
      publisher: 'Publisher page',
      items: 'Placed publications page',
      occurrences: 'Happened occurrences',
      store: 'About the store room',
      experiences: 'Your experiences',
      prevPage: 'Go to the previous page',
      nextPage: 'Go to the next page',
      finish: 'Finish this report'
    }
  },
  route: {
    title: 'Create/edit route',
    routeMarkers: 'Route marker',
    addRouteMarkers: 'Click on the map to add a new route marker'
  },
  uploadUserFile: {
    title: 'User-File upload',
    helpText: 'Order of personal data (* fields are required): <br> Email*, First name*, Last name*, Gender(m or w)*, Phone number, Privilege of service (\'publisher\', \'auxiliary\', \'regular\', \'special\', \'circuit\', \'bethelite\' or \'ldc\'), Ministry privilege (\'publisher\', \'servant\', \'elder\', \'coordinator\', \'secretary\' or \'serviceOverseer\'), Congregation, Account Language (\'en\', \'de\', ...)',
    helpEncoding: 'The file has to be UTF-8 encoded to support all characters',
    uploadFile: 'Upload CSV-File',
    new: 'New Publishers',
    existing: 'Publishers with JW Management Account',
    name: 'Name',
    email: 'Email',
    add: 'Add Users'
  },
  mergeAccounts: {
    title: 'Merge accoutns',
    description: 'Enter the credentials of the account in which you want to merge this account\'s permissions. You will be logged in into that account right away.',
    username: 'Username',
    password: 'Password',
    merge: 'Merge accounts'
  }
}

export default modal
