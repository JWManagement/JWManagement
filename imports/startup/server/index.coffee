import '/imports/api/messages/messages.coffee'
import '/imports/api/reports/reports.coffee'

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'

import '/imports/ui/pages/vessels/server/vessel.coffee'
import '/imports/ui/pages/vessels/server/vessels.coffee'

Impersonate.admins = ['support']

SimpleSchemaHelper.init()
