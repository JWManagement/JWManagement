import { Projects } from '/imports/api/projects/projects.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import '/imports/ui/components/modals/modal.coffee'
import '/imports/ui/components/settingsMain/settingsMain.coffee'
import '/imports/ui/components/settingsTags/settingsTags.coffee'

import './settings.tpl.jade'
import './settings.scss'

Template.settings.helpers

	getMainData: -> Projects.findOne FR.getProjectId(), fields: name: 1, email: 1, language: 1

	getTagData: -> Projects.findOne FR.getProjectId(), fields: tags: 1

Template.settings.onCreated ->

	Meteor.subscribe 'settings', FR.getProjectId()

Template.settings.events
