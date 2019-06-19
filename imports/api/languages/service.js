import { Meteor } from 'meteor/meteor'

import Users from '../users/Users'
import SystemLanguages from '../../framework/Constants/SystemLanguages'

Meteor.methods({
  'language.get' () {
    return {
      language: Meteor.user().profile.language
    }
  },
  'language.update' (_, __, language) {
    console.log('language.update: ' + language)
    console.log(Meteor.user())
    console.log(Meteor.user().profile)
    const profileLanguage = Meteor.user().profile.language
    const isSystemLanguage = SystemLanguages.allowedValues.indexOf(language) > -1

    if (profileLanguage && isSystemLanguage) {
      const userId = Meteor.userId()

      Users.persistence.update(userId, 'profile.language', language)
    }
  }
})
