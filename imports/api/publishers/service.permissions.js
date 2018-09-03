import { checkPermissions } from '/imports/framework/Functions/Security';

function publisherGetPermissions({ projectId, userId }) {
  checkPermissions(projectId, userId);

  // get project
  // only return the tag inside user.roles that are in this project

  // return Roles.getRolesForUser(userId)[0];

  return {
    project: 'member',
    tags: [{
      tag: 'Trolley',
      role: 'participant'
    }]
  };
}

export { publisherGetPermissions };
