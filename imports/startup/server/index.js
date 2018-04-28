import '/imports/api/projects/projects.js';
import '/imports/api/messages/messages.coffee';
import '/imports/api/reports/reports.coffee';

import '/imports/startup/server/mailer.js';
import '/imports/startup/server/prerenderio.js';

import '/imports/api/admin/service.js';
import '/imports/api/users/service.js';
import '/imports/api/vessels/service.js';
import '/imports/api/notes/service.js';

import '/imports/ui/components/allUsers/server/support.users.coffee';
import '/imports/ui/components/allProjects/server/support.projects.coffee';
import '/imports/ui/components/enquiryList/server/support.messages.coffee';

import SimpleSchemaHelper from '/imports/api/util/SimpleSchemaHelper.js';
SimpleSchemaHelper.init();

Impersonate.admins = ['support'];
