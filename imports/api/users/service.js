import Users from '/imports/api/users/users.js'
import './publish/user.search.coffee'

Meteor.methods({
    'user.get': ({ projectId, userId }) => {
        checkPermissions(projectId);

        rolesObject = {}
        rolesObject['roles.' + projectId] = {
            $in: Permissions.member
        }

        return Users.findOne({
            $and: [
                {
                    _id: userId
                },
                rolesObject,
                {
                    username: {
                        $ne: 'adm'
                    }
                }
            ]
        }, {
            fields: {
                username: 1,
                'profile.firstname': 1,
                'profile.lastname': 1,
                'profile.email': 1,
                'profile.telefon': 1,
                'profile.gender': 1,
                'profile.bdate': 1,
                'profile.pioneer': 1,
                'profile.privilege': 1,
                'profile.languages': 1
            }
        });
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
