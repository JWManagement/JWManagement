const mail = {
  footer: 'This is an automated mail. We don\\\'t expect an answer to it.',
  link: 'Open JW Management',
  accountCreated: {
    subject: 'JW Management Account Created!',
    headline: 'Welcome!',
    hello: 'Hello',
    text1: 'We would like to tell you that we have created an account for you in JW Management. You can set your personal username and password by clicking on the button below.',
    text2: 'In case of problems please feel free to contact us.<br>We wish you much joy using JW Management.<br>Your brothers from JW Management',
    button: 'Let\'s Go!'
  },
  teamCancellation: {
    subject: 'Team cancelled',
    headline: 'Team has been cancelled.',
    hello: 'Hello',
    text: 'Unfortunately we had to tell you that your team assignment on <b>{{date}}</b> at <b>{{time}}</b> o\'clock was <u>cancelled</u>.',
    missingParticipant: 'A participant is missing. If there are enough participants the team can take place again.'
  },
  confirmation: {
    subject: 'New Request Approved',
    headline: 'Your Request was approved!',
    hello: 'Hello',
    text1: 'Your request for the following shift was approved:',
    datetime: '{{date}} from {{time}} o\'clock'
  },
  declined: {
    subject: 'Request not considered',
    headline: 'Request was not considered',
    hello: 'Hello',
    text1: 'Unfortunately your request for the following shift could not be considered:',
    text2: 'Thank you very much for your request!',
    datetime: '{{date}} from {{time}} o\'clock'
  },
  reversal: {
    subject: 'Reversal',
    hello: 'Hello',
    text1: 'You were removed from the following team:',
    datetime: '{{date}} from {{time}} o\'clock'
  },
  teamUpdate: {
    subject: 'Team changed',
    _changed: 'changed.',
    changed: {
      participant: 'A participant',
      time: 'The time',
      location: 'The location',
      leader: 'The team leader'
    },
    hello: 'Hello',
    text1: 'You are marked as team member or leader so we would like to inform you about changes in your team.',
    text2: 'Here is the current team configuration',
    datetime: '{{date}} from {{time}} o\'clock'
  },
  understaffed: {
    subject: 'Team understaffed',
    headline: 'Team is understaffed',
    hello: 'Hello',
    text1: 'the following Team is understaffed and needs a',
    text2: 'Please have a look whether you can help this team.',
    datetime: '{{date}} from {{time}} o\'clock'
  },
  resetPassword: {
    subject: 'Reset Password',
    headline: 'Reset your Password',
    text1: 'Hello,<br>Please click the following button to set a new password:',
    button: 'Reset Password',
    text2: '<p>Useful hints for secure password generation can be found in <a href="http://wol.jw.org/en/wol/d/r1/lp-e/102001451">g01 6/22 p. 31</a></p><p>If you didn\'t request a password reset, feel free to delete this email.</p>'
  }
}

export default mail
