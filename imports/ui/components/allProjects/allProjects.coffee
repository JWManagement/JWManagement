import { Projects } from '/imports/api/projects/projects.coffee'

import './allProjects.tpl.jade'

Template.allProjects.helpers

	projectCount: -> Projects.find({}, fields: _id: 1).count()

Template.allProjects.onRendered -> Tracker.afterFlush => @autorun =>

	projects = Template.currentData().projects
	rows = []
	columns = [
		{ name: 'id', title: '#', breakpoints: '', filterable: false }
		{ name: '_id', title: 'ID', breakpoints: '' }
		{ name: 'name', title: 'Name' , breakpoints: '' }
		{ name: 'showAdmins', title: 'Action' , breakpoints: '' }
	]

	for project, index in projects
		rows.push
			id: index + 1
			_id: project._id
			name: project.name
			showAdmins: '<a class="showAdmins" data-id="' + project._id + '" href>Show admins...</a>'

	$('#projectTable').html('').footable
		columns: columns
		rows: rows
		paging: enabled: false
		sorting: enabled: true
		paging:
			enabled: true
			size: 15
		filtering:
			enabled: true
			delay: 400
			placeholder: 'Search...'

Template.allProjects.events

	'click .showAdmins': (e) ->
		projectId = $(e.target).attr('data-id')

		$('#userTable .footable-filtering button').click()
		$('#userTable .footable-filtering input[type="text"]').val projectId + '=admin'
		$('#userTable .footable-filtering button').click()
