import { expect } from 'chai'
import { Team, TeamStatus, size } from './team';
import { DomainError } from '../errors';
import { RequestStatus } from './request';
import { TeamService } from './teamService';

function buildTeam(s: number[] = [1, 2]) {
  return new Team('superteam', [], size.apply(null, s))
}

describe('a team', function () {
  describe('accepts requests from publishers if', function () {
    let team: Team

    beforeEach(function () {
      team = buildTeam([1, 2])
    })

    it('has participant slots available', function () {
      const request = team.request('publisherId')
      expect(request.status).to.eq(RequestStatus.OPEN)
    })

    it('has no existing participation request from them', function () {
      team.request('publisherId')
      expect(() => team.request('publisherId')).to.throw(DomainError.PUBLISHER_ALREADY_REQUESTED)
    })

    it('has a BAILED participation request from them', function () {
      const request = team.request('publisherId')
      team.approve(request.requestId)
      team.bail(request.requestId)
      expect(() => team.request('publisherId')).not.to.throw()
    })

    it('has a CANCELLED participation request from them', function () {
      const request = team.request('publisherId')
      team.retract(request.requestId)
      expect(() => team.request('publisherId')).not.to.throw()
    })

    it('belongs to a not EXPIRED shift', function () {
      // handled by team service
    })
  })

  describe('accepts requests from teamleaders', function () {
    it('has participant or team leader slots available', function () {
      // expect(false).to.eq(true)
    })
  })

  describe('that has one slot left', function () {
    let team = buildTeam([1, 1])

    it('is full after one more request', function () {
      expect(team.status).to.eq(TeamStatus.PENDING)
      team.request('')
      expect(team.status).to.eq(TeamStatus.FULL)
    })
  })

  describe('that is already full', function () {
    let team = buildTeam([0, 0])

    it('throws an error on the next request', function () {
      expect(team.status).to.eq(TeamStatus.FULL)
      expect(() => team.request('')).to.throw(DomainError.TEAM_ALREADY_FULL)
    })
  })

  // describe('a request', function () {
  //   it('can be retracted by the publisher', function () {
  //     expect(false).to.eq(true)
  //   })
  //   it('can be approved by a scheduler', function () {
  //     expect(false).to.eq(true)
  //   })
  //   it('can be declined by a scheduler', function () {
  //     expect(false).to.eq(true)
  //   })
  //   it('can be bailed by the publisher', function () {
  //     expect(false).to.eq(true)
  //   })
})


