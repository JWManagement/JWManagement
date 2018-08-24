import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { ValidationError } from 'meteor/mdg:validation-error';
import moment from 'moment';

import Users from '/imports/api/users/Users';
import Permissions from '/imports/framework/Constants/Permissions';

function getTimePeriodOrWholeDay(periodBegin, lastValue, numbers, language) {
  if (periodBegin == 2400 && lastValue == 2300) {
    return {
      numbers: numbers,
      timeslot: TAPi18n.__('publisher.entity.profile.availability.wholeDay', {}, language)
    };
  }

  const dateFormatStart = TAPi18n.__('publisher.entity.profile.availability.startDateFormat', {}, language);
  const dateFormatEnd = TAPi18n.__('publisher.entity.profile.availability.endDateFormat', {}, language);

  return {
    numbers: numbers,
    timeslot: `${moment(periodBegin, 'Hmm').format(dateFormatStart)} ${moment(lastValue + 100, 'Hmm').format(dateFormatEnd)}`
  };
}

function convertTimeslotToAvailability(timeslots, language) {
  if (typeof timeslots == 'object' && timeslots.length > 0) {
    let timePeriods = [];

    timeslots.sort((a, b) => a - b);

    let periodBegin = -1;
    let lastValue = 0;
    let numbers = [];

    for (let timeslot of timeslots) {
      let timeslotHmm = timeslot;

      if (periodBegin < 0) {
        periodBegin = timeslotHmm == 0 ? 2400 : timeslotHmm;
      } else if (timeslot != lastValue + 100) {
        timePeriods.push(getTimePeriodOrWholeDay(periodBegin, lastValue, numbers, language));

        periodBegin = timeslotHmm;
        numbers = [];
      }

      lastValue = timeslot;
      numbers.push(timeslot);
    }

    timePeriods.push(getTimePeriodOrWholeDay(periodBegin, lastValue, numbers, language));

    return timePeriods;
  }

  return [];
}


function getExtendedPublisher(userId, projectId) {
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

    const language = Meteor.user().profile.language;

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

function validateAvailabilityInsert(timeslotStart, timeslotEnd) {
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
}

function getMergedTimeslots(publisher, day, newTimeslots) {
  let mergedTimeslots = [];

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

  return mergedTimeslots;
}

function getNewTimeslots(timeslotStart, timeslotEnd) {
  let time = timeslotStart;
  let newTimeslots = [];

  while (time <= timeslotEnd) {
    newTimeslots.push(time);
    time += 100;
  }

  return newTimeslots;
}

export {
  getExtendedPublisher,
  validateAvailabilityInsert,
  getMergedTimeslots,
  getNewTimeslots
};
