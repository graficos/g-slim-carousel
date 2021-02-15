/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const flipValue = (x: number | boolean | undefined): number => ~x;
export const flipTwice = (x: number | boolean | undefined): number => flipValue(flipValue(x));

export const negateValue = (x: number | boolean | undefined): number => flipValue(x) + 1;
