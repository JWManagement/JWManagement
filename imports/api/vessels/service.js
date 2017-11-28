import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/vessels/server/vessel.coffee'
import '/imports/ui/vessels/server/vessel.search.coffee'

const PersistenceManager = require('/imports/api/persistence/PersistenceManager.js');

Meteor.methods({
    'vessel.insert': (entity) => {
        try {
            const persistenceManager = new PersistenceManager(Vessels);
            persistenceManager.insert(entity);
            return entity._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'vessel.update': (entityId, key, value) => {
        try {
            const persistenceManager = new PersistenceManager(Vessels);
            persistenceManager.update(entityId, key, value);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    }
})
