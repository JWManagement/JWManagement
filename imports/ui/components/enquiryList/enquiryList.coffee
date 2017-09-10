import { Messages } from '/imports/api/messages/messages.coffee'

import '/imports/ui/components/enquiryList/server/support.messages.coffee'

import './enquiryList.tpl.jade'

Template.enquiryList.helpers

	countEnquiries: -> @enquiries.length

Template.enquiryList.onCreated -> Tracker.afterFlush => @autorun =>

	enquiries = Template.currentData().enquiries
	rows = []
	columns = [
		{ name: 'id', title: '#', breakpoints: '', filterable: false }
		{ name: 'type', title: 'Type', breakpoints: '' }
		{ name: 'author', title: 'Author', breakpoints: '' }
		{ name: 'email', title: 'E-Mail' , breakpoints: '' }
		{ name: 'projectName', title: 'Project Name' , breakpoints: '' }
		{ name: 'content', title: 'Content' , breakpoints: '' }
		{ name: 'action', title: 'Action' , breakpoints: '' }
	]

	for enquiry, index in enquiries
		rows.push
			id: index + 1
			type: enquiry.type
			author: enquiry.author.name
			email: enquiry.author.email
			projectName: enquiry.projectName
			content: enquiry.text
			action: '<a class="createProject" data-id="" href>Create Project</a> | <a class="deleteProjectEnquiry" data-id="' + enquiry._id + '" href>Delete</a>'

	Delay -> $('#enquiryTable').html('').footable
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

Template.enquiryList.events

	'click .createProject': (e) ->
		FlowRouter.setQueryParams
			createProject: true
			projectName: $(e.target).closest('tr').find('td:nth-child(5)').html()
			email: $(e.target).closest('tr').find('td:nth-child(4)').html()

	'click .deleteProjectEnquiry': (e) ->
		messageId = $(e.target).attr('data-id')

		Messages.methods.deleteProjectEnquiry.call messageId: messageId
