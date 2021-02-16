import { getAppearDirectionX, getStiffness } from './draggingPhysics';

describe('getStiffness', () => {
  const MIN = 100;
  const MAX = 600;
  it(`returns ${MAX} for values lower than 100`, () => {
    expect(getStiffness(1)).toBe(MAX);
    expect(getStiffness(10)).toBe(MAX);
    expect(getStiffness(99)).toBe(MAX);
  });
  it(`returns ${MIN} for values higher than 600`, () => {
    expect(getStiffness(605)).toBe(MIN);
    expect(getStiffness(810)).toBe(MIN);
    expect(getStiffness(1999)).toBe(MIN);
  });
  it(`returns between ${MIN} and ${MAX} for values between 100 and 600`, () => {
    expect(getStiffness(120)).toBeLessThan(MAX);
    expect(getStiffness(120)).toBeGreaterThan(MIN);
    expect(getStiffness(200)).toBeLessThan(MAX);
    expect(getStiffness(200)).toBeGreaterThan(MIN);
  });
});

describe('getAppearDirection', () => {
  it('returns the inverse of the sign of the velocity', () => {
    expect(getAppearDirectionX({ y: 0, x: -1 })).toBe(-1);
  });
  it('handles edge cases of zeros', () => {
    expect(getAppearDirectionX({ y: 0, x: -0 })).toBe(-1);
    expect(getAppearDirectionX({ y: 0, x: 0 })).toBe(1);
  });
});
