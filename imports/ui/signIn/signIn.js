import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import i18next from 'i18next'

import './signIn.html'
import './signIn.scss'

Template.signIn.helpers({
  error: () => Session.get('error'),
})

Template.signIn.onCreated(() => {})

Template.signIn.onRendered(() => {
  return Session.set('error', '')
})

Template.signIn.events({
  'submit form' (event, form) {
    event.preventDefault()
    Session.set('error', '')

    const submit = $('#submit').ladda()
    submit.ladda('start')

    const usernameOrEmail = event.target.usernameOrEmail.value
    const password = event.target.password.value

    function loginWithPasswordAsync (username, pw) {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, pw, (error) => {
          if (error) {
            reject(error)
          } else {
            Meteor.call('setMyAccountActive')
            resolve()
          }
        })
      })
    }

    loginWithPasswordAsync(usernameOrEmail, password)
      .catch((error) => {
        if (error.reason === 'User not found') {
          return Meteor.callPromise('getUsernameForEmailAddress', usernameOrEmail)
            .then(username => loginWithPasswordAsync(username, password))
        }
        throw error
      })
      .catch((error) => {
        let message = 'generic'

        if (error.error === 400) {
          message = 'missingField'
        } else if (error.error === 403) {
          message = 'incorrectPassword'
        } else if (['noAccountFound', 'multipleAccountsFound'].includes(error.error)) {
          message = error.error
        }

        submit.ladda('stop')
        Session.set('error', i18next.t(`error.${message}`))
      })
  }
})
