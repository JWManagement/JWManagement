const swal = {
  error: 'Error',
  publisherInOtherTeam: 'One of the selected publishers is already part of another team. Please remove them from there first.',
  onlyTeam: 'You can\'t delete this team. It is the only team in this shift. Every shift needs to have at least one team.',
  noTeamleader: 'Every team requires a team leader. Unfortunately this publisher does not have permission to serve as a team leader.',
  ownPermission: 'You are not allowed to revoke your own permissions. Another administrator has to do that.',
  approvalInformed: 'This participant has been informed that their request has been approved.',
  declinementInformed: 'This participant has been informed that their request was declined.',
  vacationEndInPast: 'The end date cannot be in the past.',
  missingTag: 'No tag defined. Please first define a tag under Admin > Settings',
  logout: {
    title: 'Hint',
    text: 'It is not necessary to log out unless you are on a shared computer. Your connection is encrypted and we save session information only in your local browser. Nobody else can see or hijack your session.',
    confirm: 'Logout',
    cancel: 'Cancel'
  },
  invite: {
    user: {
      title: 'Invite Publisher?',
      text: 'This publisher <b>already has an account</b>, so no further account has to be created. Instead the publisher will <b>simply be given permission to access this project</b>.<br>Of course <b>we will inform him</b> about this change. <br><p>In case more than one publisher has registered with the same email address, please choose the right one:</p>'
    },
    users: {
      title: 'Are you sure?',
      text: 'We will send an email to all selected publishers.',
      confirm: 'Invite',
      cancel: 'Cancel'
    }
  },
  sendMail: {
    confirmWeek: {
      title: 'Are you sure?',
      text: 'All approved publishers will receive a confirmation email and all declined publishers will receive a rejection email.',
      confirm: 'Yes',
      cancel: 'Cancel'
    },
    confirmation: {
      title: 'Inform Publisher?',
      text: 'The publisher will be informed via email about the approval of this shift.',
      confirm: 'Yes',
      cancel: 'Cancel'
    },
    declined: {
      title: 'Inform Publisher?',
      text: 'The publisher will be informed via email that the request was declined.',
      confirm: 'Yes',
      cancel: 'Cancel'
    },
    selectTag: {
      title: 'Which Tag?',
      text: 'Please select the tag you would like to send confirmation emails for:',
      confirm: 'OK',
      cancel: 'Cancel'
    },
    teamUpdate: {
      user: {
        title: 'Team leader already informed',
        text: 'The team leader has already been informed. Do you want to send an email with this update to him?',
        confirm: 'Yes',
        cancel: 'No'
      },
      general: {
        title: 'Are you sure?',
        text: 'Already informed publishers will receive an email with the updated information about the team.',
        confirm: 'Yes',
        cancel: 'No'
      }
    },
    understaffed: {
      title: 'Inform Publishers?',
      text: 'Inform all publishers about this understaffed team?',
      confirm: 'Yes',
      cancel: 'No',
      teamleader: {
        title: 'Inform Team Leaders?',
        text: 'Inform all team leaders about this team?',
        confirm: 'Yes',
        cancel: 'No'
      }
    }
  },
  add: {
    meeting: {
      title: 'Add new meeting point',
      text: '',
      placeholder: 'Name',
      confirm: 'Add',
      cancel: 'Cancel'
    },
    question: {
      title: 'Add a new question/title',
      text: '',
      placeholder: 'Question/Title',
      inputError: 'You need to write something!',
      confirm: 'Add',
      cancel: 'Cancel'
    },
    tab: {
      title: 'Add a new tab',
      text: '',
      placeholder: 'Title',
      inputError: 'Invalid tab name!',
      confirm: 'Add',
      cancel: 'Cancel'
    },
    tag: {
      title: 'Add new tag',
      text: '',
      placeholder: 'Name',
      inputError: 'Invalid tag name!',
      confirm: 'Create',
      cancel: 'Cancel'
    },
    team: {
      title: 'Add new team',
      text: '',
      placeholder: 'Name',
      inputError: 'Invalid team name!',
      confirm: 'Add',
      cancel: 'Cancel'
    },
    template: {
      title: 'Add template',
      text: '',
      placeholder: 'Name',
      inputError: 'Invalid template name!',
      confirm: 'Add',
      cancel: 'Cancel'
    },
    user: {
      title: 'Created!',
      text: 'The User was created.'
    },
    users: {
      title: 'Are you sure?',
      text: 'All shown publishers will be added to the project.',
      confirm: 'Add',
      cancel: 'Cancel'
    }
  },
  update: {
    file: {
      title: 'Change Filename',
      text: '',
      placeholder: 'Filename',
      inputError: 'Invalid filename!',
      confirm: 'Change',
      cancel: 'Cancel'
    },
    password: {
      title: 'Change password',
      passwordOld: 'Old password',
      passwordNew1: 'New password',
      passwordNew2: 'Repeat new password',
      confirm: 'Change',
      cancel: 'Cancel',
      passwordChanged: 'Password changed'
    },
    question: {
      title: 'Change Question',
      text: '',
      placeholder: 'Question/Title',
      confirm: 'Change',
      cancel: 'Cancel'
    },
    template: {
      title: 'Edit name',
      text: '',
      placeholder: 'Name',
      confirm: 'Change',
      cancel: 'Cancel'
    }
  },
  delete: {
    account: {
      title: 'Really delete your account?',
      text: 'The account will be irreversibly deleted!',
      confirm: 'Delete my Account!',
      cancel: 'Cancel'
    },
    allShifts: {
      title: 'Are you sure?',
      text: 'All shifts on this day and all requests for these shifts will irreversibly get deleted.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    file: {
      title: 'Are you sure?',
      text: 'The file will be deleted permanetly.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    language: {
      title: 'Really delete this language?',
      text: 'This will delete the language with its stock.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    meeting: {
      title: 'Really delete this meeting point?',
      text: 'The meeting point will also get removed from all existing shifts planned for the future.',
      checkInput: 'delete',
      placeholder: 'Please type "{{0}}" for approval',
      inputError: 'The input did not match with "{{0}}"',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    note: {
      title: 'Really delete this note?',
      text: 'The note will be irreversibly deleted.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    project: {
      title: 'Really delete this project?',
      text: 'This will irreversibly delete all settings associated with this project (e.g. shifts, reports, requests, literature). Only the user accounts will remain.',
      checkInput: 'delete this project',
      placeholder: 'Please type "{{0}}" for approval',
      inputError: 'The input did not match with "{{0}}"',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    question: {
      title: 'Are you sure?',
      text: 'This will irreversibly delete the question and its answer.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    shift: {
      title: 'Really delete this shift?',
      text: 'All requests for this shift will be removed.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    tab: {
      title: 'Are you sure?',
      text: 'The whole tab with all the questions will be deleted.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    tag: {
      title: 'Really delete tag?',
      text: 'All shifts belonging to this tag will also be deleted. This includes all requests for these shifts. <br><br> To confirm type in "delete".',
      checkInput: 'delete',
      placeholder: 'Please type "{{0}}" for approval',
      inputError: 'The input did not match with "{{0}}"',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    team: {
      title: 'Really delete this team?',
      text: 'The team will get removed from all existing shifts planned for the future. Approved requests for these shifts will be reallocated to other teams. <br><br> To confirm type in "delete".',
      checkInput: 'delete',
      placeholder: 'Please type "{{0}}" for approval',
      inputError: 'The input did not match with "{{0}}"',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    template: {
      title: 'Really delete template?',
      text: '',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    user: {
      title: 'Really delete this user?',
      text: 'All project permissions will be revoked.',
      confirm: 'Delete',
      cancel: 'Cancel'
    },
    wholeWeek: {
      title: 'Really delete the whole week?',
      text: 'All shift in this week will be deleted, as well.',
      confirm: 'Delete',
      cancel: 'Cancel'
    }
  },
  request: {
    approve: {
      title: 'Really approve publisher?',
      text: 'This publisher has previously been declined. Please make sure that the publisher is still able and willing to participate.',
      confirm: 'Yes',
      cancel: 'No'
    },
    cancel: {
      title: 'Are you sure?',
      text: 'The team will be removed if you are the last participant.',
      confirm: 'Yes, cancel my participation',
      cancel: 'No'
    },
    decline: {
      title: 'Really decline participant?',
      text: 'If participant is already informed he will receive a reversal email.',
      confirm: 'Yes',
      cancel: 'No'
    },
    maxReached: {
      title: 'Too many users selected',
      text: 'Set team maximum limit from {{0}} to {{1}} and approve selected?',
      confirm: 'Approve selected',
      cancel: 'Cancel'
    },
    minNotReached: {
      title: 'Not enough users selected',
      text: 'Set team minimum limit from {{0}} to {{1}} and approve selected?',
      confirm: 'Approve selected',
      cancel: 'Cancel'
    },
    minReached: {
      title: 'Really decline participant?',
      text: 'This team\'s minimum limit has been reached. If you decline this user, the system will remove this team.',
      confirm: 'Remove team',
      cancel: 'No'
    },
    noNewTeamleader: {
      title: 'Really decline participant?',
      text: 'Unfortunately there is no other possible team leader in this team. If you decline this user, the system will remove this team.',
      confirm: 'Remove team',
      cancel: 'No'
    }
  }
}

export default swal
