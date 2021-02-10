import { CarouselServiceOptions } from './types';

export class CarouselService {
  private index = 0;

  constructor(
    { length = 0, index = 0, shouldLoop = true, callback }: CarouselServiceOptions = {
      length: 0,
      shouldLoop: true,
      callback: () => {},
    }
  ) {
    this.length = length;
    this.index = index < length - 1 ? index : length - 1;
    this.shouldLoop = shouldLoop;
    this.callback = callback;
    console.log('instantiated', this.index);
  }
  get current(): number {
    return this.index;
  }
  set current(val: number) {
    this.index = val;
  }

  private get isNextPossible() {
    return this.index < this.length - 1;
  }

  private get isPreviousPossible() {
    return this.index > 0;
  }

  next(): void {
    if (this.isNextPossible) {
      this.current = this.index + 1;
    } else if (this.shouldLoop) {
      this.current = 0;
    }
    this.notify();
  }

  previous(): void {
    if (this.isPreviousPossible) {
      this.index -= 1;
    } else if (this.shouldLoop) {
      this.index = this.length - 1;
    }
    this.notify();
  }

  goTo(index: number): void {
    if (index !== this.current) {
      this.current = index;
    }
    this.notify();
  }

  private notify() {
    this.callback && this.callback(this.current);
  }
}
