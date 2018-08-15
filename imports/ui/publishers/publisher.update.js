import { Template } from 'meteor/templating';

import Gender from '/imports/framework/Constants/Gender';
import Pioneer from '/imports/framework/Constants/Pioneer';
import Privilege from '/imports/framework/Constants/Privilege';

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
        key: 'profile_languages'
      }, {
        key: 'profile_shortTermCalls',
        type: 'checkbox'
      }, {
        key: 'profile_shortTermCallsAlways',
        type: 'checkbox'
      }
    ]
  }
});
