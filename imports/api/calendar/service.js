import Permissions from '/imports/api/util/Permissions.js'

Meteor.methods({
    'calendar.getShifts': ({ projectId, date }) => {
        checkPermissions(projectId);

        const project = Projects.findOne(projectId, { fields: { tags: 1 } });

        const tagIds = Roles.getGroupsForUser(Meteor.userId()).filter((tagId) => {
            return project.tags.map((tag) => {
                return tag._id;
            })
            .indexOf(tagId) > -1;
        });

        const shifts = Shifts.find({
            projectId: projectId,
            tagId: {
                $in: tagIds
            },
            date: date
        }, {
            fields: {
                date: 1,
                start: 1,
                end: 1,
                status: 1,
                tagId: 1,
                'teams._id': 1
            },
            sort: {
                start: 1,
                end: 1,
                tagId: 1
            }
        })
        .fetch();

        for (let shift of shifts) {
            for (let tag of project.tags) {
                if (tag._id == shift.tagId) {
                    shift.tag = tag.name;
                }
            }
        }

        return shifts;
    }
});

function checkPermissions(projectId) {
    const project = Projects.findOne(projectId, { fields: { _id: 1 } });

    if (project == null) {
        throw new Meteor.Error('projectNotFound');
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
        throw new Meteor.Error('userNotProjectMember');
    }
}
