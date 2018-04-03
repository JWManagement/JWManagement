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

        const user = getExtendedUser(userId, projectId, language);

        if (user != undefined) {
            user.profile.availability = {
                mondays: user.profile.availability.mondays.map((x) => { return x.timeslot; }).join(', '),
                tuesdays: user.profile.availability.tuesdays.map((x) => { return x.timeslot; }).join(', '),
                wednesdays: user.profile.availability.wednesdays.map((x) => { return x.timeslot; }).join(', '),
                thursdays: user.profile.availability.thursdays.map((x) => { return x.timeslot; }).join(', '),
                fridays: user.profile.availability.fridays.map((x) => { return x.timeslot; }).join(', '),
                saturdays: user.profile.availability.saturdays.map((x) => { return x.timeslot; }).join(', '),
                sundays: user.profile.availability.sundays.map((x) => { return x.timeslot; }).join(', ')
            };
        }

        return user;
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
            Users.persistence.update(userId, key.replace(/_/g, '.'), value);
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
    'user.profile.availability.insert': ({ language, projectId, userId, key }, timeslot) => {
        checkPermissions(projectId, userId);

        try {
            const user = Users.findOne(userId);
            const day = key.split('_').pop().substring(0, 2);
            const timeslotStart = parseInt(timeslot.start) * 100;
            const timeslotEnd = parseInt(timeslot.end) * 100;
            let newTimeslots = [];
            let mergedTimeslots = [];
            let time = timeslotStart;
            const validationErrors = [];

            if (isNaN(timeslotStart)) {
                validationErrors.push({
                    name: 'start',
                    type: 'required'
                });
            }

            if (isNaN(timeslotEnd)) {
                validationErrors.push({
                    name: 'end',
                    type: 'required'
                });
            }

            if (timeslotEnd < timeslotStart) {
                validationErrors.push({
                    name: 'end',
                    type: 'hasToBeBigger'
                });
            }

            if (validationErrors.length > 0) {
                throw new ValidationError(validationErrors);
            }

            while (time <= timeslotEnd) {
                newTimeslots.push(time);
                time += 100;
            }

            for (let userDay of Object.keys(user.profile.available)) {
                if (userDay == day) {
                    mergedTimeslots = user.profile.available[userDay];

                    for (let newTimeslot of newTimeslots) {
                        if (mergedTimeslots.indexOf(newTimeslot) == -1) {
                            mergedTimeslots.push(newTimeslot);
                        }
                    }
                }
            }

            Users.persistence.update(userId, 'profile.available.' + day, mergedTimeslots);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'user.profile.availability.get': ({ language, projectId, userId, key }) => {
        checkPermissions(projectId, userId);

        const user = getExtendedUser(userId, projectId, language);
        const timeslots = user.profile.availability[key.split('_').pop()].map((obj) => {
            return {
                _id: obj.numbers.join(','),
                timeslot: obj.timeslot
            };
        });

        return {
            availability: timeslots
        };
    },
    'user.profile.availability.delete': ({ language, projectId, userId, key, timeslot }) => {
        checkPermissions(projectId, userId);

        const user = Users.findOne(userId);
        const day = key.split('_').pop().substring(0, 2);
        let newTimeslots = [];

        for (let userDay of Object.keys(user.profile.available)) {
            if (userDay == day) {
                const oldTimeslots = user.profile.available[userDay];
                const delTimeslots = timeslot.split(',');

                for (let oldTimeslot of oldTimeslots) {
                    if (delTimeslots.indexOf('' + oldTimeslot) == -1) {
                        newTimeslots.push(oldTimeslot);
                    }
                }
            }
        }

        try {
            Users.persistence.update(userId, 'profile.available.' + day, newTimeslots);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'user.profile.vacation.insert': ({ language, projectId, userId, key }, newVacation) => {
        checkPermissions(projectId, userId);

        try {
            const user = getExtendedUser(userId, projectId, language);
            let vacations = user.profile.vacations;

            // support legacy format
            for (let vacation of vacations) {
                if (vacation.createdAt == null) {
                    vacation.start = parseInt(moment(vacation.start, 'YYYYDDD').format('YYYYMMDD'));
                    vacation.end = parseInt(moment(vacation.end, 'YYYYDDD').format('YYYYMMDD'));
                }
            }

            vacations.push({
                start: newVacation.start,
                end: newVacation.end
            });

            Users.persistence.update(userId, 'profile.vacations', vacations);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'user.vacation.delete': ({ language, projectId, userId, key, vacation }) => {
        // TODO: implement
    }
});

function getExtendedUser(userId, projectId, language) {
    let user = Users.findOne({
        $and: [{
            _id: userId
        }, {
            ['roles.' + projectId]: {
                $in: Permissions.member
            }
        }, {
            username: {
                $ne: 'adm'
            }
        }]
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
            'profile.shortTermCallsAlways': 1,
            'profile.vacations': 1
        }
    });

    if (user != undefined) {
        user.profile.availability = {
            mondays: convertTimeslotToAvailability(user.profile.available.mo, language),
            tuesdays: convertTimeslotToAvailability(user.profile.available.tu, language),
            wednesdays: convertTimeslotToAvailability(user.profile.available.we, language),
            thursdays: convertTimeslotToAvailability(user.profile.available.th, language),
            fridays: convertTimeslotToAvailability(user.profile.available.fr, language),
            saturdays: convertTimeslotToAvailability(user.profile.available.sa, language),
            sundays: convertTimeslotToAvailability(user.profile.available.su, language)
        };

        for (let vacation of user.profile.vacations) {
            const dateFormatStart = TAPi18n.__('user.entity.profile.vacation.startDateFormat', {}, language);
            const dateFormatEnd = TAPi18n.__('user.entity.profile.vacation.endDateFormat', {}, language);

            // support legacy number format
            if (vacation.createdAt == null) {
                const startDisplay = moment(vacation.start, 'YYYYDDD').format(dateFormatStart);
                const endDisplay = moment(vacation.end, 'YYYYDDD').format(dateFormatEnd);
                vacation.display = startDisplay + ' ' + endDisplay;
            } else {
                const startDisplay = moment(vacation.start, 'YYYYMMDD').format(dateFormatStart);
                const endDisplay = moment(vacation.end, 'YYYYMMDD').format(dateFormatEnd);
                vacation.display = startDisplay + ' ' + endDisplay;
            }
        }
    }

    return user;
}

function convertTimeslotToAvailability(timeslots, language) {
    if (typeof timeslots == 'object' && timeslots.length > 0) {
        const dateFormatStart = TAPi18n.__('user.entity.profile.availability.startDateFormat', {}, language);
        const dateFormatEnd = TAPi18n.__('user.entity.profile.availability.endDateFormat', {}, language);
        let timePeriods = [];

        timeslots.sort((a, b) => {
            return a - b;
        });

        let periodBegin = -1;
        let lastValue = 0;
        let numbers = [];

        for (let timeslot of timeslots) {
            let timeslotHmm = timeslot;

            if (timeslotHmm == 0) {
                timeslotHmm = 2400;
            }

            if (periodBegin < 0) {
                periodBegin = timeslotHmm;
            } else if (timeslot != lastValue + 100) {
                const timeslotStart = moment(periodBegin, 'Hmm');
                const timeslotEnd = moment(lastValue + 100, 'Hmm');

                if (periodBegin == 2400 && lastValue == 2300) {
                    timePeriods.push({
                        numbers: numbers,
                        timeslot: TAPi18n.__('user.entity.profile.availability.wholeDay', {}, language)
                    });
                } else {
                    timePeriods.push({
                        numbers: numbers,
                        timeslot: timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd)
                    });
                }

                periodBegin = timeslotHmm;
                numbers = [];
            }

            lastValue = timeslot;
            numbers.push(timeslot);
        }

        const timeslotStart = moment(periodBegin, 'Hmm');
        const timeslotEnd = moment(lastValue + 100, 'Hmm');

        if (periodBegin == 2400 && lastValue == 2300) {
            timePeriods.push({
                numbers: numbers,
                timeslot: TAPi18n.__('user.entity.profile.availability.wholeDay', {}, language)
            });
        } else {
            timePeriods.push({
                numbers: numbers,
                timeslot: timeslotStart.format(dateFormatStart) + ' ' + timeslotEnd.format(dateFormatEnd)
            });
        }

        return timePeriods;
    }

    return [];
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
