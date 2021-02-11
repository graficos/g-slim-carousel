import React, { FC } from 'react';
import { useMeasure } from 'react-use';

export interface SlideProps {
  current: number;
  index: number;
  speed: number;
  children?: React.ReactNode[];
}

export const Slide: FC<SlideProps> = (props) => {
  const { current, index, speed, children } = props;
  const [ref, { width }] = useMeasure();

  const slideStyle = {
    transform: `translateX(${width * (index - current)}px)`,
    transition: `transform ${speed}ms ease-out`,
    zIndex: -index, // preventing animation visible at the beginning
  };
  return (
    <div
      ref={ref}
      className='g-slim__slide absolute w-full pin grid place-center'
      style={slideStyle}
    >
      {children}
    </div>
  );
};

Slide.defaultProps = {
  current: 0,
};
