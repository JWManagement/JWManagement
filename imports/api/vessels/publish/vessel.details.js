import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish('vessel.details', function(vesselId, projectId) {

    if (typeof(vesselId) != 'string' || vesselId == '') {
        return [];
    }

    if (!Roles.userIsInRole(this.userId, Permissions.member, projectId)) {
        return [];
    }

    const project = Projects.findOne(projectId, {
        fields: {
            vesselModule: 1
        }
    });

    if (project == null || !project.vesselModule) {
        return [];
    }

    const cursor = Vessels.find({
        _id: vesselId
    });

    const handle = cursor.observe({
        added: (vessel) => {
            this.added('vessels', vessel._id, getExtendedVessel(vessel));
        },
        changed: (newVessel, oldVessel) => {
            this.changed('vessels', oldVessel._id, getExtendedVessel(newVessel));
        }
    });

    this.ready();

    this.onStop(() => {
        handle.stop();
    });
});

function getExtendedVessel(vesselId) {
    let vessel = Vessels.findOne(vesselId);

    if (vessel != undefined) {
        if ('visits' in vessel) {
            if (vessel.visits.length > 1) {
                vessel.visits.sort((a, b) => {
                    a.date - b.date
                });
                vessel.visits = [vessel.visits.pop()];
            }

            if (vessel.visits.length > 0) {
                if (vessel.visits[0].isUserVisible) {
                    const author = Meteor.users.findOne(vessel.visits[0].createdBy, {
                        fields: {
                            'profile.firstname': 1,
                            'profile.lastname': 1,
                            'profile.telefon': 1,
                            'profile.email': 1
                        }
                    });

                    vessel.visits[0].person = author.profile.firstname + ' ' + author.profile.lastname;
                    vessel.visits[0].email = author.profile.email;
                    vessel.visits[0].phone = author.profile.telefon;
                } else {
                    vessel.visits[0].person = 'Not visible';
                    vessel.visits[0].email = '-';
                    vessel.visits[0].phone = '-';
                }

                const project = Projects.findOne(vessel.visits[0].projectId, {
                    fields: {
                        country: 1,
                        harborGroup: 1,
                        harbors: 1
                    }
                });

                vessel.visits[0].country = project.country;
                vessel.visits[0].harborGroup = project.harborGroup;

                vessel.visits[0].harbor = project.harbors.filter((harbor) => {
                    return harbor._id == vessel.visits[0].harborId;
                })[0].name;
            }
        } else {
            vessel.visits = [];
        }
}

    return vessel;
}
