Meteor.methods({
    'dashboard.get': ({ projectId }) => {
        return {
            myProjects: [{
                _id: 'yeQQzgQrXtAGrcuJt',
                project: 'Wuppertrolley'
            }],
            myShifts: [{
                _id: 'asdf',
                tag: 'Trolleydienst',
                date: 20180501,
                start: 1000,
                end: 1200
            }, {
                _id: 'asdf2',
                tag: 'Trolleydienst',
                date: 20180501,
                start: 1000,
                end: 1200
            }]
        };
    }
});
