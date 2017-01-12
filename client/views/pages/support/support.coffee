initDone = false

Template.support.helpers

Template.support.onCreated ->

	self = this

	drawProjectlist = -> if initDone
		Tracker.afterFlush ->
			projects = Projects.find {},
				fields: name: 1
			,
				sort: name: 1

			rows = []
			columns = [
				{ name: 'id', title: '#', breakpoints: '', filterable: false }
				{ name: '_id', title: 'ID', breakpoints: '', filterable: false }
				{ name: 'name', title: 'Name' , breakpoints: '' }
			]


			for project, index in projects.fetch()
				rows.push
					id: index + 1
					_id: project._id
					name: project.name

			$('#projectTable').html('').footable
				columns: columns
				rows: rows
				paging: enabled: false
				sorting:
					enabled: true
				filtering:
					enabled: true
					delay: 400
					placeholder: TAPi18n.__('users.search')
				state:
					enabled: true
					key: 'projectTable'

	@autorun ->
		handle = ProjectSubs.subscribe 'support'
		if handle.ready()
			Projects.find().observe
				added: drawProjectlist
				changed: drawProjectlist
				removed: drawProjectlist

			initDone = true

			drawProjectlist()

Template.support.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.support.onDestroyed ->

Template.support.events
