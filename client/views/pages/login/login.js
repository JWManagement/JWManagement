import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { TAPi18n } from 'meteor/tap:i18n'
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.login.helpers({
  error () {
    return Session.get('error')
  }
})

Template.login.onCreated(() => {
  if (FlowRouter.getRouteName() === 'dashboard.details') {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
      return FlowRouter.go('welcome', {
        language: 'en'
      })
    }
  }
})

Template.login.onRendered(() => {
  return Session.set('error', '')
})

Template.login.events({
  'submit form': function (event) {
    event.preventDefault()
    Session.set('error', '')

    const submit = $('#submit').ladda()
    submit.ladda('start')

    const usernameOrEmail = $('#usernameOrEmail').val()
    const password = $('#password').val()

    function loginWithPasswordAsync (username, pw) {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, pw, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }

    loginWithPasswordAsync(usernameOrEmail, password)
      .catch((error) => {
        if (error.reason == 'User not found') {
          return Meteor.callPromise('getUsernameForEmailAddress', usernameOrEmail)
            .then(username => loginWithPasswordAsync(username, password))
        }
        throw error
      })
      .catch((error) => {
        let message = 'generic'

        if (error.error == 400) {
          message = 'missingField'
        } else if (error.error == 403) {
          message = 'incorrectPassword'
        } else if (['noAccountFound', 'multipleAccountsFound'].includes(error.error)) {
          message = error.error
        }

        submit.ladda('stop')
        Session.set('error', TAPi18n.__(`error.${message}`))
      })
  }
})
