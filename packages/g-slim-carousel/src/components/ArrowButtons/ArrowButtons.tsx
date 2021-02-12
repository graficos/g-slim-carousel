import React, { ElementType, FC } from 'react';

import { Arrow } from '../Arrow/Arrow';
import './ArrowButtons.scss';

export interface ArrowButtonsProps {
  prevLabel: string;
  handlePrevious: () => void;
  nextLabel: string;
  handleNext: () => void;
  CustomButtonComponent?: ElementType;
}

export const ArrowButtons: FC<ArrowButtonsProps> = (props) => {
  const { CustomButtonComponent, prevLabel, handlePrevious, nextLabel, handleNext } = props;
  return (
    <>
      <div className='absolute z-1 g-slim__arrow g-slim__arrow--prev'>
        {CustomButtonComponent ? (
          <CustomButtonComponent label={prevLabel} onClick={handlePrevious} direction={-1} />
        ) : (
          <button
            type='button'
            className='grid place-center'
            title={prevLabel}
            onClick={handlePrevious}
          >
            <Arrow label={prevLabel} direction={-1} />
          </button>
        )}
      </div>
      <div className='absolute z-1 g-slim__arrow g-slim__arrow--next'>
        {CustomButtonComponent ? (
          <CustomButtonComponent label={nextLabel} onClick={handleNext} direction={1} />
        ) : (
          <button
            type='button'
            className='grid place-center'
            title={nextLabel}
            onClick={handleNext}
          >
            <Arrow label={nextLabel} />
          </button>
        )}
      </div>
    </>
  );
};
