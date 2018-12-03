
import { Request, RequestStatus } from './request'
import { notNull, ensure } from '../../preconditions';
import { DomainError, die } from '../errors';

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

  private isFull (status?: TeamStatus) {
    return (status || this.status) === TeamStatus.FULL
  }

  private hasAvailableRequestFor(publisherId: string): boolean {
    return this.requests.findIndex(x => x.publisherId === publisherId && x.isAvailable()) >= 0
  }

  request (publisherId: string): Request {
    if (this.hasAvailableRequestFor(publisherId)) {
      die(DomainError.PUBLISHER_ALREADY_REQUESTED)
    }

    if (this.isFull()) {
      die(DomainError.TEAM_ALREADY_FULL)
    }

    const request = new Request('request id has to be generated', publisherId)
    this.requests.push(request)

    // if status is now ok or full, raise event that this team is ready to go
    // also, teamleader

    return request
  }

  approve(requestId: string): any {
    const request = ensure<Request>(() => this.requests.find(x => x.requestId === requestId), DomainError.REQUEST_NOT_FOUND)
    if ([RequestStatus.OPEN, RequestStatus.REJECTED].indexOf(request.status) >= 0) {
      request.status = RequestStatus.APPROVED
    } else {
      die(DomainError.REQUEST_NOT_APPROVABLE, {
        status: request.status
      })
    }
  }

  bail(requestId: string) {
    const request = ensure<Request>(() => this.requests.find(x => x.requestId === requestId), DomainError.REQUEST_NOT_FOUND)
    if (request.status === RequestStatus.APPROVED) {
      request.status = RequestStatus.BAILED
    } else {
      die(DomainError.REQUEST_NOT_APPROVED)
    }
  }

  retract(requestId: string): any {
    const request = ensure<Request>(() => this.requests.find(x => x.requestId === requestId), DomainError.REQUEST_NOT_FOUND)
    if (request.status === RequestStatus.OPEN) {
      request.status = RequestStatus.BAILED
    } else {
      die(DomainError.REQUEST_NOT_OPEN)
    }
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
