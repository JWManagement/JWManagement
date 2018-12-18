import { Meteor } from 'meteor/meteor'
import i18next from 'i18next'
import moment from 'moment'

import Users from '../users/Users'
import Permissions from '../../framework/Constants/Permissions'

function getTimePeriodOrWholeDay (periodBegin, lastValue, numbers, language) {
  const localTranslate = i18next.getFixedT(language)

  if (periodBegin === 2400 && lastValue === 2300) {
    return {
      numbers: numbers,
      timeslot: localTranslate('publisher.entity.profile.availability.wholeDay')
    }
  }

  const dateFormatStart = localTranslate('publisher.entity.profile.availability.startDateFormat')
  const dateFormatEnd = localTranslate('publisher.entity.profile.availability.endDateFormat')

  moment.locale(language)

  return {
    numbers: numbers,
    timeslot: `${moment(periodBegin, 'Hmm').format(dateFormatStart)} ${moment(lastValue + 100, 'Hmm').format(dateFormatEnd)}`
  }
}

function convertTimeslotToAvailability (timeslots, language) {
  if (typeof timeslots === 'object' && timeslots.length > 0) {
    let timePeriods = []

    timeslots.sort((a, b) => a - b)

    let periodBegin = -1
    let lastValue = 0
    let numbers = []

    for (let timeslot of timeslots) {
      let timeslotHmm = timeslot

      if (periodBegin < 0) {
        periodBegin = timeslotHmm === 0 ? 2400 : timeslotHmm
      } else if (timeslot !== lastValue + 100) {
        timePeriods.push(getTimePeriodOrWholeDay(periodBegin, lastValue, numbers, language))

        periodBegin = timeslotHmm
        numbers = []
      }

      lastValue = timeslot
      numbers.push(timeslot)
    }

    timePeriods.push(getTimePeriodOrWholeDay(periodBegin, lastValue, numbers, language))

    return timePeriods
  }

  return []
}

function getExtendedPublisher (userId, projectId) {
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
      'profile.congregation': 1,
      'profile.pioneer': 1,
      'profile.privilege': 1,
      'profile.language': 1,
      'profile.languages': 1,
      'profile.available': 1,
      'profile.shortTermCalls': 1,
      'profile.shortTermCallsAlways': 1,
      'profile.vacations': 1,
      roles: 1
    }
  })

  if (publisher) {
    if (!publisher.profile.available) {
      publisher.profile.available = {}
    }

    const language = Meteor.user().profile.language

    publisher.profile.availability = {
      mondays: convertTimeslotToAvailability(publisher.profile.available.mo, language),
      tuesdays: convertTimeslotToAvailability(publisher.profile.available.tu, language),
      wednesdays: convertTimeslotToAvailability(publisher.profile.available.we, language),
      thursdays: convertTimeslotToAvailability(publisher.profile.available.th, language),
      fridays: convertTimeslotToAvailability(publisher.profile.available.fr, language),
      saturdays: convertTimeslotToAvailability(publisher.profile.available.sa, language),
      sundays: convertTimeslotToAvailability(publisher.profile.available.su, language)
    }

    if (!publisher.profile.vacations) {
      publisher.profile.vacations = []
    }

    moment.locale(language)
    const localTranslate = i18next.getFixedT(language)

    for (let vacation of publisher.profile.vacations) {
      const dateFormatStart = localTranslate('publisher.entity.profile.vacation.startDateFormat')
      const dateFormatEnd = localTranslate('publisher.entity.profile.vacation.endDateFormat')

      // support legacy number format
      if (!vacation.createdAt) {
        const startDisplay = moment(vacation.start, 'YYYYDDD').format(dateFormatStart)
        const endDisplay = moment(vacation.end, 'YYYYDDD').format(dateFormatEnd)
        vacation.display = startDisplay + ' ' + endDisplay
      } else {
        const startDisplay = moment(vacation.start, 'YYYYMMDD').format(dateFormatStart)
        const endDisplay = moment(vacation.end, 'YYYYMMDD').format(dateFormatEnd)
        vacation.display = startDisplay + ' ' + endDisplay
      }
    }
  }

  return publisher
}

function getMergedTimeslots (publisher, day, newTimeslots) {
  let mergedTimeslots = []

  for (let userDay in publisher.profile.available) {
    if (userDay === day) {
      mergedTimeslots = publisher.profile.available[userDay]
      for (let newTimeslot of newTimeslots) {
        if (mergedTimeslots.indexOf(newTimeslot) === -1) {
          mergedTimeslots.push(newTimeslot)
        }
      }
    }
  }

  return mergedTimeslots
}

function getNewTimeslots (timeslotStart, timeslotEnd) {
  let time = timeslotStart
  let newTimeslots = []

  while (time <= timeslotEnd) {
    newTimeslots.push(time)
    time += 100
  }

  return newTimeslots
}

export {
  getExtendedPublisher,
  getMergedTimeslots,
  getNewTimeslots
}
