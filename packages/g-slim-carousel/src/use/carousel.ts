import { useEffect, useRef } from 'react';
import { CarouselServiceOptions } from '../core/types';

import { CarouselService } from '../core/carouselService';

export default function ({ length, shouldLoop = true }: CarouselServiceOptions): [CarouselService] {
  const ref = useRef(
    new CarouselService({
      length,
      shouldLoop,
    })
  );
  useEffect(() => {
    ref.current = new CarouselService({
      length,
      shouldLoop,
    });
  }, [length, shouldLoop]);

  return [ref.current];
}
