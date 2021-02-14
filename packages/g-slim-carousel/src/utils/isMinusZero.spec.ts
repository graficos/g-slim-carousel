import { isMinusZero } from './isMinusZero';

describe('isMinusZero', () => {
  it('handles values correctly', () => {
    expect(isMinusZero(-0)).toBe(true);
    // anything else is false
    expect(isMinusZero(0)).toBe(false);
    expect(isMinusZero(-0.000001)).toBe(false);
    expect(isMinusZero(0.1)).toBe(false);
    expect(isMinusZero(-0 + 1e-17)).toBe(false);
    expect(isMinusZero(-1)).toBe(false);
    expect(isMinusZero(-100)).toBe(false);
  });
});
