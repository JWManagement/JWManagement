import { Vessels } from '/imports/api/vessels/vessels.coffee'

import './publish/vessel.coffee'
import './publish/vessel.search.coffee'

const PersistenceManager = require('/imports/api/persistence/PersistenceManager.js');

Meteor.methods({
    'vessel.get': ({ vesselId }) => {
        return Projects.find({
            _id: { $in: GetGroupsForUser(Meteor.userId(), Permissions.member) }
        }, {
            fields: { vesselModule: 1, harbors: 1 }
        })
        .fetch()
        .filter((project) => project.vesselModule)
        .reduce(() => getExtendedVessel(vesselId), {});
    },
    'vessel.insert': ({}, vessel) => {
        // TODO: verify that user has permissions
        try {
            new PersistenceManager(Vessels).insert(vessel);
            return vessel._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'vessel.update': (vesselId, key, value) => {
        // TODO: verify that user has permissions
        try {
            new PersistenceManager(Vessels).update(vesselId, key, value);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'vessel.visit.insert': ({ projectId, entityId }, visit) => {
        // TODO: verify that user has permissions

        visit.projectId = projectId; // TODO: verify that is vessel project
        delete visit.userId

        const vessel = Vessels.findOne(entityId);
        let visits = vessel.visits;

        visits.push(visit);

        try {
            new PersistenceManager(Vessels).update(vessel._id, 'visits', visits); // TODO: add push method
            return vessel._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'vessel.visit.getAvailableHarbors': ({ projectId }) => {
        // TODO: verify that user has permissions

        const project = Projects.findOne(projectId, {
            fields: {
                vesselModule: 1,
                harbors: 1
            }
        });

        if (project != null && project.vesselModule) {
            return project.harbors.map(({ _id, name}) => {
                return {
                    key: _id,
                    value: name
                }
            });
        }

        return [];
    },
    'vessel.visit.get': ({ vesselId, visitId }) => {
        const projectIds = GetGroupsForUser(Meteor.userId(), Permissions.member);
        let returnVisit = {};

        // TODO: only for admin
        return [];

        Projects.find({
            _id: {
                $in: projectIds
            }
        }, {
            fields: {
                vesselModule: 1,
                harbors: 1
            }
        })
        .fetch()
        .some((project) => {
            if (project.vesselModule) {
                returnVisit = Vessels.find(vesselId, {
                    fields: {
                        visits: 1
                    }
                })
                .fetch()
                .map((vessel) => {
                    if (vessel.visits != null) {
                        return vessel.visits;
                    } else {
                        return [];
                    }
                })
                .reduce((acc, vessel) => acc.concat(vessel.visits))
                .filter((visit) => visit._id == visitId)
                .reduce((acc, visit) => visit);

                return true;
            }
        });

        return returnVisit;
    },
    'vessel.visit.getLast': ({ vesselId }) => {
        return Projects.find({
            _id: { $in: GetGroupsForUser(Meteor.userId(), Permissions.member) }
        }, {
            fields: { vesselModule: 1, harbors: 1 }
        })
        .fetch()
        .filter((project) => project.vesselModule)
        .reduce(() => getExtendedVessel(vesselId).visits, [])
        .pop();
    }
});

function getExtendedVessel(vesselId) {
    let vessel = Vessels.findOne(vesselId);

    if (vessel != undefined) {
        if ('visits' in vessel) {
            if (vessel.visits.length > 1) {
                vessel.visits.sort((a, b) => {
                    return a.date - b.date;
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
                    vessel.visits[0].email = '';
                    vessel.visits[0].phone = '';
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
