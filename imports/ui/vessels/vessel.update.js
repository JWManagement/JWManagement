import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.update.tpl.jade';

import '/imports/ui/UpdateForm/UpdateForm.js';

Template['vessel.update'].helpers({
    data: () => {
        return {
            db: Vessels
        }
    }
});
