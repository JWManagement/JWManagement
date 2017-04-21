import { Projects } from '/imports/api/projects/projects.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import '/imports/ui/components/modals/modal.coffee'
import '/imports/ui/components/settingsMain/settingsMain.coffee'
import '/imports/ui/components/settingsTags/settingsTags.coffee'

import './settings.tpl.jade'
import './settings.scss'

Template.settings.helpers

Template.settings.onCreated ->

	Meteor.subscribe 'settings', FR.getProjectId()

Template.settings.events
