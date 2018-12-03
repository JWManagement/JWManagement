
import { Request } from './request'
import { notNull } from '../../preconditions';
import { DomainError } from '../errors';

export class Team {
  teamId: string
  teamSize: TeamSize
  requests: Request[]

  constructor (teamId: string, requests: Request[], teamSize: TeamSize) {
    this.teamId = teamId
    this.teamSize = teamSize
    this.requests = requests
  }

  get status () {
    return this.teamSize.fits(this.requests.filter(request => request.isAvailable()).length)
  }

  isFull (status: TeamStatus | null) {
    return (status || this.status) === TeamStatus.FULL
  }

  request (publisherId: string): Request {
    const currentStatus = this.status

    if (this.isFull(currentStatus)) {
      throw new Error(DomainError.TEAM_ALREADY_FULL)
    }

    const request = new Request(publisherId)
    this.requests.push(request)

    // if status is now ok or full, raise event that this team is ready to go
    // also, teamleader

    return request
  }
}

export enum TeamStatus {
  OK = 'OK',
  PENDING = 'PENDING',
  FULL = 'FULL'
}

export class TeamSize {
  min: number
  max: number
  constructor (min, max) {
    this.min = notNull(min)
    this.max = notNull(max)
  }

  fits (size) {
    if (size < this.min) {
      return TeamStatus.PENDING
    } else if (size < this.max) {
      return TeamStatus.OK
    }
    return TeamStatus.FULL
  }
}

export function size(min: number, max: number) {
  return new TeamSize(min, max)
}
