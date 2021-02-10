import { CarouselService } from './carouselService';

describe('CarouselService', () => {
  it('can be instantiated (smoke test)', () => {
    expect(() => new CarouselService()).not.toThrow();
    expect(() => new CarouselService({ length: 3, index: 0 })).not.toThrow();
    expect(() => new CarouselService({ length: 3 })).not.toThrow();
  });

  it('returns correct current item if initial is 0', () => {
    // arrange
    const carousel = new CarouselService({ length: 3 });
    // act
    // assert
    expect(carousel.current).toBe(0);
  });
  it('returns correct current item if initial is other than 0', () => {
    // arrange
    const index = 2;
    const carousel = new CarouselService({ length: 3, index });
    // act
    // assert
    expect(carousel.current).toBe(index);
  });
  it('returns at most last index if it recieves a value higher than expected', () => {
    // arrange
    const length = 5;
    const index = length + 100;
    const carousel = new CarouselService({ length, index });
    // act
    // assert
    const expected = length - 1;
    expect(carousel.current).toBe(expected);
  });
  it('can advance if there is a next one', () => {
    const carousel = new CarouselService({ length: 3 });
    // act
    carousel.next();
    // assert
    expect(carousel.current).toBe(1);
  });
  it('goes back to zero if advances passed the last one', () => {
    // arrange
    const carousel = new CarouselService({ length: 3 });
    carousel.current = 2;
    // act
    carousel.next();
    // assert
    expect(carousel.current).toBe(0);
  });
  it('can go back if there is a previous one', () => {
    // arrange
    const carousel = new CarouselService({ length: 3 });
    carousel.current = 2;
    // act
    carousel.previous();
    // assert
    expect(carousel.current).toBe(1);
  });
  it('goes to the last one on previous if the current is the first one', () => {
    // arrange
    const length = 3;
    const carousel = new CarouselService({ length });
    // act
    carousel.previous();
    // assert
    const last = length - 1;
    expect(carousel.current).toBe(last);
  });
  it('sets an arbitrary value', () => {
    // arrange
    const carousel = new CarouselService({ length: 5 });
    // act
    carousel.goTo(2);
    carousel.goTo(2); // idempotent operation
    // assert
    expect(carousel.current).toBe(2);
  });
  it('broadcasts the changes', () => {
    // arrange
    const mockFn = jest.fn();
    const carousel = new CarouselService({ length: 5, callback: mockFn });
    // act
    carousel.next();
    carousel.previous();
    carousel.goTo(3);
    // assert
    expect(mockFn).toHaveBeenNthCalledWith(1, 1);
    expect(mockFn).toHaveBeenNthCalledWith(2, 0);
    expect(mockFn).toHaveBeenNthCalledWith(3, 3);
  });
});
