import Permissions from '/imports/api/util/Permissions.js';

Meteor.methods({
    'dashboard.get': ({ projectId }) => {
        const userId = Meteor.userId();
        const projectIds = Roles.getAllGroupsForUser(userId, Permissions.member);
        const today = parseInt(moment().format('YYYYDDD'));

        const projects = getProjects(projectIds);
        const missingShiftReports = getMissingShiftReports(projectIds, projects, today, userId);
        const upcomingShifts = getUpcomingShifts(projectIds, projects, today, userId);

        return {
            myProjects: projects.map((project) => {
                delete project.name;
                delete project.tags;
                return project;
            }),
            missingShiftReports: missingShiftReports.map((shift) => {
                delete shift.tagId;
                delete shift.teams;
                return shift;
            }),
            upcomingShifts: upcomingShifts.map((shift) => {
                delete shift.tagId;
                return shift;
            })
        };
    }
});

function getProjects(projectIds) {
    return Projects.find({
        _id: {
            $in: projectIds
        }
    }, {
        fields: {
            name: 1,
            news: 1,
            tags: 1,
            vesselModule: 1
        },
        sort: {
            name: 1,
            _id: 1
        }
    })
    .fetch()
    .map((project) => {
        project.project = project.name;
        return project;
    });
}

function getMissingShiftReports(projectIds, projects, date, userId) {
    console.log({
        projectId: {
            $in: projectIds
        },
        date: {
            $lt: date
        },
        teams: {
            participants: {
                $elemMatch: {
                    _id: userId,
                    thisTeamleader: true
                }
            },
            $not: {
                $elemMatch: {
                    'report.submitted': true
                }
            }
        }
    });

    return Shifts.find({
        projectId: {
            $in: projectIds
        },
        date: {
            $lt: date
        },
        'teams.participants': {
            $elemMatch: {
                _id: userId,
                thisTeamleader: true
            }
        }
    }, {
        fields: {
            projectId: 1,
            tagId: 1,
            date: 1,
            start: 1,
            end: 1,
            teams: 1
        },
        sort: {
            date: 1,
            start: 1,
            end: 1,
            tagId: 1
        }
    })
    .fetch()
    .filter((shift) => {
        console.log(shift);

        // only return shift if my team hasn't submitted the report yet
        return shift.teams.filter((team) => {
            return team.report == null || !team.report.submitted;
        }).length > 0;
    })
    .map((shift) => {
        const project = projects.filter((project) => {
            return project._id == shift.projectId;
        })[0];

        const tag = project.tags.filter((tag) => {
            return tag._id == shift.tagId;
        })[0];

        shift.tag = tag.name;
        shift.date = parseInt(moment(shift.date, 'YYYYDDD').format('YYYYMMDD'));

        return shift;
    });
}

function getUpcomingShifts(projectIds, projects, date, userId) {
    return Shifts.find({
        projectId: {
            $in: projectIds
        },
        date: {
            $gte: date
        },
        'teams.participants._id': userId
    }, {
        fields: {
            projectId: 1,
            tagId: 1,
            date: 1,
            start: 1,
            end: 1
        },
        sort: {
            date: 1,
            start: 1,
            end: 1,
            tagId: 1
        }
    })
    .fetch()
    .map((shift) => {
        const project = projects.filter((project) => {
            return project._id == shift.projectId;
        })[0];

        const tag = project.tags.filter((tag) => {
            return tag._id == shift.tagId;
        })[0];

        shift.tag = tag.name;
        shift.date = parseInt(moment(shift.date, 'YYYYDDD').format('YYYYMMDD'));

        return shift;
    });
}
