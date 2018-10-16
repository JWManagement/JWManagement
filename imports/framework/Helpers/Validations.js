import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import Vessels from '../../api/vessels/Vessels'
import Permissions from '../Constants/Permissions'

function validateProjectId (projectId, checkVesselModule = false) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (!project) {
    return 'projectNotFound'
  }

  if (checkVesselModule && !project.vesselModule) {
    return 'vesselModuleNotEnabled'
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
    return 'userNotProjectMember'
  }
}

function validateVesselId (vesselId, projectId) {
  validateProjectId(projectId, true)

  const vessel = Vessels.findOne(vesselId, { fields: { _id: 1 } })

  if (!vessel) {
    return 'vesselNotFound'
  }
}

function validateVisitId (visitId, vesselId, projectId) {
  validateProjectId(projectId, true)

  const vessel = Vessels.findOne(vesselId, { fields: { 'visits._id': 1 } })

  if (!vessel) {
    return 'vesselNotFound'
  }

  if (vessel.visits.filter((v) => v._id === visitId).length === 0) {
    return 'visitNotFound'
  }
}

export { validateProjectId, validateVesselId, validateVisitId }
