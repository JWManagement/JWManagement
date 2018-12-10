import React, { Component } from 'react'

export default class TeamMemberName extends Component {
  render () {
    const member = this.props.member

    if (this.props.applyStyle) {
      let styledName = member.name

      if (member.teamleader) {
        styledName = <b>{styledName}</b>
      } else if (member.substituteTeamleader) {
        styledName = <i>{styledName}</i>
      }

      if (member.thisTeamleader) {
        styledName = <u>{styledName}</u>
      }

      return styledName
    } else {
      return member.name
    }
  }
}
