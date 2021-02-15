import { Point2D } from 'framer-motion';
import { getNewPage, getStiffness, getSwipeDirection } from './draggingPhysics';

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

describe('getSwipeDirection', () => {
  const getSwipeDirectionOnX = (velocity: Point2D) => getSwipeDirection(velocity, 'x');

  it('returns positive 1 on positive numbers', () => {
    expect(getSwipeDirectionOnX({ y: 0, x: 40 })).toBe(1);
    expect(getSwipeDirectionOnX({ y: 0, x: 0 })).toBe(1);
  });
  it('returns negative 1 on negative numbers', () => {
    expect(getSwipeDirectionOnX({ y: 0, x: -40 })).toBe(-1);
    expect(getSwipeDirectionOnX({ y: 0, x: -0 })).toBe(-1);
  });
});

describe('getNewPage', () => {
  it('handles reversing the swipe direction correctly', () => {
    expect(getNewPage(0, -1)).toBe(1);
    expect(getNewPage(1, -1)).toBe(2);
    expect(getNewPage(5, 1)).toBe(4);
  });
});
