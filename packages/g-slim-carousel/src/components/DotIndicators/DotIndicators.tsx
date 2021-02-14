import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { motion } from 'framer-motion';

export interface DotIndicatorsProps {
  current: number;
  onDotClicked: (index: number) => void;
  numberOfDots: number;
  dotSize: number;
  transitionSpeed: number;
  goToLabel: string;
  disabled?: boolean;
}

export const DotIndicators: FC<DotIndicatorsProps> = (props) => {
  const {
    current,
    onDotClicked,
    numberOfDots,
    disabled,
    dotSize,
    goToLabel,
    transitionSpeed,
  } = props;
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
            className='dot-indicators__button button inline-block '
            onClick={() => onDotClicked(index)}
          >
            {index === 0 && <div ref={ref}>{/* Width reference for buttons */}</div>}
            <span className='visually-hidden'>
              {goToLabel} {index}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox={`0 0 ${dotSize} ${dotSize}`}
              width={dotSize}
              className='block'
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
      <div aria-live='polite' aria-atomic='true' className='liveregion visually-hidden'>
        Item {current} of {length}
      </div>
    </div>
  );
};

DotIndicators.defaultProps = {
  dotSize: 28,
};
