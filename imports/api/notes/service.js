import Notes from '/imports/api/notes/Notes.js';
import Users from '/imports/api/users/Users.js';

Meteor.methods({
    'note.search': ({ language, projectId, searchString, limit }) => {
        checkPermissions(projectId);

        const result = {
            total: 0,
            items: []
        };

        if (typeof searchString != 'string' || searchString == '') {
            return result;
        }

        const regEx = new RegExp(searchString, 'i');
        const rolesObject = {}

        const notes = Projects.findOne(projectId, {
            fields: {
                notes: 1
            }
        }).notes;

        for (let note of notes) {
            const user = Users.findOne(note.lastChangeBy, {
                fields: {
                    'profile.firstname': 1,
                    'profile.lastname': 1
                }
            });

            if (user != undefined) {
                const username = user.profile.firstname + ' ' + user.profile.lastname;
                const dateformat = TAPi18n.__('note.search.dateFormat');
                const datetime = moment(note.lastChangeAt).format(dateformat);

                note.lastChange = username + ' (' + datetime + ')';
            } else {
                // legacy support
                const datetime = moment(note.date, 'YYYYMMDD').format('YYYY-MM-DD');

                note.lastChange = note.author + ' (' + datetime + ')';
            }

            if (note.text == undefined) {
                note.text = '';
            } else if (note.text.length > 25) {
                note.text = note.text.substring(0, 25) + ' ...';
            }
        }

        result.total = notes.length;
        result.items = notes;

        return result;
    },
    'note.get': ({ projectId, noteId }) => {
        checkPermissions(projectId);

        return getExtendedNote(projectId, noteId);
    },
    'note.getField': ({ projectId, noteId, key }) => {
        checkPermissions(projectId);

        return getExtendedNote(projectId, noteId)[key];
    },
    'note.insert': ({ projectId }, note) => {
        checkPermissions(projectId);

        try {
            Notes.persistence.insert(projectId, note);
            return note._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'note.update': ({ projectId, noteId }, key, value) => {
        checkPermissions(projectId);

        try {
            Notes.persistence.update(projectId, noteId, key, value);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'note.delete': ({ projectId, noteId }) => {
        checkPermissions(projectId);

        try {
            Notes.persistence.delete(projectId, noteId);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    }
});

function getExtendedNote(projectId, noteId) {
    const notes = Projects.findOne(projectId, {
        fields: {
            notes: 1
        }
    }).notes;

    let note = null;

    for(let n of notes) {
        if (n._id == noteId) {
            note = n;
        }
    }

    if (note != null) {
        const user = Users.findOne(note.lastChangeBy, {
            fields: {
                'profile.firstname': 1,
                'profile.lastname': 1
            }
        });

        if (user != undefined) {
            const username = user.profile.firstname + ' ' + user.profile.lastname;
            const dateformat = TAPi18n.__('note.search.dateFormat');
            const datetime = moment(note.lastChangeAt).format(dateformat);

            note.author = username;
            note.datetime = datetime;
        } else {
            // legacy support
            note.datetime = moment(note.date, 'YYYYMMDD').format('YYYY-MM-DD');
        }
    }

    return note;
}

function checkPermissions(projectId) {
    const project = Projects.findOne(projectId, { fields: { noteModule: 1 } })

    if (project == null) {
        throw new Meteor.Error('projectNotFound');
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
        throw new Meteor.Error('userNotProjectMember');
    }
}
