import { ITimeFrame } from '../../timeFrame';

export class Shift {
  timeFrame: ITimeFrame

  constructor (timeFrame: ITimeFrame) {
    this.timeFrame = timeFrame
  }

  get status() : ShiftStatus {
    return this.isExpired() ? ShiftStatus.CLOSED : ShiftStatus.OPEN
  }

  isExpired () {
    return this.timeFrame.isExpired()
  }
}

export enum ShiftStatus {
  OPEN, CLOSED
}
