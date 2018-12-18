import * as moment from 'moment';
import { TimeFrame } from './timeFrame';
import { Clock } from './clock';
import { Hours } from './hours';
import { expect } from 'chai';

describe('a timeframe', function () {
  it('correctly calculates isExpired', function () {
    const start = moment('2018-11-02 10:00').toDate()
    const end = moment('2018-11-02 12:00').toDate()
    const deadline = new Hours(2)
    const now = moment('2018-11-02 07:59')

    const clock: Clock = {
      now: () => now.toDate()
    }

    const timeframe = new TimeFrame(start, end, deadline, clock)

    expect(timeframe.isExpired()).to.eq(false)

    now.add(2, 'minutes')

    expect(timeframe.isExpired()).to.eq(true)
  })
})
