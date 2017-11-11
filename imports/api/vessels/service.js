import { Vessels } from '/imports/api/vessels/vessels.coffee'

import '/imports/ui/pages/vessel/server/vessel.coffee'
import '/imports/ui/pages/vessels/server/vessels.coffee'

const PersistenceManager = require('/imports/api/persistence/PersistenceManager.js');

Meteor.methods({

    'VesselService.update': (entity) => {
        var persistenceManager = new PersistenceManager(Vessels);

        persistenceManager.update(entity);
    }
})
