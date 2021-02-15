import { RIGHT, LEFT } from '../../core/constants';
import { getDirectionGivenOnlyePreviousAndCurrent } from './SlidesTrack';

describe('getDirectionGivenOnlyePreviousAndCurrent', () => {
  it('handles intermediate consecutive numbers correctly', () => {
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 10, previousCurrent: 0, current: 1 })
    ).toBe(RIGHT);
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 10, previousCurrent: 0, current: 1 })
    ).toBe(RIGHT);
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 10, previousCurrent: 3, current: 2 })
    ).toBe(LEFT);
  });
  it('handles intermediate non-consecutive numbers correctly', () => {
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 10, previousCurrent: 3, current: 6 })
    ).toBe(RIGHT);
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 10, previousCurrent: 6, current: 2 })
    ).toBe(LEFT);
  });
  it('handles non-consecutive numbers on the edges correctly', () => {
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 7, previousCurrent: 0, current: 6 })
    ).toBe(RIGHT);
    expect(
      getDirectionGivenOnlyePreviousAndCurrent({ length: 7, previousCurrent: 6, current: 0 })
    ).toBe(LEFT);
  });
});
