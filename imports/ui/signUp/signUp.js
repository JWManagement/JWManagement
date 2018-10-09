import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './signUp.html'
import './signUp.scss'

Template.signUp.helpers({
  error: () => Session.get('error')
})

Template.signUp.onCreated(() => {})

Template.signUp.onRendered(() => {
  return Session.set('error', '')
})

Template.signUp.events({
  'submit form' (event, form) {
    event.preventDefault()

    const submit = $('#submit').ladda()
    submit.ladda('start')

    if (event.target.password.value !== event.target.passwordRepeat.value) {
      Session.set('error', TAPi18n.__(`error.passwordsDoNotMatch`))
      submit.ladda('stop')
      return
    }

    Accounts.createUser({
      username: event.target.username.value,
      password: event.target.password.value,
      profile: {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        email: event.target.email.value,
        language: 'en'
      }
    }, (err) => {
      if (err) {
        Session.set('error', TAPi18n.__(`error.${err.error}`))
        submit.ladda('stop')
        console.log(err)
      } else {
        FlowRouter.go('dashboard.details', { language: 'en' })
      }
    })
  }
})
