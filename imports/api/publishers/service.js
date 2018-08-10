import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles';
import { Mailer } from 'meteor/lookback:emails';
import { TAPi18n } from 'meteor/tap:i18n';
import objectAssignDeep from 'object-assign-deep';
import moment from 'moment';

import Users from '/imports/api/users/Users';
import PasswordsSchema from '/imports/api/users/PasswordsSchema';
import RoleManager from '/imports/api/managers/RoleManager';
import MailManager from '/imports/api/managers/MailManager';
import State from '/imports/api/dropdowns/State';

Meteor.methods({
  'publisher.search': ({ language, projectId, searchString, limit }) => {
    checkPermissions(projectId);

    let rolesObject = {}
    let result = {
      total: 0,
      items: []
    };

    if (typeof searchString != 'string' || searchString == '') {
      return result;
    }

    const regEx = new RegExp(searchString, 'i');

    rolesObject['roles.' + projectId] = {
      $in: Permissions.member
    }

    const cursor = Users.find({
      $and: [
        {
          $or: [
            { _id: regEx },
            { 'profile.lastname': regEx },
            { 'profile.firstname': regEx },
            { 'profile.email': regEx },
            { 'profile.telefon': regEx },
            { username: regEx }
          ]
        },
        rolesObject,
        {
          username: {
            $ne: 'adm'
          }
        }
      ]
    }, {
      fields: {
        'profile.lastname': 1,
        'profile.firstname': 1,
        'profile.email': 1,
        'profile.telefon': 1,
        username: 1,
        roles: 1
      },
      sort: {
        'profile.lastname': 1,
        'profile.firstname': 1,
        username: 1
      },
      limit: limit
    });

    result.total = cursor.count();
    result.items = cursor.fetch();

    return result;
  },
  'publisher.get': ({ language, projectId, userId }) => {
    checkPermissions(projectId, userId);

    const publisher = getExtendedPublisher(userId, projectId, language);
    const project = Projects.findOne(projectId, {
      fields: {
        'tags._id': 1,
        'tags.name': 1
      }
    });

    if (publisher != undefined) {
      publisher.profile.availability = {
        mondays: publisher.profile.availability.mondays.map((x) => { return x.timeslot; }).join(', '),
        tuesdays: publisher.profile.availability.tuesdays.map((x) => { return x.timeslot; }).join(', '),
        wednesdays: publisher.profile.availability.wednesdays.map((x) => { return x.timeslot; }).join(', '),
        thursdays: publisher.profile.availability.thursdays.map((x) => { return x.timeslot; }).join(', '),
        fridays: publisher.profile.availability.fridays.map((x) => { return x.timeslot; }).join(', '),
        saturdays: publisher.profile.availability.saturdays.map((x) => { return x.timeslot; }).join(', '),
        sundays: publisher.profile.availability.sundays.map((x) => { return x.timeslot; }).join(', ')
      };
    }

    const projectRole = Roles.getRolesForUser(publisher, projectId)[0];

    publisher.permissions = {
      project: TAPi18n.__('role.' + projectRole, {}, language),
      tags: []
    };

    for (let tag of project.tags) {
      const tagRoles = Roles.getRolesForUser(publisher, tag._id);
      let tagRole = 'nothing';

      if (tagRoles.length > 0) {
        tagRole = tagRoles[0];
      }

      publisher.permissions.tags.push({
        _id: tag._id,
        tag: tag.name,
        role: TAPi18n.__('role.' + tagRole, {}, language)
      });
    }

    delete publisher.roles;

    return publisher;
  },
  'publisher.getField': ({ language, projectId, userId, key }) => {
    checkPermissions(projectId, userId);

    if (key.indexOf('_') > -1) {
      var publisher = getExtendedPublisher(userId, projectId, language);

      for (property of key.split('_')) {
        if (property in publisher) {
          publisher = publisher[property];
        } else {
          return '';
        }
      }

      return publisher;
    } else {
      return getExtendedPublisher(userId, projectId, language)[key];
    }
  },
  'publisher.insert': ({ language, projectId }, publisher) => {
    checkPermissions(projectId);

    try {
      let userObj = {};

      for (let property in publisher) {
        let propertyObj = publisher[property];

        for (let [index, part] of property.split('_').reverse().entries()) {
          propertyObj = {[part]: propertyObj};
        }

        userObj = objectAssignDeep(userObj, propertyObj);
      }

      userObj.roles = {
        [projectId]: ['member']
      };

      Users.persistence.insert(userObj);
      return publisher._id;
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.update': ({ language, projectId, userId }, key, value) => {
    checkPermissions(projectId, userId);

    try {
      Users.persistence.update(userId, key.replace(/_/g, '.'), value);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.password.insert': ({ projectId, userId }, passwords) => {
    checkPermissions(projectId, userId);

    try {
      PasswordsSchema.validate(passwords);

      Accounts.setPassword(userId, passwords.password);

      return userId;
    } catch(e) {
      for (let detail of e.details) {
        if (detail.type == 'minString') {
          detail.type = 'minString8';
        }
      }

      throw new Meteor.Error(e);
    }
  },
  'publisher.password.reset': ({ language, projectId, userId }) => {
    checkPermissions(projectId, userId);

    try {
      const token = Random.id(43);
      const publisher = Users.findOne(userId, {
        fields: {
          'profile.email': 1,
          'profile.language': 1
        }
      });

      if (publisher.profile.email == '') {
        throw new Meteor.Error('userHasNoEmail');
      }

      Users.update(userId, {
        $set: {
          'services.password.reset': {
            token: token
          }
        }
      });

      const data = {
        recipient: publisher.profile.email,
        sender: 'JW Management',
        from: 'support@jwmanagement.org',
        subject: TAPi18n.__('mail.resetPassword.subject', '', publisher.profile.language),
        template: 'resetPassword',
        language: publisher.profile.language,
        data: {
          token: token,
          language: publisher.profile.language,
          content: getMailTexts('resetPassword', publisher.profile.language)
        }
      };

      data.data.global = {
        footer: TAPi18n.__('mail.footer', '', data.language),
        link: TAPi18n.__('mail.link', '', data.language)
      }

      Mailer.send({
        to: data.recipient,
        from: data.sender + ' <no-reply@jwmanagement.org>',
        replyTo: data.sender + '<' + data.from + '>',
        subject: data.subject,
        template: data.template,
        data: data.data
      });
    } catch(e) {
      console.log(e);
      throw new Meteor.Error(e);
    }
  },
  'publisher.invite': ({ language, projectId, userId }) => {
    checkPermissions(projectId, userId);

    try {
      const token = Random.id(43);
      const project = Projects.findOne(projectId, {
        fields: {
          name: 1
        },
        email: 1
      });
      const publisher = Users.findOne(userId, {
        fields: {
          'profile.email': 1,
          'profile.firstname': 1,
          'profile.lastname': 1,
          'profile.language': 1,
          state: 1
        }
      });

      Users.update(userId, {
        $set: {
          'services.password.reset': {
            token: token
          }
        }
      });

      MailManager.sendMail({
        recipient: publisher.profile.email,
        sender: project.name,
        from: project.email,
        subject: TAPi18n.__('mail.accountCreated.subject', '', publisher.profile.language),
        template: 'accountCreated',
        language: publisher.profile.language,
        data: {
          token: token,
          project: project.name,
          name: publisher.profile.firstname + ' ' + publisher.profile.lastname,
          language: publisher.profile.language,
          content: getMailTexts('accountCreated', publisher.profile.language)
        }
      });

      if (publisher.state == 'created') {
        Users.update(userId, {
          $set: {
            state: State.INVITED
          }
        });
      }
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.removeFromProject': ({ projectId, userId }) => {
    checkPermissions(projectId, userId);

    try {
      RoleManager.removeProjectPermission(projectId, userId);

      const project = Projects.findOne(projectId, { fields: { 'tags._id': 1 }});

      if (project && project.tags) {
        for (let tag of project.tags) {
          RoleManager.removeTagPermission(tag._id, userId);
        }

        for (let group of Roles.getGroupsForUser(userId)) {
          if (RoleManager.hasPermission(projectId, Permissions.member.concat(Permissions.participant), userId)) {
            return;
          }
        }
      }

      if (!RoleManager.hasPermissions(userId)) {
        Users.remove(userId);
      }
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.profile.availability.insert': ({ language, projectId, userId, key }, timeslot) => {
    checkPermissions(projectId, userId);

    try {
      const publisher = Users.findOne(userId);
      const day = key.split('_').pop().substring(0, 2);
      const timeslotStart = parseInt(timeslot.start) * 100;
      const timeslotEnd = parseInt(timeslot.end) * 100;
      let newTimeslots = [];
      let mergedTimeslots = [];
      let time = timeslotStart;
      const validationErrors = [];

      if (isNaN(timeslotStart)) {
        validationErrors.push({
          name: 'start',
          type: 'required'
        });
      }

      if (isNaN(timeslotEnd)) {
        validationErrors.push({
          name: 'end',
          type: 'required'
        });
      }

      if (timeslotEnd < timeslotStart) {
        validationErrors.push({
          name: 'end',
          type: 'hasToBeBigger'
        });
      }

      if (validationErrors.length > 0) {
        throw new ValidationError(validationErrors);
      }

      while (time <= timeslotEnd) {
        newTimeslots.push(time);
        time += 100;
      }

      if (publisher.profile.available == null) {
        publisher.profile.available = {};

        Users.persistence.update(userId, 'profile.available', {});
      }

      if (Object.keys(publisher.profile.available).indexOf(day) == -1) {
        publisher.profile.available[day] = [];
      }

      for (let userDay in publisher.profile.available) {
        if (userDay == day) {
          mergedTimeslots = publisher.profile.available[userDay];

          for (let newTimeslot of newTimeslots) {
            if (mergedTimeslots.indexOf(newTimeslot) == -1) {
              mergedTimeslots.push(newTimeslot);
            }
          }
        }
      }

      Users.persistence.update(userId, 'profile.available.' + day, mergedTimeslots);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.profile.availability.get': ({ language, projectId, userId, key }) => {
    checkPermissions(projectId, userId);

    const publisher = getExtendedPublisher(userId, projectId, language);
    const timeslots = publisher.profile.availability[key.split('_').pop()].map((obj) => {
      return {
        _id: obj.numbers.join(','),
        timeslot: obj.timeslot
      };
    });

    return {
      availability: timeslots
    };
  },
  'publisher.profile.availability.delete': ({ language, projectId, userId, key }, timeslot) => {
    checkPermissions(projectId, userId);

    const publisher = Users.findOne(userId);
    const day = key.split('_').pop().substring(0, 2);
    let newTimeslots = [];

    for (let userDay in publisher.profile.available) {
      if (userDay == day) {
        const oldTimeslots = publisher.profile.available[userDay];
        const delTimeslots = timeslot.split(',');

        for (let oldTimeslot of oldTimeslots) {
          if (delTimeslots.indexOf('' + oldTimeslot) == -1) {
            newTimeslots.push(oldTimeslot);
          }
        }
      }
    }

    try {
      Users.persistence.update(userId, 'profile.available.' + day, newTimeslots);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.profile.vacation.insert': ({ language, projectId, userId, key }, newVacation) => {
    checkPermissions(projectId, userId);

    try {
      let vacations = getExtendedPublisher(userId, projectId, language).profile.vacations;

      // support legacy format
      for (let vacation of vacations) {
        if (vacation.createdAt == null) {
          vacation.start = parseInt(moment(vacation.start, 'YYYYDDD').format('YYYYMMDD'));
          vacation.end = parseInt(moment(vacation.end, 'YYYYDDD').format('YYYYMMDD'));
        }
      }

      vacations.push({
        start: newVacation.start,
        end: newVacation.end
      });

      Users.persistence.update(userId, 'profile.vacations', vacations);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  },
  'publisher.profile.vacation.delete': ({ language, projectId, userId }, vacationId) => {
    checkPermissions(projectId, userId);

    try {
      const vacations = getExtendedPublisher(userId, projectId, language).profile.vacations;
      let newVacations = [];

      for (let vacation of vacations) {
        if (vacation._id != vacationId) {
          newVacations.push(vacation);
        }
      }

      Users.persistence.update(userId, 'profile.vacations', newVacations);
    } catch(e) {
      throw new Meteor.Error(e);
    }
  }
});

function getExtendedPublisher(userId, projectId, language) {
  let publisher = Users.findOne({
    $and: [{
      _id: userId
    }, {
      ['roles.' + projectId]: {
        $in: Permissions.member
      }
    }, {
      username: {
        $ne: 'adm'
      }
    }]
  }, {
    fields: {
      username: 1,
      'profile.firstname': 1,
      'profile.lastname': 1,
      'profile.email': 1,
      'profile.telefon': 1,
      'profile.gender': 1,
      'profile.pioneer': 1,
      'profile.privilege': 1,
      'profile.languages': 1,
      'profile.available': 1,
      'profile.shortTermCalls': 1,
      'profile.shortTermCallsAlways': 1,
      'profile.vacations': 1,
      roles: 1
    }
  });

  if (publisher != undefined) {
    if (publisher.profile.available == null) {
      publisher.profile.available = {};
    }

    publisher.profile.availability = {
      mondays: convertTimeslotToAvailability(publisher.profile.available.mo, language),
      tuesdays: convertTimeslotToAvailability(publisher.profile.available.tu, language),
      wednesdays: convertTimeslotToAvailability(publisher.profile.available.we, language),
      thursdays: convertTimeslotToAvailability(publisher.profile.available.th, language),
      fridays: convertTimeslotToAvailability(publisher.profile.available.fr, language),
      saturdays: convertTimeslotToAvailability(publisher.profile.available.sa, language),
      sundays: convertTimeslotToAvailability(publisher.profile.available.su, language)
    };

    if (publisher.profile.vacations == null) {
      publisher.profile.vacations = [];
    }

    for (let vacation of publisher.profile.vacations) {
      const dateFormatStart = TAPi18n.__('publisher.entity.profile.vacation.startDateFormat', {}, language);
      const dateFormatEnd = TAPi18n.__('publisher.entity.profile.vacation.endDateFormat', {}, language);

      // support legacy number format
      if (vacation.createdAt == null) {
        const startDisplay = moment(vacation.start, 'YYYYDDD').format(dateFormatStart);
        const endDisplay = moment(vacation.end, 'YYYYDDD').format(dateFormatEnd);
        vacation.display = startDisplay + ' ' + endDisplay;
      } else {
        const startDisplay = moment(vacation.start, 'YYYYMMDD').format(dateFormatStart);
        const endDisplay = moment(vacation.end, 'YYYYMMDD').format(dateFormatEnd);
        vacation.display = startDisplay + ' ' + endDisplay;
      }
    }
  }

  return publisher;
}

function convertTimeslotToAvailability(timeslots, language) {
  if (typeof timeslots == 'object' && timeslots.length > 0) {
    const dateFormatStart = TAPi18n.__('publisher.entity.profile.availability.startDateFormat', {}, language);
    const dateFormatEnd = TAPi18n.__('publisher.entity.profile.availability.endDateFormat', {}, language);
    let timePeriods = [];

    timeslots.sort((a, b) => {
      return a - b;
    });

    let periodBegin = -1;
    let lastValue = 0;
    let numbers = [];

    for (let timeslot of timeslots) {
      let timeslotHmm = timeslot;

      if (timeslotHmm == 0) {
        timeslotHmm = 2400;
      }

      if (periodBegin < 0) {
        periodBegin = timeslotHmm;
      } else if (timeslot != lastValue + 100) {
        const timeslotStart = moment(periodBegin, 'Hmm');
        const timeslotEnd = moment(lastValue + 100, 'Hmm');

        if (periodBegin == 2400 && lastValue == 2300) {
          timePeriods.push({
            numbers: numbers,
            timeslot: TAPi18n.__('publisher.entity.profile.availability.wholeDay', {}, language)
          });
        } else {
          timePeriods.push({
            numbers: numbers,
            timeslot: timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd)
          });
        }

        periodBegin = timeslotHmm;
        numbers = [];
      }

      lastValue = timeslot;
      numbers.push(timeslot);
    }

    const timeslotStart = moment(periodBegin, 'Hmm');
    const timeslotEnd = moment(lastValue + 100, 'Hmm');

    if (periodBegin == 2400 && lastValue == 2300) {
      timePeriods.push({
        numbers: numbers,
        timeslot: TAPi18n.__('publisher.entity.profile.availability.wholeDay', {}, language)
      });
    } else {
      timePeriods.push({
        numbers: numbers,
        timeslot: timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd)
      });
    }

    return timePeriods;
  }

  return [];
}

function checkPermissions(projectId, userId = null) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (project == null) {
    throw new Meteor.Error('projectNotFound');
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, projectId)) {
    throw new Meteor.Error('youAreNotProjectAdmin');
  }

  if (userId != null && !Roles.userIsInRole(userId, Permissions.member, projectId)) {
    throw new Meteor.Error('userIsNotProjectMember');
  }
}

function getMailTexts(mail, language) {
  let values = {};
  values.headline = TAPi18n.__('mail.' + mail + '.headline', '', language);
  values.hello = TAPi18n.__('mail.' + mail + '.hello', '', language);
  values.text1 = TAPi18n.__('mail.' + mail + '.text1', '', language);
  values.text2 = TAPi18n.__('mail.' + mail + '.text2', '', language);
  values.changed = TAPi18n.__('mail.' + mail + '._changed', '', language);
  values.button = TAPi18n.__('mail.' + mail + '.button', '', language);
  return values;
}
