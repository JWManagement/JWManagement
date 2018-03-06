import Users from '/imports/api/users/users.js'
import './publish/user.search.coffee'

Meteor.methods({
    'user.get': ({ projectId, userId }) => {
        checkPermissions(projectId, userId);

        return getExtendedUser(userId, projectId);
    },
    'user.getField': ({ language, projectId, userId, key }) => {
        checkPermissions(projectId, userId);

        if (key.indexOf('_') > -1) {
            var user = getExtendedUser(userId, projectId);

            for (property of key.split('_')) {
                if (property in user) {
                    user = user[property];
                } else {
                    return '';
                }
            }

            return user;
        } else {
            return getExtendedUser(userId, projectId)[key];
        }
    },
    'user.insert': ({ language, projectId }, user) => {
        checkPermissions(projectId);

        try {
            Users.persistence.insert(user);
            return user._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'user.update': ({ language, projectId, userId }, key, value) => {
        checkPermissions(projectId, userId);

        try {
            Users.persistence.update(userId, key.replace('_', '.'), value);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
});

function getExtendedUser(userId, projectId) {
    let rolesObject = {}
    rolesObject['roles.' + projectId] = {
        $in: Permissions.member
    }

    let user = Users.findOne({
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

    if (user != undefined) {
        // do stuff
    }

    return user;
}

function checkPermissions(projectId, userId = null) {
    const project = Projects.findOne(projectId, { fields: { _id: 1 } })

    if (project == null) {
        throw new Meteor.Error('projectNotFound');
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, projectId)) {
        throw new Meteor.Error('youAreNotProjectAdmin');
    }

    if (userId != null && !Roles.userIsInRole(userId, Permissions.member, projectId)) {
        throw new Meteor.Error('userIsNotProjectMember');
    }
}
