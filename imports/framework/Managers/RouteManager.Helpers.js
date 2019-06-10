import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import i18next from 'i18next'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import moment from 'moment'

import { Delay, wrs } from '../Functions/Async'
import { setLanguageOnAuth } from '../../startup/client/language'
import SystemLanguages from '../Constants/SystemLanguages'

const checkLanguage = function () {
  let language = FlowRouter.current().params.language
  const myLanguage = i18next.language

  if (!SystemLanguages.allowedValues.includes(language)) {
    language = 'en-US'
    Meteor.call('language.update', null, null, language)
  }

  if (language !== myLanguage) {
    i18next.changeLanguage(language)
    moment.locale(language)

    wrs(() => FlowRouter.setParams({ language: language }))
  }
}

const doIfLoggedIn = function (whatToDo, elseToDo) {
  const route = FlowRouter.getRouteName()

  Tracker.autorun((tracker) => {
    if (route !== FlowRouter.getRouteName()) {
      tracker.stop()
    } else if (Meteor.loggingIn()) {
      BlazeLayout.render('blankLayout', { content: 'loading' })
    } else if (Meteor.userId()) {
      whatToDo()
    } else if (elseToDo != null) {
      elseToDo()
    } else {
      BlazeLayout.render('landing')
    }
  })
}

const logout = function () {
  if (Meteor.loggingIn() || Meteor.userId()) {
    Delay(() => Meteor.logout(setLanguageOnAuth))
  }
}

export { checkLanguage, doIfLoggedIn, logout }
