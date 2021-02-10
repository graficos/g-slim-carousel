import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useInterval /* useSize  */ } from 'react-use';

import useCarousel from '../../use/carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

import { Arrow } from '../Arrow/Arrow';
import { Slide } from '../Slide/Slide';

import './Carousel.scss';

export interface CarouselProps {
  prevLabel: string;
  nextLabel: string;
  onChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  shouldLoop?: boolean;
  transitionSpeed?: number;
  showArrows?: boolean;
  selectedItem?: number;
  children?: React.ReactNode[];
  className?: string;
}

/**
 * G Slimg Carousel
 * @see https://www.w3.org/WAI/tutorials/carousels/
 */
export const Carousel: FC<CarouselProps> = (props: CarouselProps) => {
  const {
    showArrows,
    prevLabel,
    nextLabel,
    selectedItem,
    shouldLoop,
    autoPlay,
    interval,
    transitionSpeed,
    onChange,
    children,
    className,
  } = props;
  const length = children?.length;

  // State
  const [isRunning, setIsRunning] = useState(true);
  const [current, setCurrent] = useState(selectedItem);
  const [carousel] = useCarousel({ length, shouldLoop });

  // logic
  const updateCurrent = (i: number): void => {
    setCurrent(i);
    onChange && onChange(current);
    console.log('changed', current);
  };

  // Autoplay
  useInterval(
    () => {
      carousel.next();
      updateCurrent(carousel.current);
    },
    autoPlay && isRunning ? interval : null
  );

  // Controls
  const handleNext = (): void => {
    carousel.next();
    updateCurrent(carousel.current);
  };
  const handlePrevious = (): void => {
    carousel.previous();
    updateCurrent(carousel.current);
  };
  const pause = () => {
    setIsRunning(false);
  };
  const resume = () => {
    setIsRunning(true);
  };

  const pauseOnHover = {
    onMouseOver: pause,
    onMouseLeave: resume,
  };

  const classes = classNames('g-slim relative', className);

  return (
    <div className={classes}>
      {showArrows && (
        <button
          className='absolute z-1 g-slim__arrow g-slim__arrow--prev'
          title={prevLabel}
          onClick={handlePrevious}
          {...pauseOnHover}
        >
          <Arrow label={prevLabel} direction={-1} />
        </button>
      )}
      <div className='g-slim__carousel relative z-0'>
        <h1 className='primary--text'>{current}</h1>
        {children &&
          children.map((el, i) => {
            return (
              <Slide key={i} current={current} speed={transitionSpeed} {...pauseOnHover}>
                {el}
              </Slide>
            );
          })}
        <button onClick={isRunning ? pause : resume} className='g-slim__pause'>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      </div>
      {showArrows && (
        <button
          className='absolute z-1 g-slim__arrow g-slim__arrow--next'
          title={nextLabel}
          onClick={handleNext}
          {...pauseOnHover}
        >
          <Arrow label={nextLabel} />
        </button>
      )}
    </div>
  );
};

Carousel.defaultProps = DEFAULT_OPTIONS;
