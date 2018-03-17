import Users from '/imports/api/users/users.js'
import PasswordsSchema from '/imports/api/users/passwords.js'
import RoleManager from '/imports/api/roles/RoleManager.js'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'user.search': ({ language, projectId, searchString, limit }) => {
        checkPermissions(projectId);

        const result = {
            total: 0,
            items: []
        };

        if (typeof searchString != 'string' || searchString == '') {
            return result;
        }

        const regEx = new RegExp(searchString, 'i');
        const rolesObject = {}

        rolesObject['roles.' + projectId] = {
            $in: Permissions.member
        }

        const cursor = Users.find({
            $and: [
                {
                    $or: [
                        { _id: regEx },
                        { 'profile.lastname': regEx },
                        { 'profile.firstname': regEx },
                        { 'profile.email': regEx },
                        { 'profile.telefon': regEx },
                        { username: regEx }
                    ]
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
                'profile.lastname': 1,
                'profile.firstname': 1,
                'profile.email': 1,
                'profile.telefon': 1,
                username: 1,
                roles: 1
            },
            sort: {
                'profile.lastname': 1,
                'profile.firstname': 1,
                username: 1
            },
            limit: limit
        });

        result.total = cursor.count();
        result.items = cursor.fetch();

        return result;
    },
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
    'user.password.change': ({ projectId, userId }, passwords) => {
        checkPermissions(projectId, userId);

        try {
            PasswordsSchema.validate(passwords);

            Accounts.setPassword(userId, passwords.password);
        } catch(e) {
            for(let detail of e.details) {
                if (detail.type == 'minString') {
                    detail.type = 'minString8';
                }
            }

            throw new Meteor.Error(e);
        }
    },
    'user.removeFromProject': ({ projectId, userId }) => {
        checkPermissions(projectId, userId);

        try {
            RoleManager.removeProjectPermission(projectId, userId);

            const project = Projects.findOne(projectId, { fields: { 'tags._id': 1 }});

            if ((typeof project !== "undefined" && project !== null) && project.tags) {
                for (let tag of project.tags) {
                    RoleManager.removeTagPermission(tag._id, userId);
                }

                for (let group of Roles.getGroupsForUser(userId)) {
                    if (RoleManager.hasPermission(projectId, Permissions.member.concat(Permissions.participant), userId)) {
                        return;
                    }
                }

            }

            if (!RoleManager.hasPermissions(userId)) {
                Users.remove(userId);
            }
        } catch(e) {
            throw new Meteor.Error(e);
        }
    }
});

function getExtendedUser(userId, projectId) {
    let user = Users.findOne({
        $and: [
            {
                _id: userId
            }, {
                ['roles.' + projectId]: {
                    $in: Permissions.member
                }
            }, {
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
