import React, { FC, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Carousel, CarouselProps } from './Carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

// these methods are only used to support the Storybook demos
import { getRandomInNumericRange, getRandomListOfImages } from '../../tests/imageUtils';

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
      {args.children || getRandomListOfImages(4)}
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

const CustomButton = ({ label, direction, onClick }) => (
  <button
    aria-label={label}
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
    &gt;
  </button>
);

export const CustomButtonComponent = createStory({
  CustomButtonComponent: CustomButton,
});

export const ConfigureTransitionSpeed = createStory({ transitionSpeed: 120 });

export const ConfigureAutoplayInterval = createStory({ interval: 1000 });

export const ConfigureInitialIndex = createStory({ selectedItem: 2 });

export const RandomImagesFromCDNWithRandomWidth = createStory({
  children: getRandomListOfImages(15, getRandomInNumericRange(5, 16) * 100),
});

export const AddMoreImagesFromCDNDynamically: FC<CarouselProps> = (args) => {
  const [images, setImages] = useState(getRandomListOfImages(2));

  const addImage = () => {
    setImages([...images, ...getRandomListOfImages(1)]);
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
