Template.store.helpers

	mainContainerClass: ->
		if FlowRouter.getQueryParam('showPublication')
			'hidden-xs hidden-sm col-sm-6'
		else
			'col-xs-12'

	detailContainerClass: ->
		if FlowRouter.getQueryParam('showPublication')
			'col-sm-6'
		else
			'hidden'

	allItems: ->
		[
			type: 'books'
			items: [
				short: 'bh'
			,
				short: 'bhs'
			,
				short: 'bi12'
			,
				short: 'nwt'
			,
				short: 'ct'
			,
				short: 'fy'
			,
				short: 'gt'
			,
				short: 'lr'
			,
				short: 'my'
			,
				short: 'yp1'
			,
				short: 'yp2'
			,
				short: 'ypq'
			]
		,
			type: 'brochures'
			items: [
				short: 'bm'
			,
				short: 'fg'
			,
				short: 'gu'
			,
				short: 'hf'
			,
				short: 'lc'
			,
				short: 'ld'
			,
				short: 'lf'
			,
				short: 'lmn'
			,
				short: 'll'
			,
				short: 'mb'
			,
				short: 'ol'
			,
				short: 'rj'
			,
				short: 'rk'
			,
				short: 'yc'
			]
		,
			type: 'magazines'
			items: [
				short: 'wp/g'
			]
		,
			type: 'tracts'
			items: [
				short: 'kt'
			,
				short: 'rp'
			,
				short: 't-30'
			,
				short: 't-31'
			,
				short: 't-32'
			,
				short: 't-33'
			,
				short: 't-34'
			,
				short: 't-35'
			,
				short: 't-36'
			,
				short: 't-37'
			]
		,
			type: 'misc'
			items: [
				short: 'CO-inv17'
			,
				short: 'CO-inv18'
			,
				short: 'CO-inv19'
			,
				short: 'CO-inv20'
			,
				short: 'inv'
			,
				short: 'jwcd'
			,
				short: 'mi16'
			,
				short: 'mi17'
			,
				short: 'mi18'
			,
				short: 'mi19'
			,
				short: 'mi20'
			]
		]

	getLanguages: -> [
		'A', 'AL', 'AR', 'AM'
		'B', 'BL', 'BSN'
		'C', 'CB', 'CH', 'CHS'
		'DAR', 'DGS'
		'E', 'ED', 'EW'
		'F'
		'G', 'GE'
		'H', 'HI'
		'I', 'IB', 'IN'
		'J'
		'K', 'KO', 'KRI'
		'LT',
		'M', 'MC'
		'O', 'OA'
		'P', 'PH', 'PJ', 'PL', 'PR'
		'RD', 'RDA', 'RDC', 'REA', 'RM', 'RMC', 'RU'
		'S', 'SB', 'SI', 'SO', 'SV'
		'T', 'TI', 'TK', 'TL', 'TW'
		'U', 'UD'
		'V', 'VT'
		'WO'
		'X'
		'YR'
	]

	isReady: -> ProjectSubs.ready()

	getProject: -> Projects.findOne FlowRouter.getParam('projectId')

	simpleMode: -> @store.mode == 'simple'

	storeModeSet: -> @store?.mode?

	haveThisItemOrViewAll: (short) ->
		a = short in @store.items.map (item) -> item.short
		a || FlowRouter.getQueryParam('showAll')

	haveThisLanguage: (short) ->
		a = @languages.filter (lang) -> lang.short == short
		a[0]

	hasItemsOrViewAll: -> @store.items.length > 0 || FlowRouter.getQueryParam('showAll')

	viewAll: -> FlowRouter.getQueryParam('showAll')

	addedItem: (short) -> 'checked' if short in @store.items.map (item) -> item.short

	activePublication: (short) -> 'active' if FlowRouter.getQueryParam('showPublication') == short

	showPublication: -> FlowRouter.getQueryParam('showPublication')

	languageCount: (short) ->
		for item in @store.items when item.short == short
			return item.languages.length

	totalCount: (short) ->
		count = 0
		for item in @store.items when item.short == short
			for language in item.languages
				if !isNaN parseInt language.stock
					count += parseInt language.stock
		count

	totalCategoryCount: (category) ->
		total = 0
		pubList = category.items.map (item) -> item.short

		for publication in @store.items when publication.short in pubList
			for language in publication.languages
				if !isNaN parseInt language.stock
					total += parseInt language.stock
		total

	selectedPublication: ->
		short = FlowRouter.getQueryParam('showPublication')
		for publication in @store.items when publication.short == short
			return publication

	addLanguage: -> FlowRouter.getQueryParam('addLanguage')

Template.store.onCreated ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		ProjectSubs.subscribe 'store', projectId

Template.store.events

	'click #showAll': ->
		wrs -> FlowRouter.setQueryParams showAll: true

	'click #hideAll': ->
		wrs -> FlowRouter.setQueryParams showAll: null

	'click #setStoreMode': (e) ->
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'initStore', projectId, $(e.target).attr('mode')

	'click #resetStore': (e) ->
		projectId = FlowRouter.getParam('projectId')

		swalYesNo
			swal: 'delete.store'
			doConfirm: -> Meteor.call 'resetStore', projectId

	'click #togglePublication': (e) ->
		projectId = FlowRouter.getParam('projectId')
		short = $(e.target).attr('short')

		if !e.target.checked
			swalYesNo
				swal: 'delete.publication'
				doConfirm: -> Meteor.call 'removePublication', projectId, short
		else
			Meteor.call 'addPublication', projectId, short

	'click #showPublication': (e) ->
		projectId = FlowRouter.getParam('projectId')
		short = $(e.target).closest('a').attr('short')

		if FlowRouter.getQueryParam('showPublication') == short
			wrs -> FlowRouter.setQueryParams showPublication: null
		else
			wrs -> FlowRouter.setQueryParams showAll: null, showPublication: short

	'click #startAddLanguage': ->
		wrs -> FlowRouter.setQueryParams addLanguage: true

	'click #cancelAddLanguage': ->
		wrs -> FlowRouter.setQueryParams addLanguage: null

	'click #closePublication': ->
		wrs -> FlowRouter.setQueryParams showPublication: null

	'click #addLanguage': ->
		projectId = FlowRouter.getParam('projectId')
		short = FlowRouter.getQueryParam('showPublication')
		language = $('#newLanguage').val()
		count = parseInt $('#newCount').val()

		Meteor.call 'addLanguage', projectId, short, language, count, handleError

	'click #removeLanguage': ->
		projectId = FlowRouter.getParam('projectId')
		short = FlowRouter.getQueryParam('showPublication')
		language = @short

		swalYesNo
			swal: 'delete.language'
			doConfirm: -> Meteor.call 'removeLanguage', projectId, short, language, handleError
