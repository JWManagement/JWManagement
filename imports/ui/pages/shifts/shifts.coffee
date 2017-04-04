import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import '/imports/ui/components/modals/modal.coffee'
import '/imports/ui/components/shiftsHeader/shiftsHeader.coffee'

import './shifts.tpl.jade'
import './shifts.scss'

Template.shifts.helpers

Template.shifts.onCreated ->

Template.shifts.onDestroyed ->

	Session.set 'target', undefined
