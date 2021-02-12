import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Carousel, CarouselProps } from './Carousel';
import { DEFAULT_OPTIONS } from './Carousel.config';

export default {
  title: 'Carousel',
  component: Carousel,
  args: {
    ...DEFAULT_OPTIONS,
  },
} as Meta;

const Image = (args) => <img {...args} loading='lazy' alt='' />;

const getNImages = (n: number) => {
  const listOfImages = Array(n)
    .fill()
    .map((_, i) => (
      <Image
        key={i}
        src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      />
    ));

  return listOfImages;
};

const Template: Story<CarouselProps> = (args) => {
  const storyDebugOnChange = action(`Current index`);
  return (
    <Carousel onChange={storyDebugOnChange} {...args}>
      {args.children || getNImages(5)}
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

export const CustomButtonLabels = createStory({ nextLabel: '👉🏽', prevLabel: '👈🏽' });

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

export const ImagesFromCDN = createStory({
  children: ['software', 'development', 'imagination', 'creativity', 'art'].map((query, index) => (
    <Image
      key={index}
      src={`https://source.unsplash.com/1600x300/?${query}`}
      style={{ objectFit: 'contain' }}
    />
  )),
});
