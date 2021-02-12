import React, { FC } from 'react';
import classNames from 'classnames';
import { useInterval, useRafState } from 'react-use';
import { AnimatePresence } from 'framer-motion';

import useCarousel from '../../use/carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

import { Slide } from '../Slide/Slide';
import { ArrowButtons } from '../ArrowButtons/ArrowButtons';

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
  scaleOnHover?: number;
  CustomButtonComponent?: JSX.Element;
  onChange?: (index: number) => void;
  children?: React.ReactNode[];
  className?: string;
}

export type Direction = 1 | -1;

/**
 * G Slimg Carousel
 * @see https://www.w3.org/WAI/tutorials/carousels/
 */
export const Carousel: FC<CarouselProps> = (props) => {
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
    scaleOnHover,
    minHeight,
    CustomButtonComponent,
    onChange,
    children,
    className,
  } = props;
  const length = children?.length;

  const [isRunning, setIsRunning] = useRafState(true);
  const [current, setCurrent] = useRafState<number>(selectedItem);
  const [carousel] = useCarousel({ length, shouldLoop });

  const updateCurrent = (index: number): void => {
    setCurrent(index);
    onChange && onChange(current);
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
  const handleNext = () => {
    carousel.next();
    updateCurrent(carousel.current);
  };
  const handlePrevious = () => {
    carousel.previous();
    updateCurrent(carousel.current);
  };
  const handleChildrenUpdate = (targetIndex) => {
    carousel.goTo(targetIndex);
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
        {/* <h1 className='primary--text'>{current}</h1> */}
        <div className='g-slim__carousel overflow-hidden w-full absolute pin grid place-center'>
          <AnimatePresence>
            {children &&
              children.map((el, i) => {
                return (
                  <Slide
                    key={i}
                    current={current}
                    index={i}
                    transitionSpeed={transitionSpeed}
                    scaleOnHover={scaleOnHover}
                    onUpdate={handleChildrenUpdate}
                    onDragStart={() => pause()}
                    onDragEnd={() => resume()}
                  >
                    {el}
                  </Slide>
                );
              })}
          </AnimatePresence>
        </div>
        {showArrows && (
          <ArrowButtons
            CustomButtonComponent={CustomButtonComponent}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        )}
      </div>
      {autoPlay && (
        <div className='grid place-center g-slim__pause'>
          <button
            type='button'
            onClick={isRunning ? pause : resume}
            className='g-slim__pause__button'
          >
            {isRunning ? pauseLabel : resumeLabel}
          </button>
        </div>
      )}
    </div>
  );
};

Carousel.defaultProps = DEFAULT_OPTIONS;
