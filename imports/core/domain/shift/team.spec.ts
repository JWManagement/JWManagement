import { expect } from 'chai'
import * as moment from 'date-fns'
import { Team, TeamStatus, TeamSize, size } from './team';
import { DomainError } from '../errors';

function buildTeam (s: number[] = [1, 2], timeframe = { isExpired: () => false }) {
  const now = new Date()
  return new Team('superteam', [], size.apply(null, s), timeframe)
}

describe('a team', function () {
  describe('that is open for requests', function () {
    let team = buildTeam()

    it('a publisher can make a request', function () {
      expect(team.status).to.eq(TeamStatus.PENDING)
      team.request('')
      expect(team.status).to.eq(TeamStatus.OK)
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

  describe('that is expired', function () {
    let team = buildTeam([1, 2], { isExpired: () => true })

    it('has status expired and throws an error on request', function () {
      expect(team.status).to.eq(TeamStatus.EXPIRED)
      expect(() => team.request('')).to.throw(DomainError.TEAM_HAS_EXPIRED)
    })
  })
})
