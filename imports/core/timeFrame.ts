import * as moment from 'moment'

import { Hours } from './hours'
import { Clock } from './clock'

export interface ITimeFrame {
  isExpired (): boolean
}

export class TimeFrame implements ITimeFrame {
  clock: Clock;
  deadline: Hours;
  end: Date;
  start: Date;
  
  constructor (start: Date, end: Date, deadline: Hours, clock: Clock) {
    this.start = start
    this.end = end
    this.deadline = deadline
    this.clock = clock
  }

  isExpired () {
    const now = this.clock.now()
    const expiresAt = moment(this.start).add(-this.deadline.hours, 'hours');
    return moment(now).isAfter(expiresAt)
  }

}