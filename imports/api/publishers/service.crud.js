import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import objectAssignDeep from 'object-assign-deep'
import { checkPermissions } from '../../framework/Functions/Security'
import Permissions from '../../framework/Constants/Permissions'
import Users from '../users/Users'
import { getExtendedPublisher } from './Functions'
import { validate } from '../../framework/Functions/validations'
import { defaultValidations } from '../../framework/Functions/defaultValidations'
import Gender from '../../framework/Constants/Gender'
import Pioneer from '../../framework/Constants/Pioneer'
import Privilege from '../../framework/Constants/Privilege'
import SystemLanguages from '../../framework/Constants/SystemLanguages'

function publisherSearch ({ projectId, searchString, limit }) {
  checkPermissions(projectId)

  let rolesObject = {}
  let result = {
    total: 0,
    items: []
  }

  if (typeof searchString !== 'string' || searchString === '') {
    return result
  }

  const regEx = new RegExp(searchString, 'i')

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
  })

  result.total = cursor.count()
  result.items = cursor.fetch()

  return result
}

function publisherGet ({ projectId, userId }) {
  checkPermissions(projectId, userId)

  const publisher = getExtendedPublisher(userId, projectId)

  if (publisher != null) {
    publisher.profile.availability = {
      mondays: publisher.profile.availability.mondays.map((x) => { return x.timeslot }).join(', '),
      tuesdays: publisher.profile.availability.tuesdays.map((x) => { return x.timeslot }).join(', '),
      wednesdays: publisher.profile.availability.wednesdays.map((x) => { return x.timeslot }).join(', '),
      thursdays: publisher.profile.availability.thursdays.map((x) => { return x.timeslot }).join(', '),
      fridays: publisher.profile.availability.fridays.map((x) => { return x.timeslot }).join(', '),
      saturdays: publisher.profile.availability.saturdays.map((x) => { return x.timeslot }).join(', '),
      sundays: publisher.profile.availability.sundays.map((x) => { return x.timeslot }).join(', ')
    }
  }

  delete publisher.roles

  return publisher
}

function publisherGetField ({ projectId, userId, key }) {
  checkPermissions(projectId, userId)

  let publisher = getExtendedPublisher(userId, projectId)

  if (key.indexOf('_') > -1) {
    for (let property of key.split('_')) {
      if (property in publisher) {
        publisher = publisher[property]
      } else {
        return ''
      }
    }

    return publisher
  }

  return getExtendedPublisher(userId, projectId)[key]
}

function publisherInsert ({ projectId }, publisher) {
  validate('publisher', {
    ...defaultValidations.projectAdmin,
    username: {
      type: String,
      optional: true
    },
    'profile_firstname': String,
    'profile_lastname': String,
    'profile_email': {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    'profile_gender': {
      type: String,
      allowedValues: Gender.allowedValues
    },
    'profile_congregation': {
      type: String,
      optional: true
    },
    'profile_language': {
      type: String,
      allowedValues: SystemLanguages.allowedValues
    },
    'profile_languages': {
      type: String,
      optional: true
    },
    'profile_pioneer': {
      type: String,
      allowedValues: Pioneer.allowedValues
    },
    'profile_privilege': {
      type: String,
      allowedValues: Privilege.allowedValues
    },
    'profile_telefon': {
      type: String,
      optional: true
    }
  }, {
    projectId,
    ...publisher
  })

  try {
    let userObj = {}

    for (let property in publisher) {
      let propertyObj = publisher[property]

      for (let part of property.split('_').reverse()) {
        propertyObj = { [part]: propertyObj }
      }

      userObj = objectAssignDeep(userObj, propertyObj)
    }

    userObj.roles = {
      [projectId]: ['member']
    }

    Users.persistence.insert(userObj)
    return publisher._id
  } catch (e) {
    throw new Meteor.Error(e)
  }
}

function publisherUpdate ({ projectId, userId }, key, value) {
  checkPermissions(projectId, userId)

  try {
    Users.persistence.update(userId, key.replace(/_/g, '.'), value)
  } catch (e) {
    throw new Meteor.Error(e)
  }
}

export {
  publisherSearch,
  publisherGet,
  publisherGetField,
  publisherInsert,
  publisherUpdate
}
