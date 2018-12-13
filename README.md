[![Build Status](https://semaphoreci.com/api/v1/marvinzeising/jwmanagement/branches/master/badge.svg)](https://semaphoreci.com/marvinzeising/jwmanagement)

# What is JW Management?

JW Management is a highly configurable shift management system for Jehovah's Witnesses.
Built to power projects like the metropolitan witnessing, construction projects and/or similar.

### Multiple Tags

Easily separate different shifts with tags; assign publishers to the tags where shifts can be requested. Also define which publishers receive permission to serve as team-leaders.

### Shift Teams

Define one or more teams in a shift. Each will have it's own team-leader. Provide further information for every team, such as a description, a picture with a route, meetings points and more.

### Store Room

Manage your store room via JW Management. After each shift a team-leader can report whats been placed. The system then automatically updates the publications' stock with the number of placements taken.

### Notifications

Through the powerful notification system, you can be notified on your request's, confirmations or refusals, as well as changes to your shift, with the ability to reply.

# Want to help with the translation?

The translations for JW Management are managed via [locize.io](https://locize.io).
If you want to help with the translation of any language, please tell us!
E.g. you can write an email to support@jwmanagement.org.

# For Collaborators

Thank you for your interest in helping us with the development of this software.
Please follow the instructions to setup JW Management in your local dev environment.

1. Install Meteor (https://www.meteor.com/install)

2. If not already done, set up your environment for git.

3. _(Optional)_ Install a MongoDB GUI Tool. E.g. Mongo Chef (http://3t.io/mongochef)

4. Clone https://github.com/JWDeveloper/JWManagement.git to a local folder.

5. Open Terminal, cd to the created folder and run

	```shell
	meteor npm install; meteor
	```

	This will take some seconds since meteor now downloads all node modules and NPM packages on which the app depends.
	After some seconds you should be able to visit [http://localhost:3000](http://localhost:3000) in your browser.

6. Sign up under [http://localhost:3000](http://localhost:3000) to create a new user.

7. Once logged in with that new user, create a project.

8. Go to the settings page of the project and create a tag. For that tag, create a template week. Click on the template to edit it and add a few shifts.

9. Go back and to the shifts page of your projects. Click on the blue button in the center and then on "Add new week". Fill out the popup and voila - you got your project and shifts set up :-)
