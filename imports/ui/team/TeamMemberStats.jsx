import React, { Component } from 'react'

export default class TeamMemberStats extends Component {
  render () {
    const stats = UserStatistics.findOne(this.props.userId)

    if (!stats) {
      return <i className='fa fa-spinner fa-pulse' />
    }

    const dayStats = `D:${stats.countDayApproved}/${stats.countDayOverall}`
    const weekStats = `W:${stats.countWeekApproved}/${stats.countWeekOverall}`
    const fourWeeksStats = `4W:${stats.countWeeksApproved}/${stats.countWeeksOverall}`

    return ` (${stats.congregation}/${stats.privileges}) ${dayStats} ${weekStats} ${fourWeeksStats}`
  }
}
