import Permissions from '/imports/api/util/Permissions.js';

Meteor.methods({
    'dashboard.get': ({ projectId }) => {
        const userId = Meteor.userId();

        const projectIds = Roles.getAllGroupsForUser(userId, Permissions.member);

        const projects = Projects.find({
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

        const today = parseInt(moment().format('YYYYDDD'));

        const upcomingShifts = Shifts.find({
            projectId: {
                $in: projectIds
            },
            date: {
                $gte: today
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

        return {
            myProjects: projects.map((project) => {
                delete project.name;
                delete project.tags;
                return project;
            }),
            upcomingShifts: upcomingShifts.map((shift) => {
                delete shift.tagId;
                return shift;
            })
        };
    }
});
