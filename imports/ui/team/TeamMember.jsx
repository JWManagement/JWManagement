import React, { Component } from 'react'
import TeamMemberName from './TeamMemberName'
import TeamMemberStats from './TeamMemberStats'

export default class TeamMember extends Component {
  render () {
    const member = this.props.member
    let setLeaderButton = ''
    let declineButton = ''
    let mailStatusButton = ''

    if (this.props.showSetLeader) {
      if (!member.thisTeamleader && (member.teamleader || member.substituteTeamleader)) {
        setLeaderButton = (
          <a className='setLeader' href=''>
            <i className='fa fa-star fa-fw' />
          </a>
        )
      }
    }

    if (this.props.showDecline) {
      declineButton = (
        <a className='declineParticipant' href=''>
          <i className='fa fa-thumbs-down fa-fw' />
        </a>
      )
    }

    if (this.props.showMailStatus) {
      if (member.informed) {
        mailStatusButton = (
          <a className='sentConfirmation pull-right m-l-sm' href=''>
            <i className='fa fa-send' />
          </a>
        )
      } else {
        mailStatusButton = (
          <a className='sendConfirmation pull-right m-l-sm' href=''>
            <i className='fa fa-send-o' />
          </a>
        )
      }
    }

    const mailtoLink = member.email ? (
      <a href={'mailto:' + member.email}>
        <i className='fa fa-envelope fa-fw' />
      </a>
    ) : ''

    const phoneLink = member.phone ? (
      <a href={'tel:' + member.phone}>
        <i className='fa fa-phone fa-fw' />
      </a>
    ) : ''
    return (
      <div>
        <TeamMemberName member={member} applyStyle={this.props.showStats} hideCongregationName={this.props.showStats} />
        <TeamMemberStats userId={member._id} showStats={this.props.showStats} />

        <div className='float-right'>
          {setLeaderButton}
          {declineButton}
          {mailStatusButton}
          {mailtoLink}
          {phoneLink}
        </div>
      </div>
    )
  }
}
