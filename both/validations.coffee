@Validations =

	trim: (str) -> str.trim().replace /\s+/g, ' '

	removeSpecials: (str) -> str.replace /\W$/g, ''

	removeLetters: (str) -> str.replace /[a-z]/gi, ''

	toSpace: (str) ->
		str = str.replace /[^a-zßöäü/\s]/gi, ' '
		str = str.replace /\//g, ' / '
		str = str.replace /\s+/g, ' '
		str = str.replace /( \/ )/g, '/'
		str

	capitalize: (str) ->
		str = str.toLowerCase()
		str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split(' ')).join ' '
		str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split('-')).join '-'
		str = (w.substr(0, 1).toUpperCase() + w.substr(1) for w in str.split('/')).join '/'
		str

	cleanedUsername: (username) -> username.trim().toLowerCase().replace(/[^a-z0-9 äöü_-]+/g, '')
