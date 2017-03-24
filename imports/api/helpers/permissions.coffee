import { Permissions } from '/imports/util/permissions.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

Template.registerHelper 'isProjectAdmin', -> Roles.userIsInRole Meteor.userId(), Permissions.admin, FR.getProjectId()
