import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { ValidationError } from 'meteor/mdg:validation-error'
import SimpleSchema from 'simpl-schema'

import Permissions from '../../framework/Constants/Permissions'
import RoleManager from '../../framework/Managers/RoleManager'
import SystemLanguages from '../../framework/Constants/SystemLanguages';

Meteor.methods({
  'project.search' ({ searchString, limit }) {
    if (!Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
      return []
    }

    const result = {
      total: 0,
      items: []
    }

    if (typeof searchString !== 'string' || searchString === '') {
      return result
    }

    const regEx = new RegExp(searchString, 'i')

    const cursor = Projects.find({
      $or: [
        { _id: searchString },
        { name: regEx }
      ]
    }, {
      fields: {
        'name': 1
      },
      sort: {
        name: 1
      },
      limit: limit
    })

    result.total = cursor.count()
    result.items = cursor.fetch()

    return result
  },
  'project.get' ({ projectId }) {
    const project = Projects.findOne(projectId, {
      fields: {
        name: 1,
        'news.text': 1,
        vesselModule: 1
      }
    })

    if (project == null) {
      throw new Meteor.Error('projectNotFound')
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
      throw new Meteor.Error('youAreNotProjectAdmin')
    }

    return project
  },
  'project.insert' (_, project) {
    const validationContext = new SimpleSchema({
      name: { type: String, min: 3 },
      email: { type: String, regEx: SimpleSchema.RegEx.Email },
      language: { type: String, min: 2, allowedValues: SystemLanguages.allowedValues }
    }).newContext()

    validationContext.validate(project)

    if (!validationContext.isValid()) {
      throw new ValidationError(validationContext.validationErrors())
    }

    if (!Meteor.userId()) {
      throw Meteor.Error('must be logged in to create new project')
    }

    const projectId = Projects.insert({
      name: project.name,
      email: project.email,
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
  },
  'project.leave' ({ projectId }) {
    const project = Projects.findOne(projectId, { fields: { 'tags._id': 1 } })

    if (project == null) {
      throw new Meteor.Error('projectNotFound')
    }

    try {
      const userId = Meteor.userId()

      RoleManager.removeProjectPermission(projectId, userId)

      if (project && project.tags) {
        for (let tag of project.tags) {
          RoleManager.removeTagPermission(tag._id, userId)
        }
      }
    } catch (e) {
      throw new Meteor.Error(e)
    }
  },
  'project.support.get' () {
    return {
      phone: '+49 177 3291529',
      email: 'support@jwmanagement.org'
    }
  },
})
