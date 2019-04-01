import i18next from 'i18next'

Template.store.helpers

	getStoreTypeTranslation: (path) ->
		i18next.t('store.type.' + path)

	getPublicationTranslation: (path) ->
		i18next.t('store.publication.' + path)

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
				short: 'jr'
			,
				short: 'jw'
			,
				short: 'lfb'
			,
				short: 'cf'
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
				short: 'la'
			,
				short: 'lc'
			,
				short: 'ld'
			,
				short: 'lf'
			,
				short: 'lgw'
			,
				short: 'lmn'
			,
				short: 'll'
			,
				short: 'mb'
			,
				short: 'ol'
			,
				short: 'pc'
			,
				short: 'ph'
			,
				short: 'rj'
			,
				short: 'rk'
			,
				short: 'sgd'
			,
				short: 'we'
			,
				short: 'yc'
			,
				short: 'ypq'
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
				short: 'dv'
			,
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
				short: 'mi18'
			,
				short: 'mi19'
			,
				short: 'mi20'
			]
		]

	getLanguages: -> [
		'A', 'ABK', 'AU', 'AC', 'AD', 'AF', 'AGC', 'AGR', 'AKA', 'AL', 'ALT', 'AM', 'AI', 'AMZ', 'R', 'REA',
		'AE', 'IE', 'AV', 'AP', 'AJ', 'AY', 'BLN', 'AR', 'BM', 'AO', 'BH', 'BB', 'BAK', 'BQ', 'BS', 'BEA',
		'BEL', 'EN', 'BE', 'ET', 'BTS', 'IK', 'BI', 'LM', 'BLF', 'BO', 'BSN', 'BRI', 'BK', 'BL', 'BY', 'CB',
		'CRB', 'AN', 'CV', 'CC', 'CM', 'CHT', 'HE', 'CS', 'CN', 'CMC', 'CNT', 'CH', 'CHS', 'CG', 'TB', 'CHO',
		'CK', 'CHL', 'CO', 'CHJ', 'TE', 'CU', 'CW', 'NM', 'CCM', 'CCP', 'CMG', 'COR', 'OCS', 'CYS', 'WCS',
		'CTR', 'C', 'CCT', 'B', 'DG', 'D', 'DRG', 'DAR', 'DK', 'DGS', 'MD', 'DGR', 'DI', 'DO', 'DA', 'KAD',
		'O', 'DZ', 'ED', 'EF', 'EA', 'E', 'EDF', 'EZ', 'ST', 'EW', 'FR', 'FLM', 'FA', 'FN', 'FI', 'FO', 'FF',
		'F', 'FS', 'FD', 'FT', 'GA', 'GZ', 'GRF', 'GBA', 'GE', 'X', 'GY', 'GN', 'GO', 'G', 'GL', 'GJ', 'HT',
		'GI', 'GRJ', 'GU', 'EG', 'UN', 'GR', 'CR', 'HK', 'HA', 'HW', 'HY', 'Q', 'HR', 'HV', 'HI', 'MO', 'HM',
		'HO', 'HST', 'HUV', 'HCH', 'HU', 'H', 'IA', 'IG', 'IBI', 'IC', 'ID', 'IF', 'AA', 'IB', 'IGE', 'IJ',
		'IL', 'IN', 'ING', 'IU', 'GC', 'IR', 'IH', 'IS', 'I', 'IT', 'IV', 'IXC', 'IXL', 'JCL', 'J', 'JA',
		'JL', 'KBR', 'KEA', 'KBY', 'AH', 'KL', 'KJ', 'KLK', 'KAM', 'KAI', 'KAN', 'KA', 'BAL', 'KYH', 'KEK',
		'AZ', 'GK', 'KE', 'KHK', 'OG', 'KS', 'NA', 'KKP', 'KB', 'KD', 'KIK', 'KG', 'KQ', 'KLW', 'KU', 'KIM',
		'KIN', 'YW', 'IP', 'KIP', 'KZ', 'GB', 'RU', 'KI', 'KSN', 'KIT', 'KV', 'KM', 'KMP', 'KT', 'KO', 'OS',
		'KP', 'KRI', 'RI', 'KUA', 'KUK', 'KMK', 'RD', 'RDC', 'RDA', 'KUR', 'KH', 'WG', 'KY', 'KW', 'LCN',
		'LAD', 'LAH', 'LAK', 'AB', 'LN', 'LA', 'LP', 'LR', 'LT', 'LL', 'LJ', 'LZ', 'LHK', 'LF', 'LI', 'LIN',
		'LIS', 'L', 'LOM', 'LE', 'OM', 'LVA', 'LC', 'LU', 'LG', 'LY', 'LB', 'LD', 'LO', 'LV', 'LX', 'MS',
		'MC', 'MAC', 'MDI', 'MU', 'OR', 'MG', 'ML', 'MY', 'MT', 'MZ', 'MI', 'MN', 'MA', 'MAA', 'OL', 'MW',
		'MR', 'MRB', 'RE', 'MAR', 'MQ', 'MH', 'MB', 'MSH', 'MTL', 'CE', 'MAY', 'MYG', 'MYO', 'MZH', 'MAZ',
		'MBK', 'DU', 'ME', 'MWI', 'UU', 'MIS', 'MX', 'MXG', 'LS', 'MOK', 'MON', 'KHA', 'ON', 'MM', 'MOR',
		'MTZ', 'MTU', 'OU', 'MOU', 'BU', 'NAG', 'NHC', 'NB', 'NNG', 'NR', 'NV', 'NDA', 'NBL', 'OD', 'NE',
		'NP', 'NW', 'NG', 'NGL', 'NGK', 'NI', 'NC', 'NN', 'N', 'NO', 'UE', 'NU', 'KK', 'YM', 'NK', 'NY', 'NZ',
		'OCL', 'OKP', 'OI', 'OA', 'OK', 'OSS', 'OT', 'OTM', 'OV', 'PAI', 'PU', 'PAM', 'PM', 'PN', 'PPG', 'PA',
		'PH', 'PT', 'PR', 'PIM', 'PTJ', 'POK', 'P', 'PP', 'PPO', 'T', 'TCR', 'PL', 'PJ', 'QU', 'QC', 'RPN',
		'RA', 'RWG', 'RCR', 'M', 'RH', 'RM', 'RMC', 'RN', 'RO', 'RV', 'RR', 'U', 'RT', 'LUC', 'SKL', 'PS',
		'SA', 'ZA', 'LH', 'SM', 'SG', 'SRM', 'GCS', 'SEN', 'SNG', 'SE', 'SB', 'ER', 'SER', 'SU', 'SC', 'SHA',
		'SL', 'CA', 'SHU', 'DM', 'SK', 'ND', 'SN', 'V', 'SV', 'SP', 'SO', 'SNK', 'S', 'SR', 'UK', 'SD', 'SW',
		'SWI', 'Z', 'XSW', 'TBN', 'TG', 'TH', 'AT', 'TJ', 'TL', 'TNK', 'TRH', 'TRS', 'TAT', 'TA', 'TEC', 'TU',
		'TP', 'TPN', 'TTP', 'SI', 'TT', 'TBT', 'CI', 'TI', 'TV', 'TLN', 'OB', 'TR', 'TOB', 'TJO', 'MP', 'OE',
		'TO', 'TOR', 'TSC', 'TOT', 'TQ', 'SH', 'TS', 'TN', 'TRN', 'TK', 'TM', 'VL', 'VI', 'TW', 'TZE', 'TZO',
		'TZU', 'UM', 'UG', 'K', 'UB', 'UD', 'UR', 'DR', 'UZ', 'VE', 'VZ', 'VT', 'WAM', 'WA', 'LW', 'WY', 'W',
		'WL', 'WO', 'XV', 'XO', 'AW', 'YK', 'YA', 'YP', 'YQ', 'YG', 'YR', 'ZN', 'ZR', 'ZQ', 'ZO', 'ZU', 'OTHER'
	].map((lang) ->
		short: lang
		translation: i18next.t('language.' + lang)
	).sort((a, b) -> a.translation > b.translation)

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
