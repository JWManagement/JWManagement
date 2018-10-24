import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import moment from 'moment'
import Permissions from '../../framework/Constants/Permissions'
import { checkPermissions } from '../../framework/Functions/Security'

function publisherPermissionsGet ({ projectId, userId }) {
  checkPermissions(projectId, userId)

  const project = Projects.findOne(projectId, {
    fields: {
      'tags._id': 1,
      'tags.name': 1
    }
  })

  let tags = []

  for (let tag of project.tags) {
    const tagPermissions = Roles.getRolesForUser(userId, tag._id)

    if (tagPermissions.length > 0) {
      tags.push({
        _id: tag._id,
        tag: tag.name,
        role: tagPermissions[0]
      })
    } else {
      tags.push({
        _id: tag._id,
        tag: tag.name,
        role: 'none'
      })
    }
  }

  return {
    project: Roles.getRolesForUser(userId, projectId)[0],
    tags: tags
  }
}

// PROJECT

function publisherPermissionsProjectGet ({ projectId, userId }) {
  checkPermissions(projectId, userId)

  return Roles.getRolesForUser(userId, projectId)[0]
}

function publisherPermissionsUpdate ({ projectId, userId }, key, value) {
  checkPermissions(projectId, userId)

  if (Permissions.member.includes(value)) {
    Roles.removeUsersFromRoles(userId, Permissions.member, projectId)
    Roles.setUserRoles(userId, value, projectId)
    return true
  }

  throw new Meteor.Error('Permission type not supported')
}

// TAG

function publisherPermissionsTagsGet ({ projectId, userId, tagId }) {
  checkPermissions(projectId, userId)

  const role = Roles.getRolesForUser(userId, tagId)[0]

  return {
    role: role
  }
}

function publisherPermissionsTagGet ({ projectId, userId, tagId }) {
  checkPermissions(projectId, userId)

  return Roles.getRolesForUser(userId, tagId)[0]
}

function publisherPermissionsTagUpdate ({ projectId, userId, tagId }, key, value) {
  checkPermissions(projectId, userId)

  if (Permissions.participantWithNone.includes(value)) {
    Roles.removeUsersFromRoles(userId, Permissions.participant, tagId)

    if (value !== 'none') {
      Roles.setUserRoles(userId, value, tagId)
    }

    let i
    let j
    let k
    let l
    let len
    let len1
    let len2
    let len3
    let len4
    let m
    let ref
    let ref1
    let setSubstituteTeamleader
    let setTeamleader
    let shift
    let shifts
    let team
    let u
    let updatedDeclined
    let updatedParticipants
    let updatedPending
    let user
    let indexOf = [].indexOf
    const permission = value

    let tagPermissions = Permissions.participant

    const project = Projects.findOne({ 'tags._id': tagId }, { fields: { _id: 1 } })

    if (indexOf.call(tagPermissions, permission) >= 0) {
      if (Roles.userIsInRole(userId, tagPermissions, tagId)) {
        Roles.removeUsersFromRoles(userId, tagPermissions, tagId)
        if (permission === 'teamleader') {
          setTeamleader = true
          setSubstituteTeamleader = false
        } else if (permission === 'substituteTeamleader') {
          setTeamleader = false
          setSubstituteTeamleader = true
        } else if (permission === 'participant') {
          setTeamleader = false
          setSubstituteTeamleader = false
        }
        shifts = Shifts.find({
          projectId: project._id,
          tagId: tagId,
          $or: [
            {
              'teams.participants._id': userId
            },
            {
              'teams.pending._id': userId
            },
            {
              'teams.declined._id': userId
            }
          ]
        })

        ref = shifts.fetch()

        for (i = 0, len = ref.length; i < len; i++) {
          shift = ref[i]
          ref1 = shift.teams

          for (j = 0, len1 = ref1.length; j < len1; j++) {
            team = ref1[j]

            if (indexOf.call((function () {
              var k, len2, ref2, results
              ref2 = team.participants
              results = []
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                u = ref2[k]
                results.push(u._id)
              }
              return results
            })(), userId) >= 0) {
              updatedParticipants = team.participants

              for (k = 0, len2 = updatedParticipants.length; k < len2; k++) {
                user = updatedParticipants[k]
                if (!(user._id === userId)) {
                  continue
                }
                user.teamleader = setTeamleader
                user.substituteTeamleader = setSubstituteTeamleader
              }

              Shifts.update({
                _id: shift._id,
                'teams._id': team._id
              }, {
                $set: {
                  'teams.$.participants': updatedParticipants
                }
              })
            }
            if (indexOf.call((function () {
              var l, len3, ref2, results
              ref2 = team.pending
              results = []

              for (l = 0, len3 = ref2.length; l < len3; l++) {
                u = ref2[l]
                results.push(u._id)
              }
              return results
            })(), userId) >= 0) {
              updatedPending = team.pending
              for (l = 0, len3 = updatedPending.length; l < len3; l++) {
                user = updatedPending[l]
                if (!(user._id === userId)) {
                  continue
                }
                user.teamleader = setTeamleader
                user.substituteTeamleader = setSubstituteTeamleader
              }
              Shifts.update({
                _id: shift._id,
                'teams._id': team._id
              }, {
                $set: {
                  'teams.$.pending': updatedPending
                }
              })
            }
            if (indexOf.call((function () {
              var len4, m, ref2, results
              ref2 = team.declined.filter(function (u) {
                return u != null
              })
              results = []
              for (m = 0, len4 = ref2.length; m < len4; m++) {
                u = ref2[m]
                results.push(u._id)
              }
              return results
            })(), userId) >= 0) {
              updatedDeclined = team.participants
              for (m = 0, len4 = updatedDeclined.length; m < len4; m++) {
                user = updatedDeclined[m]
                if (!(user._id === userId)) {
                  continue
                }
                user.teamleader = setTeamleader
                user.substituteTeamleader = setSubstituteTeamleader
              }
              Shifts.update({
                _id: shift._id,
                'teams._id': team._id
              }, {
                $set: {
                  'teams.$.declined': updatedDeclined
                }
              })
            }
          }
        }
      }

      Roles.addUsersToRoles(userId, permission, tagId)
    } else if (permission === 'none') {
      if (Roles.userIsInRole(userId, tagPermissions, tagId)) {
        Roles.removeUsersFromRoles(userId, tagPermissions, tagId)

        Shifts.update({
          projectId: project._id,
          tagId: tagId,
          date: {
            $gt: parseInt(moment(new Date()).format('YYYYDDDD'))
          },
          'teams.participants._id': userId
        }, {
          $pull: {
            'teams.$.participants': {
              _id: userId
            }
          }
        }, {
          multi: true
        })

        Shifts.update({
          projectId: project._id,
          tagId: tagId,
          date: {
            $gt: parseInt(moment(new Date()).format('YYYYDDDD'))
          },
          'teams.pending._id': userId
        }, {
          $pull: {
            'teams.$.pending': {
              _id: userId
            }
          }
        }, {
          multi: true
        })

        Shifts.update({
          projectId: project._id,
          tagId: tagId,
          date: {
            $gt: parseInt(moment(new Date()).format('YYYYDDDD'))
          },
          'teams.declined._id': userId
        }, {
          $pull: {
            'teams.$.declined': {
              _id: userId
            }
          }
        }, {
          multi: true
        })
      }
    } else {
      throw new Meteor.Error(500, 'Role ' + permission + ' invalid')
    }

    return true
  }

  throw new Meteor.Error('Permission type not supported')
}

export {
  publisherPermissionsGet,
  publisherPermissionsProjectGet,
  publisherPermissionsUpdate,
  publisherPermissionsTagsGet,
  publisherPermissionsTagGet,
  publisherPermissionsTagUpdate
}
