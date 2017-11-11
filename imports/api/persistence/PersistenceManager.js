import { Vessels } from '/imports/api/vessels/vessels.coffee'

module.exports = class PersistenceManager {
    constructor(
        db
    ) {
        this.db = db;
    }

    validate(entity) {
        this.db.schema.clean(entity, { mutate: true });
        this.db.schema.validate(entity);

        var errors = [];

        // TODO: check for unique

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }
    }

    create(entity) {
        this.validate(entity);
        this.db.insert(newVessel);
    }

    update(entity) {
        try {
            this.validate(entity);
        } catch(e) {
            throw new Meteor.Error(e.error, e.details);
        }

        console.log('doing real databse update now!');
        //Vessels.update(newVessel);
    }

    delete(entity) {}
}
