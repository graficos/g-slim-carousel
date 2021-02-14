import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { motion } from 'framer-motion';

import './DotIndicators.scss';

export interface DotIndicatorsProps {
  current: number;
  onDotClicked: (index: number) => void;
  numberOfDots: number;
  dotSize: number;
  transitionSpeed: number;
  disabled?: boolean;
}

export const DotIndicators: FC<DotIndicatorsProps> = (props) => {
  const { current, onDotClicked, numberOfDots, disabled, dotSize, transitionSpeed } = props;
  const [innerDotPosition, setInnerDotPosition] = useState(0);
  const [ref, { width }] = useMeasure<HTMLElement & SVGSVGElement>();

  useEffect(() => {
    setInnerDotPosition(width * current);
  }, [current, width]);

  const dotsClasses = classNames({
    'primary--stroke': !disabled,
    'primary-disabled--stroke': disabled,
  });

  return (
    <div className='g-slim__dot-indicators relative'>
      {Array(numberOfDots)
        .fill('')
        .map((_, index) => (
          <button
            key={index}
            type='button'
            aria-label={`Go to ${index}`}
            className='dot-indicators__button reset-button'
            onClick={() => onDotClicked(index)}
          >
            {index === 0 && <div ref={ref}>{/* Width reference for buttons */}</div>}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox={`0 0 ${dotSize} ${dotSize}`}
              width={dotSize}
            >
              <title>
                {index + 1} / {numberOfDots}
              </title>
              <circle
                fill='none'
                strokeWidth='2'
                strokeMiterlimit='10'
                className={dotsClasses}
                cx={dotSize / 2}
                cy={dotSize / 2}
                r={dotSize / 2 - dotSize * 0.2}
                style={{ transition: 'stroke ' + transitionSpeed + 'ms' }}
              />
            </svg>
          </button>
        ))}
      <motion.svg
        layout
        aria-hidden
        className='absolute z-0'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${dotSize} ${dotSize}`}
        style={{
          pointerEvents: 'none',
          left: 0,
        }}
        animate={{ x: innerDotPosition }}
        transition={{ duration: transitionSpeed / 3000 }}
        width={dotSize}
      >
        <circle
          cx={dotSize / 2}
          cy={dotSize / 2}
          strokeWidth={0}
          className='primary--fill'
          r={dotSize * 0.2}
          style={{ transition: 'fill ' + transitionSpeed + 'ms' }}
        />
      </motion.svg>
    </div>
  );
};

DotIndicators.defaultProps = {
  dotSize: 28,
};
