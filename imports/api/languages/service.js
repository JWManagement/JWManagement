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
    const user = Meteor.user()

    if (user) {
      const profileLanguage = user.profile.language
      const isSystemLanguage = SystemLanguages.allowedValues.indexOf(language) > -1

      if (profileLanguage && isSystemLanguage) {
        Users.persistence.update(user._id, 'profile.language', language)
      }
    }
  }
})
