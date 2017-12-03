import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/vessels/server/vessel.coffee'
import '/imports/ui/vessels/server/vessel.search.coffee'

const PersistenceManager = require('/imports/api/persistence/PersistenceManager.js');

Meteor.methods({
    'vessel.insert': (params, vessel) => {
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
    'vessel.visit.insert': (params, visit) => {
        // TODO: verify that user has permissions

        visit.date = new Date(visit.date);
        visit.harborGroupId = params.projectId; // TODO: verify that is vessel project
        delete visit.userId

        const vessel = Vessels.findOne(params.itemId);
        let visits = vessel.visits;

        visits.push(visit);

        try {
            new PersistenceManager(Vessels).update(vessel._id, 'visits', visits);
            return vessel._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    }
})
