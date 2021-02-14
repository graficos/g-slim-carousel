import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { motion, Point2D } from 'framer-motion';

import { Direction } from '../../types';

import { getSwipeDirectionHorizontal, getStiffness } from '../../core/draggingPhysics';

import './Slide.scss';

export interface SlideProps {
  current: number;
  index: number;
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
    transitionSpeed,
    scaleOnHover,
    onUpdate,
    onDragStart,
    onDragEnd,
    children,
  } = props;
  const [direction, setDirection] = useState<Direction>(1);

  const isImage = children && children.type === 'img';
  const disableDragOnImageElementChildren = isImage ? { style: { pointerEvents: 'none' } } : {};

  const variants = {
    enter: (direction: Direction) => {
      console.log('appearFrom', direction);

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

  const handleDrag = (velocity: Point2D) => {
    const swipeDirection = getSwipeDirectionHorizontal(velocity);
    setDirection(swipeDirection);
    const newPage = index * swipeDirection + 1;
    onUpdate && onUpdate(newPage);
  };

  const classes = classNames('g-slim__slide absolute pin w-full grid place-center', {
    'g-slim__slide--image': isImage,
  });

  return (
    current === index && (
      <motion.div
        layout
        className={classes}
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
        exit='exit' // https://www.framer.com/api/motion/animate-presence/#animating-custom-components
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragStart={onDragStart}
        onDragEnd={(e, { velocity }) => {
          handleDrag(velocity);
          onDragEnd && onDragEnd();
        }}
      >
        <div draggable='false' {...disableDragOnImageElementChildren}>
          {children}
        </div>
      </motion.div>
    )
  );
};

Slide.defaultProps = {
  current: 0,
};
