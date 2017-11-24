import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.insert.tpl.jade';

import '/imports/ui/InsertForm/InsertForm.js';

Template['vessel.insert'].helpers({
    data: () => {
        return {
            db: Vessels
        }
    }
});
