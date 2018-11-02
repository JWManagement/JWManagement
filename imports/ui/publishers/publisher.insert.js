import { Template } from 'meteor/templating'

import Gender from '../../framework/Constants/Gender'
import Pioneer from '../../framework/Constants/Pioneer'
import Privilege from '../../framework/Constants/Privilege'
import SystemLanguages from './../../framework/Constants/SystemLanguages';

Template['publisher.insert'].helpers({
  data: {
    backLink: 'publisher.search',
    entityKey: 'userId',
    fields: [{
      key: 'profile_firstname',
      required: true
    }, {
      key: 'profile_lastname',
      required: true
    }, {
      key: 'profile_email',
      required: true
    }, {
      key: 'profile_telefon'
    }, {
      key: 'username'
    }, {
      key: 'profile_language',
      type: 'picker',
      allowedValues: SystemLanguages.allowedValues,
      defaultValue: SystemLanguages.defaultValue,
      required: true
    }, {
      key: 'profile_gender',
      type: 'picker',
      allowedValues: Gender.allowedValues,
      defaultValue: Gender.defaultValue,
      required: true
    }, {
      key: 'profile_pioneer',
      type: 'picker',
      allowedValues: Pioneer.allowedValues,
      defaultValue: Pioneer.defaultValue,
      required: true
    }, {
      key: 'profile_privilege',
      type: 'picker',
      allowedValues: Privilege.allowedValues,
      defaultValue: Privilege.defaultValue,
      required: true
    }, {
      key: 'profile_languages'
    }]
  }
})
