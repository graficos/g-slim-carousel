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

const getNImages = (
  n: number,
  src = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
) => {
  const listOfImages = Array(n)
    .fill()
    .map((_, i) => <img key={i} src={src} loading='lazy' alt='' />);

  return listOfImages;
};

const Template: Story<CarouselProps> = (args) => {
  return (
    <Carousel onChange={action('Updated index')} {...args}>
      {getNImages(4)}
    </Carousel>
  );
};

export const Default = Template.bind({});

export const ManualProgress = Template.bind({});
ManualProgress.args = { autoPlay: false };

export const NoArrows = Template.bind({});
NoArrows.args = { showArrows: false };

export const NoLoop = Template.bind({});
NoLoop.args = { shouldLoop: false };

export const CustomButtonLabels = Template.bind({});
CustomButtonLabels.args = { nextLabel: '👉🏽', prevLabel: '👈🏽' };

export const ConfigureTransitionSpeed = Template.bind({});
ConfigureTransitionSpeed.args = { transitionSpeed: 120 };

export const ConfigureAutoplayInterval = Template.bind({});
ConfigureAutoplayInterval.args = { interval: 300 };

export const ConfigureInitialIndex = Template.bind({});
ConfigureInitialIndex.args = { selectedItem: 2 };
