import React, { FC, useState } from 'react';
// import { debounce } from '../../utils/debounce';
import { motion } from 'framer-motion';
import { useMeasure } from 'react-use';
import { Direction } from '../Carousel/Carousel';

export interface SlideProps {
  current: number;
  index: number;
  transitionSpeed: number;
  scaleOnHover: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  onUpdate: (newPage: number) => void;
  children?: React.ReactNode[];
}

export const Slide: FC<SlideProps> = (props) => {
  const {
    current,
    index,
    transitionSpeed,
    scaleOnHover,
    onUpdate,
    onDragStart,
    onDragEnd,
    children,
  } = props;
  const [direction, setDirection] = useState<Direction>(0);
  const [ref, { width }] = useMeasure();

  const variants = {
    enter: (direction: number) => {
      return {
        zIndex: 1,
        x: direction * current * width,
      };
    },
    center: {
      zIndex: 1,
      x: (index - current) * width,
    },
    exit: (direction: number) => {
      return {
        zIndex: -1,
        x: direction * current * width,
      };
    },
  };

  const paginate = (newDirection: Direction) => {
    const newPage = index + newDirection;
    setDirection(newDirection);
    onUpdate(newPage);
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
    <motion.div
      ref={ref}
      layout
      className='g-slim__slide absolute pin w-full grid place-center'
      whileHover={{ scale: scaleOnHover }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      dragMomentum={false}
      initial='enter'
      animate='center'
      exit='exit'
      custom={direction}
      variants={variants}
      transition={{
        x: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
          duration: transitionSpeed * 1000,
        },
      }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          paginate(-1);
        }
        onDragEnd && onDragEnd();
      }}
      onDragStart={onDragStart}
    >
      <div draggable='false' style={{ pointerEvents: 'none' }}>
        {children}
      </div>
    </motion.div>
  );
};

Slide.defaultProps = {
  current: 0,
};
