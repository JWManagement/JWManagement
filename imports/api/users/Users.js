import SimpleSchema from 'simpl-schema';
import Gender from '/imports/api/dropdowns/Gender.js';
import Pioneer from '/imports/api/dropdowns/Pioneer.js';
import Privilege from '/imports/api/dropdowns/Privilege.js';
import SystemLanguages from '/imports/api/dropdowns/SystemLanguages.js';
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
        defaultValue: 'm',
        allowedValues: Gender.allowedValues
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
        defaultValue: 'publisher',
        allowedValues: Pioneer.allowedValues
    },
    'profile.privilege': {
        type: String,
        defaultValue: 'publisher',
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
        optional: true
    },
    'profile.available.mo': {
        type: Array,
        optional: true
    },
    'profile.available.mo.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.tu': {
        type: Array,
        optional: true
    },
    'profile.available.tu.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.we': {
        type: Array,
        optional: true
    },
    'profile.available.we.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.th': {
        type: Array,
        optional: true
    },
    'profile.available.th.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.fr': {
        type: Array,
        optional: true
    },
    'profile.available.fr.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.sa': {
        type: Array,
        optional: true
    },
    'profile.available.sa.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.available.su': {
        type: Array,
        optional: true
    },
    'profile.available.su.$': {
        type: Number,
        min: 0,
        max: 2300
    },
    'profile.vacations': {
        type: Array,
        defaultValue: []
    },
    'profile.vacations.$': new SimpleSchema({
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
        start: {
            type: Number,
            min: 20000000,
            max: 20250000
        },
        end: {
            type: Number,
            min: 20000000,
            max: 20250000
        }
    }),
    'profile.shortTermCalls': {
        type: Boolean,
        defaultValue: false
    },
    'profile.shortTermCallsAlways': {
        type: Boolean,
        defaultValue: false
    },
    state: {
        type: String,
        optional: true
    },
    services: {
        type: Object,
        blackbox: true,
        optional: true
    },
    roles: {
        type: Object,
        blackbox: true,
        optional: true
    }
});

Users.uniqueKeys = ['username'];

Users.attachSchema = Users.schema;

Users.persistence = new PersistenceManager(Users);

export default Users;
