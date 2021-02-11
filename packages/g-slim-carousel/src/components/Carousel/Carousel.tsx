import React, { FC } from 'react';
import classNames from 'classnames';
import { useInterval, useRafState } from 'react-use';

import useCarousel from '../../use/carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

import { Arrow } from '../Arrow/Arrow';
import { Slide } from '../Slide/Slide';

import './Carousel.scss';

export interface CarouselProps {
  prevLabel: string;
  nextLabel: string;
  pauseLabel: string;
  resumeLabel: string;
  autoPlay?: boolean;
  interval?: number;
  shouldLoop?: boolean;
  transitionSpeed?: number;
  showArrows?: boolean;
  selectedItem?: number;
  minHeight: string;
  onChange?: (index: number) => void;
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
    pauseLabel,
    resumeLabel,
    selectedItem,
    shouldLoop,
    autoPlay,
    interval,
    transitionSpeed,
    minHeight,
    onChange,
    children,
    className,
  } = props;
  const length = children?.length;

  const [isRunning, setIsRunning] = useRafState(true);
  const [current, setCurrent] = useRafState(selectedItem);
  const [carousel] = useCarousel({ length, shouldLoop });

  const updateCurrent = (index: number): void => {
    setCurrent(index);
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

  const classes = classNames('g-slim', className);
  const styles = { minHeight };

  return (
    <div className={classes}>
      <div className='wrapper relative' style={styles} {...pauseOnHover}>
        {showArrows && (
          <button
            className='absolute z-1 g-slim__arrow g-slim__arrow--prev grid place-center'
            title={prevLabel}
            onClick={handlePrevious}
          >
            <Arrow label={prevLabel} direction={-1} />
          </button>
        )}
        <div className='g-slim__carousel overflow-hidden w-full z-0 absolute pin'>
          {children &&
            children.map((el, i) => {
              return (
                <Slide key={i} current={current} index={i} speed={transitionSpeed}>
                  {el}
                </Slide>
              );
            })}
        </div>
        {showArrows && (
          <button
            className='absolute z-1 g-slim__arrow g-slim__arrow--next grid place-center'
            title={nextLabel}
            onClick={handleNext}
          >
            <Arrow label={nextLabel} />
          </button>
        )}
      </div>
      {autoPlay && (
        <div className='grid place-center'>
          <button onClick={isRunning ? pause : resume} className='g-slim__pause'>
            {isRunning ? pauseLabel : resumeLabel}
          </button>
        </div>
      )}
    </div>
  );
};

Carousel.defaultProps = DEFAULT_OPTIONS;
