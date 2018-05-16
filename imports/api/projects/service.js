import Permissions from '/imports/api/util/Permissions.js'

Meteor.methods({
    'project.search': ({ language, searchString, limit }) => {
        if (!Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
            return [];
        }

        const result = {
            total: 0,
            items: []
        };

        if (typeof searchString != 'string' || searchString == '') {
            return result;
        }

        const regEx = new RegExp(searchString, 'i');

        const cursor = Projects.find({
            $or: [
                { _id: searchString },
                { name: regEx }
            ]
        }, {
            fields: {
                'name': 1
            },
            sort: {
                name: 1
            },
            limit: limit
        });

        result.total = cursor.count();
        result.items = cursor.fetch();

        return result;
    },
    'project.get': ({ projectId }) => {
        const project = Projects.findOne(projectId, {
            fields: {
                name: 1,
                'news.text': 1,
                vesselModule: 1
            }
        });

        if (project == null) {
            throw new Meteor.Error('projectNotFound');
        }

        if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
            throw new Meteor.Error('youAreNotProjectAdmin');
        }

        return project;
    }
});
