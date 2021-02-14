/**
 * Restricts `x` in a `min`-`max` "area".
 * @param x given value
 * @param min lower value possible
 * @param max minimum value possible
 * @see https://en.wikipedia.org/wiki/Clamping_(graphics)
 */
export function clamp(x: number, min: number, max: number): number {
  if (x < min) {
    x = min;
  } else if (x > max) {
    x = max;
  }
  return x;
}
/**
 * Flips `x` if it (on each edge) exceeds `min` or `max`, returning `max` or `min` respectively.
 * @param x given value
 * @param min lower value possible
 * @param max minimum value possible
 * @see clamp
 */
export function reverseClamp(x: number, min: number, max: number): number {
  if (x < min) {
    x = max;
  } else if (x > max) {
    x = min;
  }
  return x;
}
