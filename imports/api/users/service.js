import { Users } from '/imports/api/users/users.js'
import './publish/user.search.coffee'

Meteor.methods({
    'user.get': ({ projectId }) => {
        checkPermissions(projectId);

        return Roles.getUsersInRole(Permissions.admin, projectId);
    }
});

function checkPermissions(projectId) {
    const project = Projects.findOne(projectId, { fields: { vesselModule: 1 } })

    if (project == null) {
        throw new Meteor.Error('projectNotFound');
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, projectId)) {
        throw new Meteor.Error('userNotProjectAdmin');
    }
}
