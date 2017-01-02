Template.userInfoPopover.helpers

	user: -> Meteor.users.findOne Template.currentData().userId

	getAge: (bday) ->
		str = moment().diff(moment(bday, 'DD.MM.YYYY'), 'years')

		if isNaN str
			TAPi18n.__('modal.shift.unknownAge')
		else
			str + ' ' + TAPi18n.__('time.years')

	getPrivilege: (privilege) ->
		switch privilege
			when 'auxiliary' then TAPi18n.__('profile._privilegeOfService.auxiliaryPioneer')
			when 'regular' then TAPi18n.__('profile._privilegeOfService.pioneer')
			when 'special' then TAPi18n.__('profile._privilegeOfService.specialPioneer')
			when 'circuit' then TAPi18n.__('profile._privilegeOfService.circuitOverseer')
			when 'bethelite' then TAPi18n.__('profile._privilegeOfService.bethelite')
			when 'ldc' then TAPi18n.__('profile._privilegeOfService.fulltimeConstructionServant')
			when 'servant' then TAPi18n.__('profile._ministryPrivilege.ministerialServant')
			when 'elder' then TAPi18n.__('profile._ministryPrivilege.elder')

	picture: -> Pictures.findOne userId: Template.currentData()._id

	allocationsWeek: -> Session.get 'allocationsWeek'

	allocationsLast: -> Session.get 'allocationsLast'

Template.userInfoPopover.onCreated ->

	UserSubs.subscribe 'user', Template.currentData().userId
	PictureSubs.subscribe 'profilePicture', Template.currentData().userId

Template.userInfoPopover.onRendered ->

	week = FlowRouter.getQueryParam 'showWeek'

	Meteor.call 'getAllocationsWeek', Template.currentData().userId, week, (err, res) ->
		Session.set 'allocationsWeek', res

	Meteor.call 'getAllocationsLastN', Template.currentData().userId, 90, (err, res) ->
		Session.set 'allocationsLast', res
