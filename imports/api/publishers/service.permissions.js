import { Roles } from 'meteor/alanning:roles';

import { checkPermissions } from '/imports/framework/Functions/Security';

function publisherGetPermissions({ projectId, userId }) {
  checkPermissions(projectId, userId);

  const project = Projects.findOne(projectId, {
    fields: {
      'tags._id': 1,
      'tags.name': 1
    }
  });

  let tags = [];

  for (let tag of project.tags) {
    const tagPermissions = Roles.getRolesForUser(userId, projectId);

    console.log(tag);

    if (tagPermissions.length > 0) {
      tags.push({
        tag: tag.name,
        role: tagPermissions[0]
      });
    } else {
      tags.push({
        tag: tag.name,
        role: 'none'
      });
    }
  }

  return {
    project: Roles.getRolesForUser(userId, projectId)[0],
    tags: tags
  };
}

export { publisherGetPermissions };
