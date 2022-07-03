import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

export default ({ member, applyStyle, showCongregationName }) => {
  const congregation = useTracker(() => {
    if (!showCongregationName) {
      return
    }
    const projectId = FlowRouter.getParam('projectId')
    Meteor.subscribe('userCongregation', projectId, member._id)
    const userCongregation = UserCongregations.findOne(member._id)
    return userCongregation && userCongregation.congregation
  }, [member, showCongregationName])

  const styledName = member.name + (congregation ? ` (${congregation})` : '')

  if (member.thisTeamleader) {
    return <u>{styledName}</u>
  }

  if (applyStyle) {
    if (member.teamleader) {
      return <b>{styledName}</b>
    } else {
      if (member.substituteTeamleader) {
        return <i>{styledName}</i>
      }
    }
  }

  return styledName
}
