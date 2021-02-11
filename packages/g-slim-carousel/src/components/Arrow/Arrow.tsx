import React, { FC } from 'react';
import classNames from 'classnames';

export interface ArrowProps {
  label: string;
  direction: number | 'top' | 'bottom';
  disabled: boolean;
}

export const Arrow: FC<ArrowProps> = (props: ArrowProps) => {
  const { label, direction, disabled } = props;
  const getTransform = (direction) =>
    direction === 1
      ? 'rotate(.5turn)'
      : direction === 'top'
      ? 'rotate(.25turn)'
      : direction === 'bottom'
      ? 'rotate(.75turn)'
      : 'none';

  const svgStyles = {
    transform: getTransform(direction),
    transformOrigin: 'center',
  };

  const arrowClasses = classNames({
    'primary--stroke': !disabled,
    'primary-disabled--stroke': disabled,
  });

  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 17.4 31.7'
      enableBackground='new 0 0 17.4 31.7'
      width='12'
      style={svgStyles}
    >
      <title>{label}</title>
      <polyline
        fill='none'
        strokeWidth='2'
        className={arrowClasses}
        strokeMiterlimit='10'
        points='15.9,29.5 2.2,15.8 15.9,2.2 '
        transform='translate(-2)'
      />
    </svg>
  );
};

Arrow.defaultProps = {
  direction: 1,
  disabled: false,
};
