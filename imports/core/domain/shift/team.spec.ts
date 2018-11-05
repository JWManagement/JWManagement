import { expect } from 'chai'
import * as moment from 'date-fns'
import { Team, TeamStatus, TeamSize, size } from './team';
import { DomainError } from '../errors';

function buildTeam (s: number[] = [1, 2], timeframe = { isExpired: () => false }) {
  const now = new Date()
  return new Team('superteam', [], size.apply(null, s), timeframe)
}

describe('a shift', function () {
  it('expires if the cutoff time is reached', function () {
    expect(false).to.eq(true)
  })
})

describe('a team', function () {
  describe('accepts requests from publishers if', function () {
    it('has participant slots available', function () {
      expect(false).to.eq(true)
    })
    it('has no existing participation request from them', function () {
      expect(false).to.eq(true)
    })
    it('has a BAILED participation request from them', function () {
      expect(false).to.eq(true)
    })
    it('has a CANCELLED participation request from them', function () {
      expect(false).to.eq(true)
    })
    it('belongs to a not EXPIRED shift', function () {
      expect(false).to.eq(true)
    })
  })
  describe('accepts requests from teamleaders', function () {
    it('has participant or team leader slots available', function () {
      expect(false).to.eq(true)
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

describe('a request', function () {
  it('can be cancelled by the publisher', function () {
    expect(false).to.eq(true)
  })
  it('can be approved by a scheduler', function () {
    expect(false).to.eq(true)
  })
  it('can be declined by a scheduler', function () {
    expect(false).to.eq(true)
  })
  it('can be bailed by the publisher', function () {
    expect(false).to.eq(true)
  })
})


