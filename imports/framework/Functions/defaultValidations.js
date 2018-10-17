import { validateProjectId, validateUserId, validateVesselId, validateVisitId } from './validations1'
import Permissions from '../Constants/Permissions'

const defaultValidations = {
  projectAdmin: {
    projectId: {
      type: String,
      custom () {
        validateProjectId(this.value, Permissions.admin)
      }
    }
  },
  projectAdminAndUserMember: {
    projectId: {
      type: String,
      custom () {
        validateProjectId(this.value, Permissions.admin)
      }
    },
    userId: {
      type: String,
      custom () {
        validateUserId(
          this.value,
          this.field('projectId').value,
          Permissions.member)
      }
    }
  },
  projectWithVesselModule: {
    projectId: {
      type: String,
      custom () {
        validateProjectId(this.value, Permissions.member, true)
      }
    }
  },
  vessel: {
    vesselId: {
      type: String,
      custom () {
        validateVesselId(this.value, this.field('projectId').value)
      }
    }
  },
  visit: {
    visitId: {
      type: String,
      custom () {
        validateVisitId(
          this.value,
          this.field('vesselId').value,
          this.field('projectId').value)
      }
    }
  }
}

export { defaultValidations }
