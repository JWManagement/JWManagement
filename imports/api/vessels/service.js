import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/vessels/server/vessel.coffee'
import '/imports/ui/vessels/server/vessel.search.coffee'

const PersistenceManager = require('/imports/api/persistence/PersistenceManager.js');

Meteor.methods({

    'vessel.update': (entityId, key, value) => {
        var persistenceManager = new PersistenceManager(Vessels);

        persistenceManager.update(entityId, key, value);
    }
})
