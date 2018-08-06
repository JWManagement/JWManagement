import Vessels from '/imports/api/vessels/Vessels';

// to use this, import the file

Meteor.methods({
  setProjectUsersProfile: function(projectId) {
    var k, len, ref, user, users;

    if (Meteor.isServer) {
      console.log('setProjectUsersProfile');
      console.log('!!! DISABLED !!!');
      return;

      if (Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
        users = Roles.getUsersInRole(Permissions.member, projectId);
        ref = users.fetch();

        for (k = 0, len = ref.length; k < len; k++) {
          user = ref[k];
          console.log(user.username);

          Meteor.users.update(user._id, {
            $set: {
              'profile.shortTermCalls': true
            }
          });
        }

        return console.log('done');
      } else {
        return console.log('no permission');
      }
    }
  },
  setVesselId: function() {
    var compare, i, j, k, len, vessel, vessels;

    if (Meteor.isServer) {
      console.log('setVesselId');
      console.log('!!! DISABLED !!!');
      return;

      if (Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
        vessels = Vessels.find().fetch();
        compare = Math.round(vessels.length / 10);
        i = 0;
        j = 0;

        for (k = 0, len = vessels.length; k < len; k++) {
          vessel = vessels[k];

          Vessels.update(vessel._id, {
            $set: {
              harborGroup: 'Service Department'
            }
          });

          i++;
          if (i % compare === 0) {
            j++;
            console.log(j + ' / 10');
          }
        }

        return console.log('done');
      } else {
        return console.log('no permission');
      }
    }
  }
});
