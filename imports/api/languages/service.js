import { Meteor } from 'meteor/meteor'

import Users from '/imports/api/users/Users'
import SystemLanguages from '/imports/framework/Constants/SystemLanguages'

Meteor.methods({
  'language.get': () => {
    return {
      language: Meteor.user().profile.language
    }
  },
  'language.update': ({}, {}, language) => {
    const profileLanguage = Meteor.user().profile.language
    const isSystemLanguage = SystemLanguages.allowedValues.indexOf(language) > -1

    if (profileLanguage && isSystemLanguage) {
      const userId = Meteor.userId()

      Users.persistence.update(userId, 'profile.language', language)
    }
  }
})
