Meteor.methods({

    createProject: (args) => {
        if (Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
            Projects.insert({
                _id: args.projectId,
                name: args.projectName,
                email: args.email,
                language: args.language,
                news: {},
                wiki: {
                    tabs: []
                },
                tags: [
                    {
                        _id: args.tagId,
                        name: args.tagName,
                        templates: []
                    }
                ],
                teams: [
                    {
                        _id: args.teamId,
                        name: args.teamName,
                        link: '',
                        description: '',
                        icon: 'fa-map-signs'
                    }
                ],
                meetings: [],
                store: {}
            });

            const username = Random.id(5);

            Meteor.call('createAccount', {
                username: username,
                password: '',
                profile: {
                    firstname: args.firstName,
                    lastname: args.lastName,
                    email: args.email,
                    gender: 'm',
                    language: args.language
                }
            },
            args.projectId,
            () => {
                const user = Meteor.users.findOne({ username: username });
                const userId = user._id;

                Meteor.call('changeProjectRole', args.projectId, userId, 'admin');
                Meteor.call('changeTagRole', args.tagId, userId, 'teamleader');

                return Meteor.call('sendInvitationMails', [userId], args.projectId);
            });
        }
    }
});
