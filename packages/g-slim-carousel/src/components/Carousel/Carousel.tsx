import React, { ElementType, FC } from 'react';
import classNames from 'classnames';
import { useInterval, useRafState } from 'react-use';

import useCarousel from '../../use/carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

import { ArrowButtons } from '../ArrowButtons/ArrowButtons';
import { DotIndicators } from '../DotIndicators/DotIndicators';
import { SlidesTrack } from '../SlidesTrack/SlidesTrack';
import { PauseButton } from '../PauseButton/PauseButton';

import './Carousel.scss';

export interface CarouselProps {
  minHeight: string;
  prevLabel?: string;
  nextLabel?: string;
  pauseLabel?: string;
  resumeLabel?: string;
  goToLabel?: string;
  transitionSpeed?: number;
  scaleOnHover?: number;
  autoPlay?: boolean;
  interval?: number;
  shouldLoop?: boolean;
  showArrows?: boolean;
  selectedItem?: number;
  CustomButtonComponent?: ElementType;
  showIndicators?: boolean;
  dotIndicatorsSize?: number;
  onChange?: (index: number) => void;
  children?: React.ReactNode[];
  className?: string;
}
/**
 * G Slimg Carousel
 * @see https://www.w3.org/WAI/tutorials/carousels/
 */
export const Carousel: FC<CarouselProps> = (props) => {
  const {
    prevLabel,
    nextLabel,
    pauseLabel,
    resumeLabel,
    goToLabel,
    transitionSpeed,
    scaleOnHover,
    autoPlay,
    interval,
    shouldLoop,
    showArrows,
    selectedItem,
    minHeight,
    CustomButtonComponent,
    showIndicators,
    dotIndicatorsSize,
    onChange,
    children,
    className,
  } = props;
  const length = children?.length || 1;

  const carousel = useCarousel({ length, shouldLoop });

  const [isRunning, setIsRunning] = useRafState(true);
  const [current, setCurrent] = useRafState<number>(selectedItem || 0);

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
  const handlePageChange = (newPage: number) => {
    carousel.goTo(newPage);
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
          <SlidesTrack
            current={current}
            transitionSpeed={transitionSpeed}
            scaleOnHover={scaleOnHover}
            onUpdate={handlePageChange}
            onDragStart={pause}
            onDragEnd={resume}
          >
            {children}
          </SlidesTrack>
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
      <div className='flex place-center g-slim__controls'>
        {autoPlay && (
          <PauseButton
            isRunning={isRunning}
            pauseLabel={pauseLabel}
            resumeLabel={resumeLabel}
            onButtonClick={isRunning ? pause : resume}
          />
        )}
        {showIndicators && (
          <DotIndicators
            current={current}
            numberOfDots={length}
            dotSize={dotIndicatorsSize}
            goToLabel={goToLabel}
            transitionSpeed={transitionSpeed}
            onDotClicked={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

Carousel.defaultProps = DEFAULT_OPTIONS;
