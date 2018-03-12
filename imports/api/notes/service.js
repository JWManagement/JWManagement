import Notes from '/imports/api/notes/notes.js'
import './publish/note.search.coffee'

Meteor.methods({
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
            Notes.persistence.insert(note);
            return note._id;
        } catch(e) {
            throw new Meteor.Error(e);
        }
    },
    'note.update': ({ projectId, noteId }, key, value) => {
        checkPermissions(projectId);

        try {
            Notes.persistence.update(noteId, key, value);
        } catch(e) {
            throw new Meteor.Error(e);
        }
    }
});

function getExtendedNote(projectId, noteId) {
    //let note = Notes.findOne(noteId);

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
        // do stuff here
    }

    return note;
}

function checkPermissions(projectId) {
    const project = Projects.findOne(projectId, { fields: { noteModule: 1 } })

    if (project == null || project.noteModule != true) {
        throw new Meteor.Error('projectNotFound');
    }

    if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
        throw new Meteor.Error('userNotProjectMember');
    }
}
