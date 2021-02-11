import { debounce } from './debounce';

describe('debounce', () => {
  jest.useFakeTimers();
  const timeout = 2000;

  it('behaves as expected', () => {
    // arrange
    let value = 0;
    const operation = () => {
      value += 1;
    };
    const debouncedOperation = debounce(operation, timeout);
    // act
    debouncedOperation();
    debouncedOperation();
    // assert
    jest.runOnlyPendingTimers();
    expect(value).toBe(1);
  });
});
