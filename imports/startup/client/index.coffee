import '/imports/api/projects/projects.coffee'

import '/imports/ui/pages/support/support.coffee'
import '/imports/ui/pages/vessels/vessels.js'
import '/imports/ui/pages/vessel/vessel.js'

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'

import './mainRoutes.coffee'
import './projectRoutes.coffee'
import './policyRoutes.coffee'

SimpleSchemaHelper.init()

Tracker.autorun -> $('body').attr('page', FlowRouter.getRouteName())
