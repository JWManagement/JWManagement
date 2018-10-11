import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { ValidationError } from 'meteor/mdg:validation-error'

import SimpleSchema from 'simpl-schema'

import Permissions from '/imports/framework/Constants/Permissions'

export const createProject = Meteor.methods({
  'project.insert' (_, project) {
    const validationContext = new SimpleSchema({
      projectName: { type: String, min: 3 },
      projectEmail: { type: String, regEx: SimpleSchema.RegEx.Email },
      language: { type: String, min: 2 }
    }).newContext()

    validationContext.validate(project)

    if (!validationContext.isValid()) {
      throw new ValidationError(validationContext.validationErrors())
    }

    if (!Meteor.userId()) {
      throw Meteor.Error('must be logged in to create new project')
    }

    const projectId = Projects.insert({
      name: project.projectName,
      email: project.projectEmail,
      language: project.language,
      news: {},
      wiki: {
        tabs: []
      },
      tags: [],
      teams: [],
      meetings: [],
      store: {}
    })

    Roles.addUsersToRoles(Meteor.userId(), Permissions.admin, projectId)

    return projectId
  }
})
