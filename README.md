# What is JW Management?

JW Management is a highly configurable shift management system for Jehovah's Witnesses.
Built to power projects like the metropolitan witnessing, construction projects and/or similar.

### Multiple Tags

Easily separate different shifts with tags; assign publishers to the tags where shifts can be requested. Also define which publishers receive permission to serve as team-leaders.

### Shift Teams

Define one or more teams in a shift. Each will have it's own team-leader. Provide further information for every team, such as a description, a picture with a route, meetings points and more.

### Store Room

Manage your store room via JW Management. After each shift a team-leader can report whats been placed. The system then automatically updates the publications' stock with the number of placements taken. Get notified if a publication is on low stock.

### Notifications

Through the powerful notification system, you can be notified on your request's, confirmations or refusals, as well as changes to your shift, with the ability to reply.

# For Translators

## Simple setup

### Setup

1. _(Optional)_ We recommend downloading and using Atom.io (https://atom.io), because it supports syntax highlighting.

2. Download the JW Management repository as zip file (https://github.com/JWDeveloper/JWManagement/archive/develop.zip) and extract it.

3. Open the extracted folder and switch into the both/i18n folder.

4. Copy the folder of the language, from that you can do the translation (e.g. en, if you want to translate english to russian).

5. Paste it and rename it to the language, you want to translate it to (e.g. ru).
	Also rename all files in this folder and replace the old language with the new one.

6. Open these files in Atom (or your preferred file editor).

### Translation

The translation files are build with a "key: value" pattern.
You only need to translate the value.
Anything NOT translated will be displayed in english (so you don't necessarily have to translate everything).

### Submit

Zip the folder again and send an email with the attached zip file to support@jwmanagement.org.


## Advanced setup (for developers)

### Setup

Please see "For Collaborators" > Setup

### Translation

Same as simple setup

### Submit

1. Open SourceTree.

2. Select all the changes you made and commit them. As commit options use "Create Pull-Request".

3. Push to origin.

	Now we can see your changes and will pull them into the repo.
	If everything is fine, the new translation will be available with the next release.


# For Collaborators

### Setup

Thank you for your interest in helping us with the development of this software.
Please follow the instructions to setup JW Management in your local dev environment.

1. Install Meteor (https://www.meteor.com/install)

2. _(Optional)_ We recommend installing SourceTree (https://www.sourcetreeapp.com) _(unless you want to use the git command line)_

3. Install a MongoDB GUI Tool. We recommend:

	- Mac: MongoHub (https://www.openhub.net/p/mongohub)

	- Windows: Mongo Chef (http://3t.io/mongochef)

4. Clone https://github.com/JWDeveloper/JWManagement.git to a local folder. If you use the "Open in Desktop" Button on GitHub it should automatically open MongoHub.

5. Open Terminal, cd to the created folder and run

	```shell
	meteor npm install && npm run start
	```

	This will take some seconds since meteor now downloads all node modules and NPM packages on which the app depends.
	After some seconds you should be able to visit [http://localhost:3000](http://localhost:3000) in your browser.

6. Open the MongoDB GUI and connect to the MongoDB started by meteor.

	```yaml
	address: 127.0.0.1
	port: 3001
	database: meteor
	```

7. Insert a user into the users collection:

	```json
	{
		"_id": "asiduvaosnfvpasdf",
		"createdAt": new Date(1450919856316),
		"username": "johndoe",
		"profile": {
			"bdate": "",
			"email": "john@doe.com",
			"firstname": "John",
			"gender": "m",
			"language": "en",
			"languages": "",
			"lastname": "Doe",
			"pioneer": "publisher",
			"privilege": "publisher",
			"telefon": "",
			"congregation": "",
			"available": {},
			"vacations": [],
			"shortTermCalls": false,
			"shortTermCallsAlways": false
		},
		"state": "active",
		"services": {
			"password": {
				"bcrypt": "$2a$10$I8659UhcKu6ROf2.YQ6JAeeWUDRTLwLksQGAyAr2A8dTeEYUTNMmK"
			}
		},
		"roles": {
			"abcde": [
				"admin"
			],
			"abcdef": [
				"teamleader"
			]
		}
	}
	```

8. Create a collection "projects" and insert a project:

	```json
	{
		"_id": "abcde",
		"name": "My first project",
		"email": "support@jwmanagement.org",
		"language": "en",
		"news": {},
		"wiki": { "tabs": [] },
		"tags": [
			{
				"_id": "abc",
				"name": "Cart Witnessing",
				"img": "trolley",
				"templates": []
			}
		],
		"teams": [
			{
				"_id": "abcdef",
				"name": "Location/Route 1",
				"link": "",
				"description": ""
			}
		],
		"meetings": [],
		"store": {}
	}
	```

9. Now login on the website with 'johndoe' and password '12345678'

### Development

We recommend Atom.io (https://atom.io) and these Plugins:

	language-jade
	meteor-api
	minimap
	pigments
	color-picker
	file-icons
	atom-beautify
	Sublime-Style-Column-Selection
	tool-bar-almighty
	git-time-machine

If you're willing to help us to improve the system, send us an email to support@jwmanagement.org so we can add you to our WhatsApp group.
