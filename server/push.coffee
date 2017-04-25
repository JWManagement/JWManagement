Meteor.startup ->

	Push.debug = true

	Push.Configure
		apn:
			certData: Assets.getText('cert.pem'),
			keyData: Assets.getText('key.pem'),
			passphrase: "jwm1914",
			production: false
			gateway: "gateway.sandbox.push.apple.com"
