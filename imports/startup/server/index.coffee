# Meteor.users
import '/imports/api/users/users.coffee'

# Configure Mailer
import '/imports/api/mailer/config.coffee'

# Start Cronjobs
import '/imports/api/automation/cron.coffee'

# Publications
import '/imports/ui/pages/dashboard/server/dashboard.coffee'
import '/imports/ui/pages/support/server/support.coffee'
