import Gender from '/imports/api/dropdowns/Gender';
import Pioneer from '/imports/api/dropdowns/Pioneer';
import Privilege from '/imports/api/dropdowns/Privilege';

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
      key: 'username',
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
});
