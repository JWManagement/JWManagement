import { Permissions } from '/imports/api/util/permissions.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

Template.registerHelper 'isProjectAdmin', -> Roles.userIsInRole Meteor.userId(), Permissions.admin, FR.getProjectId()
