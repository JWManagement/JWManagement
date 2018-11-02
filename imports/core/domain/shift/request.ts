
export class Request {
  requestId: string
  status: RequestStatus

  constructor (requestId, status = RequestStatus.OPEN) {
    this.requestId = requestId
    this.status = status
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
