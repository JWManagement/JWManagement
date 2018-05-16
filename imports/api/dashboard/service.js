import Permissions from '/imports/api/util/Permissions.js';

Meteor.methods({
    'dashboard.get': ({ projectId }) => {
        const projectIds = Roles.getAllGroupsForUser(Meteor.userId(), Permissions.member);

        const projects = Projects.find({
            _id: {
                $in: projectIds
            }
        }, {
            fields: {
                name: 1,
                news: 1,
                vesselModule: 1
            }
        })
        .fetch()
        .map((project) => {
            project.project = project.name;
            delete project.name;
            return project;
        });

        return {
            myProjects: projects,
            myShifts: [{
                _id: 'asdf',
                tag: 'Trolleydienst',
                date: 20180501,
                start: 1000,
                end: 1200
            }, {
                _id: 'asdf2',
                tag: 'Trolleydienst',
                date: 20180501,
                start: 1000,
                end: 1200
            }]
        };
    }
});
