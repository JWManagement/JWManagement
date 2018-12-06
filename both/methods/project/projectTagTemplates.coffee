import moment from 'moment'

Meteor.methods

	addTemplate: (projectId, tagId, name) ->
		templateId = Random.id 9
		weekId = Random.id 11

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Projects.update _id: projectId, 'tags._id': tagId,
			$addToSet: 'tags.$.templates':
				_id: templateId
				weekId: weekId
				name: name
				interval: 'm'
				startWeek: moment(new Date).format('GGGG[W]WW')
				endWeek: moment(new Date).format('GGGG[W]WW')
				visiblePeriod: 8

		Weeks.insert
			_id: weekId
			projectId: projectId
			days: [
				{ day: 1, shifts: [] }
				{ day: 2, shifts: [] }
				{ day: 3, shifts: [] }
				{ day: 4, shifts: [] }
				{ day: 5, shifts: [] }
				{ day: 6, shifts: [] }
				{ day: 7, shifts: [] }
			]

	updateTemplate: (projectId, tagId, templateId, field, value) ->
		templates = {}
		project = Projects.findOne projectId, fields: 'tags._id': 1, 'tags.templates': 1

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		if field != 'name' or value.trim() != ''
			for tag in project.tags
				if tag._id == tagId
					templates = tag.templates

			for def in templates
				if def._id == templateId
					def[field] = value

			Projects.update _id: projectId, 'tags._id': tagId,
				$set: 'tags.$.templates': templates
		else
			throw new Meteor.Error 500, 'Name cannot be empty'

	removeTemplate: (projectId, tagId, templateId, weekId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		weekId = ''
		project = Projects.findOne projectId, fields: 'tags._id': 1, 'tags.templates': 1

		Projects.update _id: projectId, 'tags._id': tagId,
			$pull: 'tags.$.templates': _id: templateId

		if Meteor.isServer
			for tag in project.tags
				if tag._id == tagId
					templates = tag.templates

			for def in templates
				if def._id == templateId
					weekId = def.weekId

			week = Weeks.findOne weekId

			if week?
				for day in week.days
					for shift in day.shifts
						Shifts.remove shift

				Weeks.remove weekId
			else
				throw new Meteor.Error 404, 'Week ' + weekId + ' not found'
