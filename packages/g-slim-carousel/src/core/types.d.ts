export interface CarouselServiceOptions {
  length: number;
  index?: number;
  shouldLoop?: boolean;
  callback?: (currentIndex: number) => unknown;
}
