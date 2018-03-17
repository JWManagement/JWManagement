import SimpleSchema from 'simpl-schema';
import Gender from '/imports/api/dropdowns/gender.js';
import Pioneer from '/imports/api/dropdowns/pioneer.js';
import Privilege from '/imports/api/dropdowns/privilege.js';
import SystemLanguages from '/imports/api/dropdowns/systemLanguages.js';
import { Mongo } from 'meteor/mongo';

const PersistenceManager = require('/imports/api/managers/PersistenceManager.js');

let Users = Meteor.users;

Users.deny({
    insert: () => { return true; },
    update: () => { return true; },
    remove: () => { return true; }
});

Users.schema = new SimpleSchema({
    _id: {
        type: String,
        autoValue: function() {
            if (!this.isSet) {
                return Random.id();
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.isSet) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: function() {
            if (!this.isSet) {
                return Meteor.userId();
            }
        }
    },
    lastChangeBy: {
        type: String,
        autoValue: function() {
            return Meteor.userId();
        }
    },
    username: {
        type: String,
        autoValue: function () {
            if (this.isSet && typeof this.value === "string") {
                return this.value.toLowerCase().replace(/[^a-z0-9 äöü_-]+/g, '');
            }
          }
    },
    status: {
        type: Object,
        blackbox: true,
        optional: true
    },
    profile: {
        type: Object
    },
    'profile.firstname': {
        type: String
    },
    'profile.lastname': {
        type: String
    },
    'profile.email': {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    'profile.gender': {
        type: String,
        allowedValues: Gender.allowedValues
    },
    'profile.bdate': {
        type: Number,
        optional: true
    },
    'profile.language': {
        type: String,
        defaultValue: 'en',
        allowedValues: SystemLanguages.allowedValues
    },
    'profile.languages': {
        type: String,
        optional: true
    },
    'profile.pioneer': {
        type: String,
        allowedValues: Pioneer.allowedValues
    },
    'profile.privilege': {
        type: String,
        allowedValues: Privilege.allowedValues
    },
    'profile.telefon': {
        type: String,
        optional: true
    },
    'profile.congregation': {
        type: String,
        optional: true
    },
    'profile.available': {
        type: Object,
        blackbox: true,
        optional: true
    },
    'profile.vacations': {
        type: Array,
        blackbox: true,
        optional: true
    },
    'profile.shortTermCalls': {
        type: Boolean,
        defaultValue: false
    },
    'profile.shortTermCallsAlways': {
        type: Boolean,
        defaultValue: false
    },
    state: {
        type: String
    },
    services: {
        type: Object,
        blackbox: true
    },
    roles: {
        type: Object,
        blackbox: true
    }
});

Users.uniqueKeys = ['username'];

Users.attachSchema = Users.schema;

Users.persistence = new PersistenceManager(Users);

export default Users;
