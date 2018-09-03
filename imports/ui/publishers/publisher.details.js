import { Template } from 'meteor/templating';

Template['publisher.details'].helpers({
  data: {
    getMethod: 'publisher.get',
    navigation: {
      backLink: 'publisher.search'
    },
    sections: [{
      title: 'identification',
      contents: [{
        key: 'profile_firstname',
        type: 'text'
      }, {
        key: 'profile_lastname',
        type: 'text'
      }, {
        key: 'profile_email',
        type: 'text'
      }, {
        key: 'profile_telefon',
        type: 'text'
      }, {
        key: 'username',
        type: 'text'
      }, {
        key: 'profile_gender',
        type: 'dropdown'
      }, {
        key: 'profile_pioneer',
        type: 'dropdown'
      }, {
        key: 'profile_privilege',
        type: 'dropdown'
      }, {
        key: 'profile_languages',
        type: 'text'
      }]
    }, {
      title: 'availability',
      contents: [{
        key: 'profile_availability_mondays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_tuesdays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_wednesdays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_thursdays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_fridays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_saturdays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_availability_sundays',
        type: 'link',
        route: 'publisher.profile.availability.details'
      }, {
        key: 'profile_shortTermCalls',
        type: 'checkbox'
      }, {
        key: 'profile_shortTermCallsAlways',
        type: 'checkbox'
      }]
    }, {
      title: 'vacations',
      contents: [{
        key: 'profile_vacations',
        type: 'array',
        item: {
          key: 'display',
          type: 'link',
          action: {
            type: 'method',
            icon: 'trash',
            method: 'publisher.profile.vacation.delete'
          }
        }
      }],
      actions: [{
        key: 'profile.vacation.new',
        type: 'link',
        style: 'primary',
        route: 'publisher.profile.vacation.insert'
      }]
    }, {
      title: 'permissions',
      contents: [{
        key: 'permissions',
        type: 'link',
        route: 'publisher.permissions.details'
      }]
    }, {
      title: 'password',
      contents: [],
      actions: [{
        key: 'password.change',
        type: 'link',
        style: 'primary',
        route: 'publisher.password.insert'
      }, {
        key: 'password.reset',
        type: 'confirm',
        style: 'primary',
        method: 'publisher.password.reset'
      }]
    }, {
      title: 'options',
      contents: [],
      actions: [{
        key: 'invite',
        type: 'confirm',
        style: 'primary',
        method: 'publisher.invite'
      }, {
        key: 'delete',
        type: 'confirm',
        style: 'danger',
        method: 'publisher.removeFromProject',
        route: 'publisher.search'
      }]
    }]
  }
});
