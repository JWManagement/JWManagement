export class Request {
  requestId: string
  publisherId: string
  status: RequestStatus

  constructor (requestId, publisherId, status = RequestStatus.OPEN) {
    this.requestId = requestId
    this.status = status
    this.publisherId = publisherId
  }

  isAvailable () {
    return this.status === RequestStatus.OPEN || this.status === RequestStatus.APPROVED
  }
}

export enum RequestStatus {
  OPEN,
  APPROVED,
  REJECTED,
  BAILED,
  RETRACTED
}
