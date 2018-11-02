import { Template } from 'meteor/templating'

import Gender from '../../framework/Constants/Gender'
import Pioneer from '../../framework/Constants/Pioneer'
import Privilege from '../../framework/Constants/Privilege'
import Permissions from '../../framework/Constants/Permissions'
import SystemLanguages from '../../framework/Constants/SystemLanguages'

Template['publisher.update'].helpers({
  data: {
    getMethod: 'publisher.getField',
    backLink: 'publisher.details',
    fields: [
      {
        key: 'profile_firstname'
      }, {
        key: 'profile_lastname'
      }, {
        key: 'profile_email'
      }, {
        key: 'profile_telefon'
      }, {
        key: 'username'
      }, {
        key: 'profile_gender',
        type: 'picker',
        allowedValues: Gender.allowedValues
      }, {
        key: 'profile_pioneer',
        type: 'picker',
        allowedValues: Pioneer.allowedValues
      }, {
        key: 'profile_privilege',
        type: 'picker',
        allowedValues: Privilege.allowedValues
      }, {
        key: 'profile_language',
        type: 'picker',
        allowedValues: SystemLanguages.allowedValues
      }, {
        key: 'profile_languages'
      }, {
        key: 'profile_shortTermCalls',
        type: 'checkbox'
      }, {
        key: 'profile_shortTermCallsAlways',
        type: 'checkbox'
      }, {
        key: 'permissions_project',
        type: 'picker',
        allowedValues: Permissions.member
      }
    ]
  }
})
