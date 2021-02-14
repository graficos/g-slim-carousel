import React, { FC } from 'react';

import './PauseButton.scss';

export interface PauseButtonProps {
  isRunning: boolean;
  pauseLabel: string;
  resumeLabel: string;
  onButtonClick: () => void;
}

/**
 * PauseButton
 */
export const PauseButton: FC<PauseButtonProps> = (props) => {
  const { pauseLabel, resumeLabel, isRunning, onButtonClick } = props;

  const label = isRunning ? pauseLabel : resumeLabel;
  const emoji = isRunning ? '⏸' : '▶';

  return (
    <button
      type='button'
      onClick={onButtonClick}
      className='g-slim__pause__button button'
      title={label}
    >
      <span className='visually-hidden'>{label}</span>
      <span aria-hidden>{emoji}</span>
    </button>
  );
};

PauseButton.defaultProps = {};
