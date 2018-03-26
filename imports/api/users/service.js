import Users from '/imports/api/users/users.js'
import PasswordsSchema from '/imports/api/users/passwords.js'
import RoleManager from '/imports/api/managers/RoleManager.js'
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
    'user.get': ({ language, projectId, userId }) => {
        checkPermissions(projectId, userId);

        return getExtendedUser(userId, projectId, language);
    },
    'user.getField': ({ language, projectId, userId, key }) => {
        checkPermissions(projectId, userId);

        if (key.indexOf('_') > -1) {
            var user = getExtendedUser(userId, projectId, language);

            for (property of key.split('_')) {
                if (property in user) {
                    user = user[property];
                } else {
                    return '';
                }
            }

            return user;
        } else {
            return getExtendedUser(userId, projectId, language)[key];
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
    'user.password.insert': ({ projectId, userId }, passwords) => {
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
    },
    'user.availability.get': ({ language, projectId, userId, key }) => {
        checkPermissions(projectId, userId);

        const user = getExtendedUser(userId, projectId, language);
        const day = key.split('_').pop();
        const timeslots = user.profile.availability[day].split(', ').map((timeslot) => {
            return {
                timeslot: timeslot
            };
        });

        return {
            availability: timeslots
        };
    }
});

function getExtendedUser(userId, projectId, language) {
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
            'profile.languages': 1,
            'profile.available': 1,
            'profile.shortTermCalls': 1,
            'profile.shortTermCallsAlways': 1
        }
    });

    if (user != undefined) {
        user.profile.availability = {
            mondays: convertTimeslotToString(user.profile.available.mo, language),
            tuesdays: convertTimeslotToString(user.profile.available.tu, language),
            wednesdays: convertTimeslotToString(user.profile.available.we, language),
            thursdays: convertTimeslotToString(user.profile.available.th, language),
            fridays: convertTimeslotToString(user.profile.available.fr, language),
            saturdays: convertTimeslotToString(user.profile.available.sa, language),
            sundays: convertTimeslotToString(user.profile.available.su, language)
        };
    }

    return user;
}

function convertTimeslotToString(timeslots, language) {
    if (typeof timeslots == 'object' && timeslots.length > 0) {
        const dateFormatStart = TAPi18n.__('user.entity.profile_availability_dateFormatStart', {}, language);
        const dateFormatEnd = TAPi18n.__('user.entity.profile_availability_dateFormatEnd', {}, language);
        let timePeriods = [];

        timeslots.sort((a, b) => {
            return a - b;
        });

        let periodBegin = -1;
        let lastValue = 0;

        for (let timeslot of timeslots) {
            if (periodBegin < 0) {
                periodBegin = timeslot;
            } else if (timeslot != lastValue + 100) {
                const timeslotStart = moment(periodBegin, 'Hmm');
                const timeslotEnd = moment(lastValue + 100, 'Hmm');

                timePeriods.push(timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd));

                periodBegin = timeslot;
            }

            lastValue = timeslot;
        }

        const timeslotStart = moment(periodBegin, 'Hmm');
        const timeslotEnd = moment(lastValue + 100, 'Hmm');

        timePeriods.push(timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd));

        return timePeriods.join(', ');
    }

    return '';
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
