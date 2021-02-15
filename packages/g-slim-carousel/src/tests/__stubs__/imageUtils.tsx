import React, { ReactNode } from 'react';
import { DEFAULT_OPTIONS } from '../../components/Carousel/Carousel.config';

export const getRandomInNumericRange = (max: number, min = 0): number => {
  return Math.floor((max - min) * Math.random()) + min;
};

export const getImageSource = ({
  width,
  height,
  index = 0,
}: {
  width: number;
  heigth: number;
  index?: number;
}): string => `https://picsum.photos/id/${1001 + index}/${width}/${height}.webp`;

export const getRandomListOfImages = ({
  numberOfImages = 1,
  width = 1300,
  height = parseInt(DEFAULT_OPTIONS.minHeight),
}: {
  numberOfImages?: number;
  width?: number;
  height?: number;
}): ReactNode => {
  return Array(numberOfImages)
    .fill()
    .map((_, index) => (
      <img
        key={index}
        src={getImageSource({ width, height, index })}
        style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
      />
    ));
};
