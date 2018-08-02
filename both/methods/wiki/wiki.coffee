moment = require('moment')

Meteor.methods

	addTab: (projectId, title) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check title, String

		Projects.update projectId, $addToSet: 'wiki.tabs':
			_id: moment().format('x')
			title: title
			faq: []

	removeTab: (projectId, tabId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String

		helper = { $pull: {} }
		helper.$pull['wiki.tabs'] = {_id: tabId}

		Projects.update projectId, helper

	changeTab: (projectId, tabId, text) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String
			check text, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId

		helper = { $set: {} }
		helper.$set['wiki.tabs.' + tabIndex + '.title'] = text

		Projects.update projectId, helper

	addQuestion: (projectId, question, tabId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check question, String
			check tabId, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId
		faqId = moment().format('x')

		helper = { $addToSet: {} }
		helper.$addToSet['wiki.tabs.' + tabIndex + '.faq'] = {_id: faqId, question: question}

		Projects.update projectId, helper
		faqId

	removeFaq: (projectId, tabId, faqId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String
			check faqId, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId

		helper = $pull: {}
		helper.$pull['wiki.tabs.' + tabIndex + '.faq'] = _id: faqId

		Projects.update projectId, helper

	changeFaq: (projectId, tabId, faqId, code) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String
			check faqId, String
			check code, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId
		faqIndex = Meteor.call 'getFaqIndex', projectId, tabId, faqId

		helper = $set: {}
		helper.$set['wiki.tabs.' + tabIndex + '.faq.' + faqIndex + '.answer'] = code

		Projects.update projectId, helper

	changeQuestion: (projectId, tabId, faqId, question) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String
			check faqId, String
			check question, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId
		faqIndex = Meteor.call 'getFaqIndex', projectId, tabId, faqId

		helper = $set: {}
		helper.$set['wiki.tabs.' + tabIndex + '.faq.' + faqIndex + '.question'] = question

		Projects.update projectId, helper

	getTabIndex: (projectId, tabId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String

		project = Projects.findOne projectId
		tabs = project.wiki.tabs
		counter = 0
		tabIndex = 0

		for tab in tabs
			if tab._id == tabId then tabIndex = counter else counter++

		tabIndex

	getFaqIndex: (projectId, tabId, faqId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check tabId, String
			check faqId, String

		tabIndex = Meteor.call 'getTabIndex', projectId, tabId
		project = Projects.findOne projectId
		tabs = project.wiki.tabs
		faqs = tabs[tabIndex].faq
		counter = 0
		faqIndex = 0

		for faq in faqs
			if faq._id == faqId then faqIndex = counter else counter++

		faqIndex

	removeFile: (fileId, projectId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check fileId, String

		Files.remove fileId

	changeFileName: (fileId, projectId, name) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check fileId, String
			check name, String

		helper = { $set: {} }
		helper.$set['original.name'] = name

		Files.update fileId, helper

		helper = { $set: {} }
		helper.$set['copies.files.name'] = name

		Files.update fileId, helper
