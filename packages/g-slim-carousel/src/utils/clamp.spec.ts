import { clamp } from './clamp';

describe('clamp', () => {
  it('behaves as expected', () => {
    const min = -2;
    const max = 2;
    const clampOnRange = (value) => clamp(value, min, max);
    expect(clampOnRange(0)).toBe(0);
    expect(clampOnRange(-1)).toBe(-1);
    expect(clampOnRange(-3)).toBe(-2);
    expect(clampOnRange(1)).toBe(1);
    expect(clampOnRange(2)).toBe(2);
    expect(clampOnRange(4)).toBe(2);
  });
});
