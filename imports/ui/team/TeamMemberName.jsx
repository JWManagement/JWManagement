import React, { Component } from 'react'

export default class TeamMemberName extends Component {
  render () {
    const member = this.props.member
    let styledName = member.name

    if (member.thisTeamleader) {
      styledName = <u>{styledName}</u>
    }

    if (this.props.applyStyle) {
      if (member.teamleader) {
        styledName = <b>{styledName}</b>
      } else if (member.substituteTeamleader) {
        styledName = <i>{styledName}</i>
      }
    }

    return styledName
  }
}
