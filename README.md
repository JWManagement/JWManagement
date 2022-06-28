# What is JW Management?

JW Management is a highly configurable shift management system, built to power projects like the metropolitan witnessing, construction projects and/or similar.

### Multiple Tags

Easily separate different shifts with tags; assign publishers to the tags where shifts can be requested. Also define which publishers receive permission to serve as team-leaders.

### Shift Teams

Define one or more teams in a shift. Each will have it's own team-leader. Provide further information for every team, such as a description, a picture with a route, meetings points and more.

### Store Room

Manage your store room via JW Management. After each shift a team-leader can report whats been placed. The system then automatically updates the publications' stock with the number of placements taken.

### Notifications

Through the powerful notification system, you can be notified on your request's, confirmations or refusals, as well as changes to your shift, with the ability to reply.

# For Translators

## Simple setup

### Setup

1. _(Optional)_ We recommend downloading and using VS Code (https://code.visualstudio.com), because it supports syntax highlighting.

2. Download the JW Management repository as zip file (https://github.com/JWManagement/JWManagement/archive/develop.zip) and extract it.

3. Open the extracted folder and switch into the imports/i18n folder.

4. Copy the folder of the language, from that you can do the translation (e.g. en-US, if you want to translate english to russian).

5. Paste it and rename it to the language, you want to translate it to (e.g. ru).
   Also rename all files in this folder and replace the old language with the new one.

6. Open these files in VS Code (or your preferred file editor).

### Translation

The translation files are built with a "key: value" pattern.
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

Thank you for your interest in helping us with the development of this software.
Please follow the instructions to setup JW Management in your local dev environment.

1. Install Meteor (https://www.meteor.com/install)

2. If not already done, set up your environment for git.

3. _(Optional)_ Install a MongoDB GUI Tool. E.g. Mongo Chef (http://3t.io/mongochef)

4. Clone https://github.com/JWManagement/JWManagement.git to a local folder.

5. cd to the created folder and initialize git submodules:

   ```shell
   git submodule update --init
   ```

6. Install packages and run the application:

   ```shell
   meteor npm install; meteor
   ```

   This will take some seconds since meteor now downloads all node modules and NPM packages on which the app depends.
   After some seconds you should be able to visit [http://localhost:3000](http://localhost:3000) in your browser.

7. Sign up under [http://localhost:3000](http://localhost:3000) to create a new user.

8. Once logged in with that new user, create a project.

9. Go to the settings page of the project and create a tag. For that tag, create a template week. Click on the template to edit it and add a few shifts.

10. Go back and to the shifts page of your projects. Click on the blue button in the center and then on "Add new week". Fill out the popup and voila - you got your project and shifts set up :-)

## Troubleshooting

### Windows (outdated)

If you are on Windows, you may encounter slow build times.
One solution is to use the Windows Subsystem for Linux for the server runtime (nodejs), but running the mongodb under Windows. To achieve this do the following:

1. Install the WSL see [Instructions for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

2. Once you have finished installing your Linux distribution you need to install

  * Nodejs. See the [official nodejs instructions based on the choosen distribution](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).
  For example for ubuntu do:
  ```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

  * Metor:

   ```
   curl https://install.meteor.com/ | sh
   ```

  You do not need to clone the repository again in Linux. The directories and files in Windows are mounted directly with WSL.

  Open the Terminal at the root of the project and execute ``bash``. You are now in Linux. Try it. Execute ``node``, then in the node REPL ``os.platform()``. This should give you back 'linux'.

 One more thing is needed: mongodb. Meteor installs mongodb for you but in this case we need our own instance of mongodb because meteor does not work or not work in a predictical way in WSL. For example it seems that mongodb in WSL can only be started from ``/mnt/c``. You need to install it anyway so better on Windows.

  Go over to the [MongoDB Download Center](https://www.mongodb.com/download-center/community) and Download mongodb for Windows. If you choose the ZIP Version you can just unzip it to a choosen destination and add the bin Folder as an Environment variable in Windows. For example ``C:\Program Files (x86)\mongodb-win32-x86_64-2008plus-ssl-4.0.6\bin``.
  Here is located ``mongod`` needed to start the dev db.

  With this approach the development workflow is slightly different. You will

  1. Start mongodb (from Windows):

  ```mongod --port 3001 --bind_ip_all```

  2. Start meteor (from Linux):

  ```shell
  bash
  MONGO_URL=mongodb://{yourip}:3001/meteor meteor
  ```





