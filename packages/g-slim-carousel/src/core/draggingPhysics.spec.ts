import { Point2D } from 'framer-motion';
import { getStiffness, getSwipeDirection } from './draggingPhysics';

describe('getStiffness', () => {
  const MIN = 100;
  const MAX = 300;
  it('returns 100 for values lower than 100', () => {
    expect(getStiffness(1)).toBe(MIN);
    expect(getStiffness(10)).toBe(MIN);
    expect(getStiffness(99)).toBe(MIN);
  });
  it('returns 300 for values higher than 600', () => {
    expect(getStiffness(605)).toBe(MAX);
    expect(getStiffness(810)).toBe(MAX);
    expect(getStiffness(1999)).toBe(MAX);
  });
  it('returns between 100 and 300 for values between 100 and 600', () => {
    expect(getStiffness(120)).toBeLessThan(MAX);
    expect(getStiffness(120)).toBeGreaterThan(MIN);
    expect(getStiffness(500)).toBeLessThan(MAX);
    expect(getStiffness(500)).toBeGreaterThan(MIN);
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
