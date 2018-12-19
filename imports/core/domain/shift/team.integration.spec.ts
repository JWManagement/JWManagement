import {expect} from 'chai'
import { TeamService } from "./teamService"
import { Team, TeamSize } from './team'
import { RequestStatus } from './request'
import { ShiftStatus, Shift } from './shift';

function buildShift (status: ShiftStatus) {
  return new Shift({
    isExpired: () => status === ShiftStatus.CLOSED
  })
}

describe('as a publisher', function () {
  it('i can request to be part of a shift in a team', function () {
    const team = new Team('superteam', [], new TeamSize(2, 3))
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

    const shiftRepo = {
      find: (id) => id === 'supershift' ? buildShift(ShiftStatus.OPEN) : null
    }

    const teamService = new TeamService(teamRepo, publisherRepo, shiftRepo)
    teamService.request('supershift', 'superteam', 'publisherId')

    expect(savedTeam.requests[0].status).to.eq(RequestStatus.OPEN)
  })
})
