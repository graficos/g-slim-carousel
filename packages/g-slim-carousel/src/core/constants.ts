import { Left, Right } from '../types';

// even if we implement the vertical slide, we can keep
// having the notion of left and right because it's
// conceptually left and right from a 0
export const RIGHT: Right = 1;
export const LEFT: Left = -1;

export const APPEARS_FROM_THE_RIGHT: Right = 1;
export const APPEARS_FROM_THE_LEFT: Left = -1;

export const SWIPE_DIRECTION_TO_THE_RIGHT: Right = RIGHT;
export const SWIPE_DIRECTION_TO_THE_LEFT: Left = LEFT;
