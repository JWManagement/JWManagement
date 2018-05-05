export default RoleManager = {

    setProjectPermission: (projectId, userId) => {
        if (Permissions.member.indexOf(permission) > -1) {
            if (Roles.userIsInRole(userId, Permissions.member, projectId)) {
                Roles.removeUsersFromRoles(userId, Permissions.member, projectId);
            }

            Roles.addUsersToRoles(userId, permission, projectId);
        }
    },

    removeProjectPermission: (projectId, userId) => {
        Roles.removeUsersFromRoles(userId, Permissions.member, projectId);
    },

    setTagPermission: (projectId, tagId, userId, permission) => {
        if (Permissions.participant.indexOf(permission) > -1) {
            if (Roles.userIsInRole(userId, Permissions.participant, tagId)) {
                Roles.removeUsersFromRoles(userId, Permissions.participant, tagId);
            }

            Roles.addUsersToRoles(userId, permission, tagId);
        }
    },

    removeTagPermission: (tagId, userId) => {
        Roles.removeUsersFromRoles(userId, Permissions.participant, tagId);
    },

    hasPermission: (projectId, permissions, userId = Meteor.userId()) => {
        return Roles.userIsInRole(userId, permissions, projectId);
    },

    hasPermissions: (userId) => {
        const groups = Roles.getGroupsForUser(userId);

        for (let group of groups) {
            if (Roles.userIsInRole(userId, Permissions.member, group)) {
                return true;
            }
        }

        return false;
    }

}
