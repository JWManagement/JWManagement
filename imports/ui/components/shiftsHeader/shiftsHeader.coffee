import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './shiftsHeader.tpl.jade'
import './shiftsHeader.scss'

Template.shiftsHeader.helpers

Template.shiftsHeader.onCreated ->

	@autorun -> Meteor.subscribe 'futureWeeks', FR.getProjectId(), FR.getShowWeek()

Template.shiftsHeader.events
