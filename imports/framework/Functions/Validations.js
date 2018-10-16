import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { ValidationError } from 'meteor/mdg:validation-error'
import SimpleSchema from 'simpl-schema'
import Vessels from '../../api/vessels/Vessels'
import Permissions from '../Constants/Permissions'

function validate (name, schema, obj) {
  const validationContext = new SimpleSchema(schema).newContext()

  validationContext.validate(obj)

  if (!validationContext.isValid()) {
    throw new ValidationError(validationContext.validationErrors())
  }

  if (!Meteor.userId()) {
    throw Meteor.Error(`must be logged in to insert a new ${name}`)
  }
}

function validateProjectId (projectId, permission = Permissions.member, checkVesselModule = false) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (!project) {
    return 'projectNotFound'
  }

  if (checkVesselModule && !project.vesselModule) {
    return 'vesselModuleNotEnabled'
  }

  if (!Roles.userIsInRole(Meteor.userId(), permission, projectId)) {
    return 'insufficientPermissions'
  }
}

function validateVesselId (vesselId, projectId) {
  validateProjectId(projectId, Permissions.member, true)

  const vessel = Vessels.findOne(vesselId, { fields: { _id: 1 } })

  if (!vessel) {
    return 'vesselNotFound'
  }
}

function validateVisitId (visitId, vesselId, projectId) {
  validateProjectId(projectId, Permissions.member, true)

  const vessel = Vessels.findOne(vesselId, { fields: { 'visits._id': 1 } })

  if (!vessel) {
    return 'vesselNotFound'
  }

  if (vessel.visits.filter((v) => v._id === visitId).length === 0) {
    return 'visitNotFound'
  }
}

function validateUserId (userId, projectId, permission) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (project == null) {
    throw new Meteor.Error('projectNotFound')
  }

  if (!Roles.userIsInRole(userId, permission, projectId)) {
    throw new ValidationError('insufficientPermissions')
  }
}

export {
  validate,
  validateProjectId,
  validateVesselId,
  validateVisitId,
  validateUserId
}
