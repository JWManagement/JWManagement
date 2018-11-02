import {expect} from 'chai'
import { TeamService } from "./teamService"
import { Team, TeamSize } from './team'
import { Request, RequestStatus } from './request'

describe('as a publisher', function () {
  it('i can request to be part of a shift in a team', function () {
    const team = new Team('superteam', [], new TeamSize(2, 3), {
      isExpired: () => false
    })
    let savedTeam

    const teamRepo = {
      find (id): Team | null {
        console.log(`id: ${id}`)
        return id === team.teamId ? team : null
      },
      save (team) {
        savedTeam = team
      }
    }

    const publisherRepo = {
      find: (id) => id === 'publisherId'
    }

    const teamService = new TeamService(teamRepo, publisherRepo)
    teamService.request('superteam', 'publisherId')

    expect(savedTeam.requests[0].status).to.eq(RequestStatus.OPEN)
  })
})
