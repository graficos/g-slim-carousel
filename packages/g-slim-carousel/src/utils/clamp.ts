/**
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
