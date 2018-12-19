
import * as moment from 'moment'
import { expect } from 'chai'

import { Shift } from './shift'
import { TimeFrame } from '../../timeFrame';

describe('a shift', function () {
  it('expires if the cutoff time is reached', function () {
    const timeframe = {
      isExpired: () => false
    }

    const shift = new Shift(timeframe)

    expect(shift.isExpired()).to.be.false

    timeframe.isExpired = () => true

    expect(shift.isExpired()).to.be.true
  })
})
