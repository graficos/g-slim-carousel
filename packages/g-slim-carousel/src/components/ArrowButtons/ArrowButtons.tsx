import React, { ElementType, FC } from 'react';
import { RIGHT, LEFT } from '../../core/constants';

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
          <CustomButtonComponent label={prevLabel} onClick={handlePrevious} direction={LEFT} />
        ) : (
          <button
            type='button'
            className='g-slim__arrow__button grid place-center button'
            title={prevLabel}
            onClick={handlePrevious}
          >
            <Arrow label={prevLabel} direction={LEFT} />
          </button>
        )}
      </div>
      <div className='absolute z-1 g-slim__arrow g-slim__arrow--next'>
        {CustomButtonComponent ? (
          <CustomButtonComponent label={nextLabel} onClick={handleNext} direction={RIGHT} />
        ) : (
          <button
            type='button'
            className='g-slim__arrow__button grid place-center button'
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
