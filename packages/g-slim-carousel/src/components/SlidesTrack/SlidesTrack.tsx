import React, { FC, useState } from 'react';
import { AnimatePresence, AnimationProps, motion, Point2D } from 'framer-motion';

import { Direction } from '../../types';

import { getAppearDirectionX, getStiffness, getNewPage } from '../../core/draggingPhysics';
import { negateValue } from '../../core/arythmetics';

import './SlidesTrack.scss';
import { APPEARS_FROM_THE_RIGHT } from '../../core/constants';

export interface SlidesTrackProps {
  current: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onUpdate: (newPage: number) => void;
  transitionSpeed?: number;
  scaleOnHover?: number;
  children?: React.ReactNode;
}

export const SlidesTrack: FC<SlidesTrackProps> = (props) => {
  const {
    current,
    transitionSpeed,
    scaleOnHover,
    onUpdate,
    onDragEnd,
    onDragStart,
    children,
  } = props;

  const transitionConfiguration: AnimationProps['transition'] = {
    x: {
      type: 'spring',
      stiffness: getStiffness(transitionSpeed),
      damping: 25,
    },
    opacity: { duration: 0.2 },
  };

  const [appearDirection, setAppearDirection] = useState<Direction>(APPEARS_FROM_THE_RIGHT);

  const handleDrag = (index, velocity: Point2D) => {
    const appearDirection = getAppearDirectionX(velocity);
    const newPage = getNewPage(index, appearDirection);
    setAppearDirection(appearDirection as Direction);
    onUpdate && onUpdate(newPage);
  };

  const variants = {
    enter: () => {
      console.log({ current, appearDirection });
      return {
        zIndex: 1,
        x: appearDirection * 600, // 600 is the distance in pixels on enter
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: () => {
      return {
        zIndex: -1,
        x: negateValue(appearDirection) * 1000, // 1000 is the distance in pixels on exit
        opacity: 0,
      };
    },
  };

  return (
    <AnimatePresence initial={false}>
      {children &&
        React.Children.map(children, (el, index) => {
          return (
            current === index && (
              <motion.div
                key={index}
                layout
                className='g-slim__slide absolute pin w-full grid place-center'
                whileHover={{ scale: scaleOnHover }}
                variants={variants}
                transition={transitionConfiguration}
                initial='enter'
                animate='center'
                exit='exit' // only available with AnimatePresence
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={onDragStart}
                onDragEnd={(e, { velocity }) => {
                  handleDrag(index, velocity);
                  onDragEnd && onDragEnd();
                }}
              >
                <motion.div layout className='slide__item-wrapper'>
                  {el}
                </motion.div>
              </motion.div>
            )
          );
        })}
    </AnimatePresence>
  );
};

SlidesTrack.defaultProps = {
  current: 0,
};
