import React, { ReactNode } from 'react';
import { DEFAULT_OPTIONS } from '../components/Carousel/Carousel.config';

export const getRandomInNumericRange = (max: number, min = 0): number => {
  return Math.floor((max - min) * Math.random()) + min;
};

export const getRandomListOfImages = (
  numberOfImages = 1,
  width = 1300,
  height = parseInt(DEFAULT_OPTIONS.minHeight)
): ReactNode => {
  return Array(numberOfImages)
    .fill()
    .map((_, index) => (
      <img
        key={index}
        src={`https://picsum.photos/id/${1000 + index}/${width}/${height}.webp`}
        loading='lazy'
        alt=''
        style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
      />
    ));
};
