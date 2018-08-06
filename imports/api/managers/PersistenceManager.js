import { Meteor } from 'meteor/meteor';

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
      let entity = this.db.findOne(entityId);
      entity = getUpdatedEntity(key.split('.'), entity, value);
      this.validate(entity);
      this.db.update(entityId, entity);
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

function getUpdatedEntity(keys, entity, value) {
  const firstKey = keys.shift();

  if (keys.length > 0) {
    entity[firstKey] = getUpdatedEntity(keys, entity[firstKey], value);
    return entity;
  }

  entity[firstKey] = value;
  return entity;
}
