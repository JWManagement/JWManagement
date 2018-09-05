import { Template } from 'meteor/templating';

import Permissions from '/imports/framework/Constants/Permissions';

Template['publisher.permissions.update'].helpers({
  data: {
    getMethod: 'publisher.permissions.project.get',
    backLink: 'publisher.permissions.details',
    fields: [
      {
        key: 'project',
        type: 'picker',
        allowedValues: Permissions.member
      }
    ]
  }
});
