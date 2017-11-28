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

    insert(entity) {
        this.validate(entity);
        this.db.insert(entity);
    }

    update(entityId, key, value) {
        try {
            var entity = this.db.findOne(entityId);
            entity[key] = value;
            this.validate(entity);
            Vessels.update(entity._id, entity);
        } catch(e) {
            throw new Meteor.Error(e.error, e.details);
        }
    }

    delete(entity) {}
}
