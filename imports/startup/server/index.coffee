# Meteor.users
import '/imports/api/users/users.coffee'

# Configure Mailer
import '/imports/api/mailer/config.coffee'

# Start Cronjobs
import '/imports/api/automation/cron.coffee'

# Publications
import '/imports/ui/components/shift/server/shift.coffee'
import '/imports/ui/components/wikiTabs/server/wiki.coffee'
import '/imports/ui/pages/dashboard/server/dashboard.coffee'
import '/imports/ui/pages/projects/server/projects.coffee'
import '/imports/ui/pages/resetPassword/server/userByToken.coffee'
import '/imports/ui/pages/settings/server/settings.coffee'
import '/imports/ui/pages/shifts/server/tags.coffee'
import '/imports/ui/pages/shifts/server/weeks.coffee'
import '/imports/ui/pages/users/server/tags.coffee'
import '/imports/ui/pages/users/server/users.coffee'
import '/imports/ui/pages/support/server/support.coffee'
import '/imports/api/messages/messages.coffee'
import '/imports/api/reports/reports.coffee'

Impersonate.admins = ['support']
