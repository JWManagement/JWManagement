#import { Projects } from '/imports/api/projects/projects.coffee'
#import { Dialogs } from '/imports/api/util/dialogs.coffee'
#import { Delay } from '/imports/api/util/delay.coffee'
#import { FR } from '/imports/api/util/flowrouter.coffee'

import './adminNavigation.tpl.jade'

Template.adminNavigation.helpers

	#data: -> Template.currentData().data

	#getLanguages: -> Object.keys(TAPi18n.getLanguages()).map (language) ->
	#	a = TAPi18n.getLanguages()[language]
	#	_id: language, name: a.name, en: a.en
