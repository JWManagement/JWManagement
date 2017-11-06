import '/imports/api/projects/projects.coffee'
import '/imports/api/messages/messages.coffee'
import '/imports/api/reports/reports.coffee'

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'

import '/imports/ui/pages/vessel/server/vessel.coffee'
import '/imports/ui/pages/vessels/server/vessels.coffee'

import '/imports/ui/components/allUsers/server/support.users.coffee'
import '/imports/ui/components/allProjects/server/support.projects.coffee'
import '/imports/ui/components/enquiryList/server/support.messages.coffee'

Impersonate.admins = ['support']

SimpleSchemaHelper.init()
