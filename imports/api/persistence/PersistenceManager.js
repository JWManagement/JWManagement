import { Vessels } from '/imports/api/vessels/vessels.coffee'

module.exports = class PersistenceManager {
    constructor(db) {
        this.db = db;
    }

    validate(entity) {
        this.db.schema.clean(entity, { mutate: true });
        this.db.schema.validate(entity);
        this.checkUniqueFields(entity);
    }

    insert(entity) {
        this.validate(entity);
        this.db.insert(entity);
    }

    update(entityId, key, value) {
        try {
            const entity = this.db.findOne(entityId);
            entity[key] = value;
            this.validate(entity);
            this.db.update(entity._id, entity);
        } catch(e) {
            throw new Meteor.Error(e.error, e.details);
        }
    }

    delete(entity) {}

    checkUniqueFields(entity) {
        const errors = [];

        this.db.uniqueKeys.forEach((key) => {
            if (key in entity) {
                const alreadyExistingEntitiesCount = this.db.find({
                    _id: {
                        $ne: entity._id
                    },
                    [key]: new RegExp('^' + entity[key] + '$', 'i')
                }, {
                    fields: {
                        _id: 1
                    }
                }).count();

                if (alreadyExistingEntitiesCount > 0) {
                    errors.push({
                        name: key,
                        type: 'unique'
                    });
                }
            }
        });

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }
    }
}
