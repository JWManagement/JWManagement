import { Meteor } from 'meteor/meteor'
import { checkPermissions } from '../../framework/Functions/Security'
import Users from '../users/Users'
import { getNewTimeslots, getExtendedPublisher, getMergedTimeslots } from './Functions'
import { validate } from '../../framework/Functions/validations'
import { defaultValidations } from '../../framework/Functions/defaultValidations'

function publisherProfileAvailabilityInsert ({ projectId, userId, key }, timeslot) {
  validate('availability', {
    ...defaultValidations.projectAdminAndUserMember,
    key: String,
    start: Number,
    end: {
      type: Number,
      custom () {
        if (this.value < this.field('start').value) {
          return 'hasToBeBigger'
        }
      }
    }
  }, {
    projectId,
    userId,
    key,
    ...timeslot
  })

  try {
    const timeslotStart = parseInt(timeslot.start, 10) * 100
    const timeslotEnd = parseInt(timeslot.end, 10) * 100

    const publisher = Users.findOne(userId)
    const day = key.split('_').pop().substring(0, 2)

    if (publisher.profile.available == null) {
      publisher.profile.available = {}

      Users.persistence.update(userId, 'profile.available', {})
    }

    if (Object.keys(publisher.profile.available).indexOf(day) === -1) {
      publisher.profile.available[day] = []
    }

    const newTimeslots = getNewTimeslots(timeslotStart, timeslotEnd)
    const mergedTimeslots = getMergedTimeslots(publisher, day, newTimeslots)

    Users.persistence.update(userId, 'profile.available.' + day, mergedTimeslots)
  } catch (e) {
    throw new Meteor.Error(e)
  }
}

function publisherProfileAvailabilityGet ({ projectId, userId, key }) {
  checkPermissions(projectId, userId)

  const publisher = getExtendedPublisher(userId, projectId)
  const timeslots = publisher.profile.availability[key.split('_').pop()].map((obj) => {
    return {
      _id: obj.numbers.join(','),
      timeslot: obj.timeslot
    }
  })

  return {
    availability: timeslots
  }
}

function publisherProfileAvailabilityDelete ({ projectId, userId, key }, timeslot) {
  checkPermissions(projectId, userId)

  const publisher = Users.findOne(userId)
  const day = key.split('_').pop().substring(0, 2)
  let newTimeslots = []

  for (let userDay in publisher.profile.available) {
    if (userDay === day) {
      const oldTimeslots = publisher.profile.available[userDay]
      const delTimeslots = timeslot.split(',')

      for (let oldTimeslot of oldTimeslots) {
        if (delTimeslots.indexOf(String(oldTimeslot)) === -1) {
          newTimeslots.push(oldTimeslot)
        }
      }
    }
  }

  try {
    Users.persistence.update(userId, 'profile.available.' + day, newTimeslots)
  } catch (e) {
    throw new Meteor.Error(e)
  }
}

export {
  publisherProfileAvailabilityGet,
  publisherProfileAvailabilityInsert,
  publisherProfileAvailabilityDelete
}
