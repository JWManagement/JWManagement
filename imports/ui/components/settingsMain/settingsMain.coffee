import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './settingsMain.tpl.jade'

Template.settingsMain.helpers

	data: -> Template.currentData().data

Template.settingsMain.onRendered ->

Template.settingsMain.events
