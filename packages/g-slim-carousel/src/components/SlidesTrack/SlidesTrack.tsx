import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion, Point2D } from 'framer-motion';

import { Direction } from '../../types';

import { getSwipeDirectionHorizontal, getStiffness } from '../../core/draggingPhysics';

import './SlidesTrack.scss';

export interface SlidesTrackProps {
  current: number;
  transitionSpeed: number;
  scaleOnHover: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onUpdate: (newPage: number) => void;
  children?: React.ReactNode;
}

const variants = {
  enter: (direction: Direction) => {
    console.log('enter', direction);

    return {
      zIndex: 1,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => {
    console.log('exit', direction);
    return {
      zIndex: -1,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const SlidesTrack: FC<SlidesTrackProps> = (props) => {
  const {
    current,
    transitionSpeed,
    scaleOnHover,
    onUpdate,
    onDragStart,
    onDragEnd,
    children,
  } = props;

  const transitionConfiguration = {
    x: {
      type: 'spring',
      stiffness: getStiffness(transitionSpeed),
      damping: 25,
      duration: transitionSpeed / 1000,
    },
    opacity: { duration: 0.2 },
  };

  const [direction, setDirection] = useState<Direction>(1);

  const handleDrag = (index, velocity: Point2D) => {
    const swipeDirection = getSwipeDirectionHorizontal(velocity);
    const newPage = index * swipeDirection + 1;
    setDirection(swipeDirection);
    onUpdate && onUpdate(newPage);
  };

  const classes = classNames('g-slim__slide absolute pin w-full grid place-center');

  return (
    <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
      {children &&
        React.Children.map(children, (el, index) => {
          return (
            current === index && (
              <motion.div
                key={index}
                layout
                className={classes}
                whileHover={{ scale: scaleOnHover }}
                custom={direction}
                variants={variants}
                transition={transitionConfiguration}
                initial='enter'
                animate='center'
                exit='exit' // https://www.framer.com/api/motion/animate-presence/#animating-custom-components
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragStart={onDragStart}
                onDragEnd={(e, { velocity }) => {
                  handleDrag(index, velocity);
                  onDragEnd && onDragEnd();
                }}
              >
                <div draggable='false' className='slide__item-wrapper'>
                  {el}
                </div>
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
