import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';

import Users from '/imports/api/users/Users';
import Permissions from '/imports/api/util/Permissions';

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

export { getExtendedPublisher };
