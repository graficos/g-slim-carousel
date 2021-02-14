import React, { FC, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Carousel, CarouselProps } from './Carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

// these methods are only used to support the Storybook demos
import {
  getImageSource,
  getRandomInNumericRange,
  getRandomListOfImages,
} from '../../tests/imageUtils';

export default {
  title: 'Carousel',
  component: Carousel,
  args: {
    ...DEFAULT_OPTIONS,
  },
} as Meta;

const Template: Story<CarouselProps> = (args) => {
  const storyDebugOnChange = action(`Current index`);
  return (
    <Carousel onChange={storyDebugOnChange} {...args}>
      {args.children || getRandomListOfImages({ numberOfImages: 4 })}
    </Carousel>
  );
};

const createStory = (args) => {
  const story = Template.bind({});
  story.args = { ...args };
  return story;
};

export const Default = createStory();

export const ManualProgress = createStory({ autoPlay: false });

export const NoArrows = createStory({ showArrows: false });

export const NoLoop = createStory({ shouldLoop: false });

export const CustomArrowButtonLabels = createStory({ nextLabel: '👉🏽', prevLabel: '👈🏽' });

const CustomArrowButton = ({ label, direction, onClick }) => (
  <button
    style={{
      transform: direction < 0 ? 'scale(-1)' : 'none',
      color: 'white',
      backgroundColor: 'transparent',
      border: '1px solid white',
      display: 'grid',
      placeItems: 'center',
      fontSize: '2rem',
      width: '80px',
      height: '80px',
    }}
    onClick={onClick}
  >
    <span className='visually-hidden'>{label}</span>
    &gt;
  </button>
);

export const CustomArrowButtonComponent = createStory({
  CustomArrowButtonComponent: CustomArrowButton,
});

export const ConfigureTransitionSpeed = createStory({ transitionSpeed: 120 });

export const ConfigureAutoplayInterval = createStory({ interval: 1000 });

export const ConfigureInitialIndex = createStory({ selectedItem: 2 });

export const RandomImagesFromCDNWithRandomWidth = createStory({
  children: getRandomListOfImages({
    numberOfImages: 15,
    width: getRandomInNumericRange(5, 16) * 100,
  }),
});

export const AddMoreImagesFromCDNDynamically: FC<CarouselProps> = (args) => {
  const [images, setImages] = useState(getRandomListOfImages({ numberOfImages: 2 }));

  const addImage = () => {
    setImages([...images, ...getRandomListOfImages({ numberOfImages: 1 })]);
  };

  const storyDebugOnChange = action(`Current index`);
  return (
    <div className='g-slim'>
      <p className='primary--text'>Add more images dynamically</p>
      <button type='button' onClick={addImage}>
        Add images
      </button>
      <hr />
      <Carousel onChange={storyDebugOnChange} {...args}>
        {images}
      </Carousel>
    </div>
  );
};

const StaticContent = ({ onButtonClick, index }) => {
  const backgroundImage = `url(${getImageSource({ width: 1600, height: 400, index })})`;
  return (
    <div
      className='absolute pin grid place-center'
      style={{
        backgroundImage,
        backgroundSize: 'cover',
      }}
    >
      <h2
        style={{
          fontFamily: 'sans-serif',
          color: '#fff',
          textShadow: '0 0 7px rgba(0 0 0 / 50%)',
        }}
      >
        Hi, this is some text content
      </h2>
      <button
        type='button'
        className='button primary'
        style={{
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: '2rem',
          backgroundColor: 'rgba(0 0 0 / 30%)',
          padding: '.2em .7em',
          borderRadius: '10px',
        }}
        onClick={onButtonClick}
      >
        Click me, I&apos;m a button
      </button>
    </div>
  );
};

export const InteractiveContent: FC<CarouselProps> = (args) => {
  const onClick = () => {
    alert('hi 👋🏽');
  };

  const storyDebugOnChange = action(`Current index`);

  return (
    <div className='g-slim'>
      <Carousel onChange={storyDebugOnChange} {...args}>
        <StaticContent index={5} onButtonClick={onClick} />
        {getRandomListOfImages({
          numberOfImages: 1,
        })}
        <StaticContent index={8} onButtonClick={onClick} />
      </Carousel>
    </div>
  );
};
