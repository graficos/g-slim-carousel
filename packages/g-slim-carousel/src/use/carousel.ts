import { useMemo } from 'react';
import { CarouselServiceOptions } from '../core/types';

import { CarouselService } from '../core/carouselService';

export default function ({ length, shouldLoop = true }: CarouselServiceOptions): CarouselService {
  const service = useMemo(() => new CarouselService({ length, shouldLoop }), [length, shouldLoop]);

  return service;
}
