import '/imports/api/projects/projects.js';
import '/imports/api/messages/messages.coffee';
import '/imports/api/reports/reports.coffee';

import '/imports/api/vessels/service.js';

import '/imports/ui/components/allUsers/server/support.users.coffee';
import '/imports/ui/components/allProjects/server/support.projects.coffee';
import '/imports/ui/components/enquiryList/server/support.messages.coffee';

import SimpleSchemaHelper from '/imports/api/util/simpleSchema.js';
SimpleSchemaHelper.init();

Impersonate.admins = ['support'];
