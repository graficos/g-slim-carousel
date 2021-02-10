import { useEffect, useRef } from 'react';
import { CarouselServiceOptions } from '../core/types';

import { CarouselService } from '../core/carouselService';

export default function ({
  length,
  callback,
  shouldLoop = true,
  selectedItem = 0,
}: CarouselServiceOptions): [CarouselService] {
  const ref = useRef(
    new CarouselService({
      length,
      callback,
      shouldLoop,
      index: selectedItem,
    })
  );
  useEffect(() => {
    ref.current = new CarouselService({
      length,
      callback,
      shouldLoop,
      index: selectedItem,
    });
  }, [callback, length, selectedItem, shouldLoop]);

  return [ref.current];
}
