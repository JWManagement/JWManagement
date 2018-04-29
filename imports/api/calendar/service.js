import Permissions from '/imports/api/util/Permissions.js'

Meteor.methods({
    'calendar.getShifts': ({ projectId }) => {
        const project = Projects.findOne(projectId, {
            fields: {
                vesselModule: 1
            }
        });

        if (project == null) {
            throw new Meteor.Error('projectNotFound');
        }

        if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
            throw new Meteor.Error('youAreNoProjectMember');
        }

        return project;
    }
});
