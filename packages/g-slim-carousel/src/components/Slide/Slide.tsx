import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Direction } from '../Carousel/Carousel';

import './Slide.scss';
import { clamp } from '../../utils/clamp';

export interface SlideProps {
  current: number;
  index: number;
  length: number;
  transitionSpeed: number;
  scaleOnHover: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onUpdate: (newPage: number) => void;
  children?: React.ReactNode;
}

export const Slide: FC<SlideProps> = (props) => {
  const {
    current,
    index,
    length,
    transitionSpeed,
    scaleOnHover,
    onUpdate,
    onDragStart,
    onDragEnd,
    children,
  } = props;
  const [direction, setDirection] = useState<Direction>(1);

  const setNewDirection = (newDirection) => {
    console.log('new Direction', newDirection);
    setDirection(newDirection);
  };

  useEffect(() => {
    if (current === 0) setNewDirection(1);
    if (current === length - 1) setNewDirection(-1);
  }, [current, length]);

  const variants = {
    enter: (direction: number) => {
      console.log('enter', direction);

      return {
        zIndex: 1,
        x: direction * 1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      console.log('exit', direction);

      return {
        zIndex: -1,
        x: direction * 1000,
        opacity: 0,
      };
    },
  };

  const handleDrag = (newDirection: Direction) => {
    const newPage = index + newDirection;
    setNewDirection(-newDirection);
    onUpdate && onUpdate(newPage);
  };

  /**
   * A value between 100 and 300 with logarithmic progression
   * @param x reference Value
   */
  const getStiffness = (x) => {
    return clamp(Math.log(x) + 1, 1, 3) * 100;
  };

  /**
   * Experimenting with distilling swipe offset and velocity into a single variable, so the
   * less distance a user has swiped, the more velocity they need to register as a swipe.
   * Should accomodate longer swipes and short flicks without having binary checks on
   * just distance thresholds and velocity > 0.
   */
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    current === index && (
      <motion.div
        layout
        className='g-slim__slide absolute pin w-full grid place-center'
        whileHover={{ scale: scaleOnHover }}
        custom={direction}
        variants={variants}
        transition={{
          x: {
            type: 'spring',
            stiffness: getStiffness(transitionSpeed),
            damping: 25,
            duration: transitionSpeed / 1000,
          },
          opacity: { duration: 0.2 },
        }}
        initial='enter'
        animate='center'
        exit='exit'
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragStart={onDragStart}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            handleDrag(1);
          } else if (swipe > swipeConfidenceThreshold) {
            handleDrag(-1);
          }
          onDragEnd && onDragEnd();
        }}
      >
        <div draggable='false' style={{ pointerEvents: 'none' }}>
          {children}
        </div>
      </motion.div>
    )
  );
};

Slide.defaultProps = {
  current: 0,
};
