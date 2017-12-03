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
    }
})
