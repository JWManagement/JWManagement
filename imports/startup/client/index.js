import '/imports/api/projects/projects.coffee'

import './mainRoutes.coffee'
import './projectRoutes.coffee'
import './policyRoutes.coffee'

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'
SimpleSchemaHelper.init();

Tracker.autorun(() => {
	$('body').attr('page', FlowRouter.getRouteName());
});
