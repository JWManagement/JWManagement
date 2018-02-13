import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

let Users = Meteor.users;

Users.deny({
    insert: () => { return true; },
    update: () => { return true; },
    remove: () => { return true; }
});
/*
Users.schema = new SimpleSchema({
    _id: {
        type: String,
        autoValue: () => {
            if (!this.isSet) {
                return Random.id();
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: () => {
            if (!this.isSet) {
                return new Date;
            }
        }
    },
    createdBy: {
        type: String,
        autoValue: () => {
            if (!this.isSet) {
                return Meteor.userId();
            }
        }
    },
    lastChangeBy: {
        type: String,
        autoValue: () => {
            return Meteor.userId();
        }
    },
    name: {
        type: String
    },
    flag: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        allowedValues: ['c', 'cr', 'mf', 'mt', 'p', 'pt', 'rc', 'f', 'ro', 't', 'unknown']
    },
    callsign: {
        type: String,
        optional: true
    },
    eni: {
        type: String,
        optional: true
    },
    imo: {
        type: String,
        optional: true
    },
    mmsi: {
        type: String,
        optional: true
    },
    visits: {
        type: Array,
        optional: true
    },
    'visits.$': new SimpleSchema({
        _id: {
            type: String,
            autoValue: () => {
                if (!this.isSet) {
                    return Random.id();
                }
            }
        },
        createdAt: {
            type: Date,
            autoValue: () => {
                return new Date;
            }
        },
        createdBy: {
            type: String,
            autoValue: () => {
                return Meteor.userId();
            }
        },
        isUserVisible: {
            type: Boolean,
            autoValue: () => {
                if (!this.isSet) {
                    return true;
                }
            }
        },
        projectId: {
            type: String
        },
        harborId: {
            type: String
        },
        date: {
            type: Number
        },
        dateNext: {
            type: Number,
            optional: true
        },
        languageIds: {
            type: Array,
            optional: true
        },
        'languageIds.$': {
            type: String
        }
    })
});

Users.uniqueKeys = ['callsign', 'eni', 'imo', 'mmsi'];

Users.attachSchema = Users.schema;
*/
export default Users;
