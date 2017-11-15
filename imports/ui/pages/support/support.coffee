import '/imports/ui/components/enquiryList/enquiryList.coffee'
import '/imports/ui/components/allProjects/allProjects.coffee'
import '/imports/ui/components/allUsers/allUsers.coffee'
import '/imports/ui/components/createProjectModal/createProjectModal.coffee'

import './support.tpl.jade'

Template.support.helpers

	isSupport: -> Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
