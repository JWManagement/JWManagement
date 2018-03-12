import Helpers from './routeHelpers.js';

// search
FlowRouter.route('/:language/:projectId/new/notes', {
    name: 'note.search',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/notes/note.search.js');
            BlazeLayout.render('note.search');
        });
    }
});

// insert
FlowRouter.route('/:language/:projectId/new/notes/new', {
    name: 'note.insert',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/notes/note.insert.js');
            BlazeLayout.render('note.insert');
        });
    }
});

// details
FlowRouter.route('/:language/:projectId/new/notes/:noteId', {
    name: 'note.details',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/notes/note.details.js');
            BlazeLayout.render('note.details');
        });
    }
});

//update
FlowRouter.route('/:language/:projectId/new/notes/:noteId/:key', {
    name: 'note.update',
    triggersEnter: [ Helpers.checkLanguage ],
    action: () => {
        Helpers.doIfLoggedIn(() => {
            require('/imports/ui/notes/note.update.js');
            BlazeLayout.render('note.update');
        });
    }
});
