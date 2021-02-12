import React, { FC } from 'react';

import { Arrow } from '../Arrow/Arrow';
import './ArrowButtons.scss';

export interface ArrowButtonsProps {
  prevLabel: string;
  handlePrevious: () => void;
  nextLabel: string;
  handleNext: () => void;
  isPrevButtonDisabled?: boolean;
  isNextButtonDisabled?: boolean;
  CustomButtonComponent?: JSX.Element;
}

export const ArrowButtons: FC<ArrowButtonsProps> = (props) => {
  const {
    CustomButtonComponent,
    prevLabel,
    handlePrevious,
    nextLabel,
    handleNext,
    isPrevButtonDisabled,
    isNextButtonDisabled,
  } = props;
  return (
    <>
      <div className='absolute z-1 g-slim__arrow g-slim__arrow--prev'>
        {CustomButtonComponent ? (
          <CustomButtonComponent
            label={prevLabel}
            onClick={() => !isPrevButtonDisabled && handlePrevious()}
            direction={-1}
          />
        ) : (
          <button
            type='button'
            className='grid place-center'
            title={prevLabel}
            onClick={() => !isPrevButtonDisabled && handlePrevious()}
          >
            <Arrow label={prevLabel} direction={-1} disabled={isPrevButtonDisabled} />
          </button>
        )}
      </div>
      <div className='absolute z-1 g-slim__arrow g-slim__arrow--next'>
        {CustomButtonComponent ? (
          <CustomButtonComponent
            label={nextLabel}
            onClick={() => !isNextButtonDisabled && handleNext()}
            direction={1}
          />
        ) : (
          <button
            type='button'
            className='grid place-center'
            title={nextLabel}
            onClick={() => !isNextButtonDisabled && handleNext()}
          >
            <Arrow label={nextLabel} disabled={isNextButtonDisabled} />
          </button>
        )}
      </div>
    </>
  );
};
