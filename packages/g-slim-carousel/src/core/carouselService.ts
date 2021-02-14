import { clamp, reverseClamp } from '../utils/clamp';
import { CarouselServiceOptions } from './types';

export class CarouselService {
  private _index = 0;
  private _length: CarouselServiceOptions['length'];
  private _shouldLoop: CarouselServiceOptions['shouldLoop'];
  private _callback: CarouselServiceOptions['callback'];

  constructor(
    { length = 0, index = 0, shouldLoop = true, callback }: CarouselServiceOptions = {
      length: 0,
      shouldLoop: true,
      callback: () => {},
    }
  ) {
    this._length = length;
    this._index = index < length - 1 ? index : length - 1;
    this._shouldLoop = shouldLoop;
    this._callback = callback;
  }
  get current(): number {
    return this._index;
  }
  set current(val: number) {
    this._index = val;
  }

  next(): void {
    this.goTo(this._index + 1);
  }

  previous(): void {
    this.goTo(this._index - 1);
  }

  goTo(newCurrent: number): void {
    if (newCurrent !== this.current) {
      if (!this._shouldLoop) {
        this._index = clamp(newCurrent, 0, this._length - 1);
      } else {
        this._index = reverseClamp(newCurrent, 0, this._length - 1);
      }
    }
    this.notify();
  }

  private notify() {
    this._callback && this._callback(this.current);
  }
}
