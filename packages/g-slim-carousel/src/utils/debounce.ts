/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param func callback
 * @param wait delay in milliseconds
 * @param immediate whether to wait one cycle or not
 * @see https://davidwalsh.name/javascript-debounce-function
 */
export const debounce = (func: () => unknown, wait: number, immediate = false): (() => void) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};
