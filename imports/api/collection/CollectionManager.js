module.exports = class CollectionManager {
    constructor(collection, db) {
        this.collection = collection;
        this.db = db;
    }

    validate(parentId, entity) {
        this.collection.schema.clean(entity, { mutate: true });
        this.collection.schema.validate(entity);
        this.checkUniqueFields(parentId, entity);
    }

    insert(parentId, entity) {
        try {
            this.validate(parentId, entity);
            this.db.update({
                _id: parentId
            }, {
                $addToSet: {
                    [this.collection.name]: entity
                }
            });
        } catch(e) {
            throw new Meteor.Error(e.error, e.details);
        }
    }

    update(parentId, entityId, key, value) {
        try {
            let entity = this.db.findOne(entityId);
            entity = getUpdatedEntity(key.split('.'), entity, value);
            this.validate(entity);
            this.db.update({
                _id: parentId,
                [this.collection.name + '._id']: entityId
            }, {
                $set: {
                    [this.collection.name + '.$']: entity
                }
            });
        } catch(e) {
            throw new Meteor.Error(e.error, e.details);
        }
    }

    delete(entity) {}

    checkUniqueFields(parentId, entity) {
        const errors = [];

        this.collection.uniqueKeys.forEach((key) => {
            if (key in entity) {
                const existingEntitiesCount = this.db
                    .findOne(parentId)[this.collection.name]
                    .filter((collectionEntity) => {
                        return collectionEntity[key] == entity[key];
                    })
                    .length;

                if (existingEntitiesCount > 0) {
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

function getUpdatedEntity(keys, entity, value) {
    const firstKey = keys.shift();

    if (keys.length > 0) {
        entity[firstKey] = getUpdatedEntity(keys, entity[firstKey], value);
        return entity;
    }

    entity[firstKey] = value;
    return entity;
}
