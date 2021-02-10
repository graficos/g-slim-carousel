import React, { FC } from 'react';

export interface SlideProps {
  current: number;
  speed: number;
  children?: React.ReactNode[];
}

export const Slide: FC<SlideProps> = (props) => {
  const { /* current, */ speed, children } = props;
  const slideStyle = {
    // transform: `translateX(${100 * current}%)`,
    transition: `transform ${speed}ms ease-out`,
  };
  return <div style={slideStyle}>{children}</div>;
};

Slide.defaultProps = {
  current: 0,
};
