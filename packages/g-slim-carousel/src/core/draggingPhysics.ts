import { AxisBox2D, Point2D, Spring } from 'framer-motion';

import { Direction } from '../types';
import { clamp } from '../utils/clamp';
import { isMinusZero } from '../utils/isMinusZero';
import { negateValue } from './arythmetics';
import { LEFT, RIGHT } from './constants';

/**
 * An inverse linear progression
 * @param x reference Value
 * @see https://www.wolframalpha.com/input/?i=Abs%28%285+x%29%2F2+-+150%29+between+100+and+300
 */
export const getStiffness = (x: Spring['stiffness']): number => {
  return clamp(negateValue(x) + 700, 100, 600);
};

const getZerosDirection = (value: 0 | -0): Direction => {
  if (isMinusZero(value)) return LEFT;
  if (value === 0) return RIGHT;
  return 1;
};

/**
 * Decides if it goes to the next one or the previous one,
 * given the velocity sign, we return the opposite direction
 * @param {Point2D} velocity
 * @param {AxisBox2D} axis 'x' or 'y'
 */
export const getAppearDirection = (velocity: Point2D, axis: keyof AxisBox2D): Direction => {
  const value = velocity[axis];

  // Javascript, amerite!? ;P
  if (value === 0 || value === -0) {
    return getZerosDirection(value);
  }

  const appearDirection = Math.sign(value);

  return appearDirection as Direction;
};

export const getAppearDirectionX = (vel: Point2D): Direction => getAppearDirection(vel, 'x');
