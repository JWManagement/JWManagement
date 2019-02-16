import React from "react";
import { withTracker } from "meteor/react-meteor-data"; // see https://atmospherejs.com/meteor/react-meteor-data#usage

const UserDetail = ({ currentUser }) => (
  <div>
    Hello {currentUser && currentUser.profile.firstname}{" "}
    {console.log(currentUser)}
  </div>
);

export default withTracker(() => {
  const userId = FlowRouter.current().params.userId;
  console.log(userId);
  
  const currentUser = Meteor.users.findOne(userId, {
    fields: {
      username: 1,
      "profile.firstname": 1,
      "profile.lastname": 1,
      "profile.email": 1,
      "profile.telefon": 1,
      "profile.gender": 1,
      "profile.congregation": 1,
      "profile.pioneer": 1,
      "profile.privilege": 1,
      "profile.language": 1,
      "profile.languages": 1,
      "profile.available": 1,
      "profile.shortTermCalls": 1,
      "profile.shortTermCallsAlways": 1,
      "profile.vacations": 1,
      roles: 1
    }
  });

  return {
    currentUser
  };
})(UserDetail);
