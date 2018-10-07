import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
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

    Meteor.call('signUp', {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      username: event.target.username.value,
      password: event.target.password.value,
      passwordRepeat: event.target.passwordRepeat.value
    }, (err, res) => {
      submit.ladda('stop')

      if (err) {
        Session.set('error', err)
      } else {
        FlowRouter.go('login', { language: 'en' })
      }
    })
  }
})
