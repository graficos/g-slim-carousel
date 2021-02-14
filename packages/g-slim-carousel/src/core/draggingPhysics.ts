import { AxisBox2D, Point2D } from 'framer-motion';

import { Direction } from '../types';
import { clamp } from '../utils/clamp';
import { isMinusZero } from '../utils/isMinusZero';

/**
 * A value between 100 and 300 with linear progression
 * @param x reference Value
 * @see https://www.wolframalpha.com/input/?i=plot+%282+x%29%2F5+%2B+60+between+100+and+300
 */
export const getStiffness = (x: number): number => {
  return clamp((2 * x) / 5 + 60, 100, 300);
};

const getZerosDirection = (value: 0 | -0): Direction => {
  if (isMinusZero(value)) return -1;
  if (value === 0) return 1;
  return 1;
};

/**
 * Decides if it goes to the next one or the previous one,
 * given the velocity sign, we return the opposite direction
 * @param {Point2D} velocity
 * @param {AxisBox2D} axis 'x' or 'y'
 */
export const getSwipeDirection = (velocity: Point2D, axis: keyof AxisBox2D): Direction => {
  const value = velocity[axis];

  // Javascript, amerite!? ;P
  if (value === 0 || value === -0) {
    return getZerosDirection(value);
  }

  const swipeDirection = Math.sign(value);

  console.log({ swipeDirection });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return swipeDirection;
};

export const getSwipeDirectionHorizontal = (vel: Point2D): Direction => getSwipeDirection(vel, 'x');
