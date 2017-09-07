import '/imports/api/projects/projects.coffee'
import '/imports/api/messages/messages.coffee'
import '/imports/api/reports/reports.coffee'

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'

import '/imports/ui/pages/support/server/support.coffee'
import '/imports/ui/pages/vessels/server/vessel.coffee'
import '/imports/ui/pages/vessels/server/vessels.coffee'

Impersonate.admins = ['support']

SimpleSchemaHelper.init()
